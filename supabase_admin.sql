-- ── KOKOON ADMIN DASHBOARD — Supabase RPC Functions ──────────────────────────
-- Run this entire file in the Supabase SQL editor.
-- All functions use SECURITY DEFINER to bypass RLS and check the caller
-- is the admin before returning any data.
-- ─────────────────────────────────────────────────────────────────────────────

-- Helper: assert caller is admin
CREATE OR REPLACE FUNCTION _assert_admin()
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  caller_email text;
BEGIN
  SELECT email INTO caller_email FROM auth.users WHERE id = auth.uid();
  IF caller_email IS DISTINCT FROM 'ignaciovinke@gmail.com' THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
END;
$$;

-- Helper: period cutoff
CREATE OR REPLACE FUNCTION _period_cutoff(p_period text)
RETURNS timestamptz
LANGUAGE sql IMMUTABLE
AS $$
  SELECT CASE p_period
    WHEN 'day'   THEN now() - interval '1 day'
    WHEN 'week'  THEN now() - interval '7 days'
    WHEN 'month' THEN now() - interval '30 days'
    ELSE '1970-01-01'::timestamptz
  END;
$$;


-- A: Overview metrics
CREATE OR REPLACE FUNCTION admin_overview(p_period text DEFAULT 'all')
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  cutoff timestamptz := _period_cutoff(p_period);
  result json;
BEGIN
  PERFORM _assert_admin();
  SELECT json_build_object(
    'total_users',         (SELECT count(*) FROM public.profiles),
    'new_users',           (SELECT count(*) FROM public.profiles WHERE created_at >= cutoff),
    'total_animals',       (SELECT count(*) FROM public.collection WHERE hatched_at >= cutoff),
    'total_sessions',      (SELECT count(*) FROM public.sessions WHERE completed_at >= cutoff),
    'total_focus_minutes', (SELECT coalesce(sum(duration), 0) FROM public.sessions WHERE completed_at >= cutoff),
    'dau',                 (SELECT count(DISTINCT user_id) FROM public.sessions
                            WHERE completed_at >= now() - interval '24 hours')
  ) INTO result;
  RETURN result;
END;
$$;


-- B: Animal distribution
CREATE OR REPLACE FUNCTION admin_animal_distribution(p_period text DEFAULT 'all')
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  cutoff timestamptz := _period_cutoff(p_period);
  result json;
BEGIN
  PERFORM _assert_admin();
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (
    SELECT char_id, count(*) as count
    FROM public.collection
    WHERE hatched_at >= cutoff
    GROUP BY char_id
    ORDER BY count DESC
  ) t;
  RETURN result;
END;
$$;


-- C: Top collectors with rarity breakdown
-- Common pool (19): shiro,tanuki,kappa,kodama,capybara,armadillo,llama,hedgehog,hare,wisp,meerkat,mongoose,coati,tapir,pangolin,warthog,sprite,imp,fairy
-- Rare pool (19):   karasu,koi,oni,baku,axolotl,quetzal,condor,jaguar,stag,gryphon,selkie,anaconda,hyena,okapi,golem,djinn,basilisk,chimera,kraken
-- Legendary pool (6): kyubi,raijin_wolf,chupacabra,unicorn,wyvern,phoenix
CREATE OR REPLACE FUNCTION admin_collection_leaders(p_period text DEFAULT 'all')
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  result json;
  common_ids text[] := ARRAY['shiro','tanuki','kappa','kodama','capybara','armadillo','llama','hedgehog','hare','wisp','meerkat','mongoose','coati','tapir','pangolin','warthog','sprite','imp','fairy'];
  rare_ids text[]   := ARRAY['karasu','koi','oni','baku','axolotl','quetzal','condor','jaguar','stag','gryphon','selkie','anaconda','hyena','okapi','golem','djinn','basilisk','chimera','kraken'];
  legend_ids text[] := ARRAY['kyubi','raijin_wolf','chupacabra','unicorn','wyvern','phoenix'];
BEGIN
  PERFORM _assert_admin();
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (
    SELECT c.user_id, p.name,
           count(DISTINCT c.char_id) as unique_chars,
           count(DISTINCT c.char_id) FILTER (WHERE c.variant = 'standard') as std,
           count(DISTINCT c.char_id) FILTER (WHERE c.variant = 'gold') as gold,
           count(DISTINCT c.char_id) FILTER (WHERE c.variant = 'crimson') as crimson,
           count(DISTINCT c.char_id) FILTER (WHERE c.variant = 'void') as void,
           count(*) as total_animals
    FROM public.collection c
    JOIN public.profiles p ON p.id = c.user_id
    GROUP BY c.user_id, p.name
    ORDER BY unique_chars DESC, total_animals DESC
    LIMIT 25
  ) t;
  RETURN result;
END;
$$;


-- D: Session duration splits
CREATE OR REPLACE FUNCTION admin_session_splits(p_period text DEFAULT 'all')
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  cutoff timestamptz := _period_cutoff(p_period);
  result json;
BEGIN
  PERFORM _assert_admin();
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (
    SELECT
      CASE
        WHEN duration = 25 THEN '25 min'
        WHEN duration = 45 THEN '45 min'
        WHEN duration = 60 THEN '60 min'
        ELSE 'other'
      END as bucket,
      count(*) as count
    FROM public.sessions
    WHERE completed_at >= cutoff
    GROUP BY bucket
    ORDER BY count DESC
  ) t;
  RETURN result;
END;
$$;


-- E: Sign-ups over time (grouped by day or week depending on period)
CREATE OR REPLACE FUNCTION admin_signups_over_time(p_period text DEFAULT 'all')
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  cutoff timestamptz := _period_cutoff(p_period);
  bucket text := CASE WHEN p_period = 'all' THEN 'week' ELSE 'day' END;
  result json;
BEGIN
  PERFORM _assert_admin();
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (
    SELECT date_trunc(bucket, created_at)::date as day, count(*) as signups
    FROM public.profiles
    WHERE created_at >= cutoff
    GROUP BY day
    ORDER BY day
  ) t;
  RETURN result;
END;
$$;


-- F: Streak distribution
CREATE OR REPLACE FUNCTION admin_streak_distribution()
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  PERFORM _assert_admin();
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (
    SELECT
      CASE
        WHEN coalesce(max_streak, 0) = 0 THEN '0'
        WHEN max_streak BETWEEN 1 AND 3  THEN '1-3'
        WHEN max_streak BETWEEN 4 AND 7  THEN '4-7'
        WHEN max_streak BETWEEN 8 AND 14 THEN '8-14'
        WHEN max_streak BETWEEN 15 AND 30 THEN '15-30'
        ELSE '30+'
      END as bucket,
      count(*) as count
    FROM public.profiles
    GROUP BY bucket
    ORDER BY min(coalesce(max_streak, 0))
  ) t;
  RETURN result;
END;
$$;


-- G: Active users trend (grouped by day or week depending on period)
CREATE OR REPLACE FUNCTION admin_daily_active_users(p_period text DEFAULT 'month')
RETURNS json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  cutoff timestamptz := _period_cutoff(p_period);
  bucket text := CASE WHEN p_period = 'all' THEN 'week' ELSE 'day' END;
  result json;
BEGIN
  PERFORM _assert_admin();
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json) INTO result
  FROM (
    SELECT date_trunc(bucket, completed_at)::date as day,
           count(DISTINCT user_id) as active_users
    FROM public.sessions
    WHERE completed_at >= cutoff
    GROUP BY day
    ORDER BY day
  ) t;
  RETURN result;
END;
$$;
