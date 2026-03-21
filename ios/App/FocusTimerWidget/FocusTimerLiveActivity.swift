import ActivityKit
import WidgetKit
import SwiftUI

@available(iOS 16.2, *)
struct FocusTimerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FocusTimerAttributes.self) { context in
            // LOCK SCREEN / BANNER VIEW
            lockScreenView(context: context)
                .activityBackgroundTint(Color(red: 0.03, green: 0.03, blue: 0.06))
                .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                // EXPANDED VIEW (long press)
                DynamicIslandExpandedRegion(.center) {
                    expandedView(context: context)
                }
            } compactLeading: {
                // Small bolt icon
                Image(systemName: "bolt.fill")
                    .foregroundColor(Color(red: 0, green: 0.28, blue: 1))
                    .font(.system(size: 14))
            } compactTrailing: {
                // Countdown timer
                if context.state.isPaused {
                    Text(formatTime(context.state.pausedRemaining))
                        .font(.system(size: 14, weight: .medium, design: .monospaced))
                        .foregroundColor(.white.opacity(0.6))
                } else {
                    Text(context.state.endTime, style: .timer)
                        .font(.system(size: 14, weight: .medium, design: .monospaced))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.trailing)
                        .frame(width: 52)
                }
            } minimal: {
                Image(systemName: "bolt.fill")
                    .foregroundColor(Color(red: 0, green: 0.28, blue: 1))
                    .font(.system(size: 12))
            }
        }
    }

    // MARK: - Lock Screen View
    @ViewBuilder
    func lockScreenView(context: ActivityViewContext<FocusTimerAttributes>) -> some View {
        HStack(spacing: 16) {
            // Progress ring
            ZStack {
                Circle()
                    .stroke(Color.white.opacity(0.12), lineWidth: 4)
                    .frame(width: 50, height: 50)

                Image(systemName: "bolt.fill")
                    .foregroundColor(Color(red: 0, green: 0.28, blue: 1))
                    .font(.system(size: 18))
            }

            VStack(alignment: .leading, spacing: 2) {
                Text("Focus Session")
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(.white.opacity(0.6))

                if context.state.isPaused {
                    Text(formatTime(context.state.pausedRemaining))
                        .font(.system(size: 28, weight: .light, design: .monospaced))
                        .foregroundColor(.white.opacity(0.5))
                } else {
                    Text(context.state.endTime, style: .timer)
                        .font(.system(size: 28, weight: .light, design: .monospaced))
                        .foregroundColor(.white)
                        .multilineTextAlignment(.leading)
                }

                if context.state.isPaused {
                    Text("paused")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(.white.opacity(0.35))
                }
            }

            Spacer()
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 14)
    }

    // MARK: - Expanded Dynamic Island View
    @ViewBuilder
    func expandedView(context: ActivityViewContext<FocusTimerAttributes>) -> some View {
        VStack(spacing: 6) {
            Text("Focus Session")
                .font(.system(size: 13, weight: .medium))
                .foregroundColor(.white.opacity(0.6))

            if context.state.isPaused {
                Text(formatTime(context.state.pausedRemaining))
                    .font(.system(size: 32, weight: .light, design: .monospaced))
                    .foregroundColor(.white.opacity(0.5))
                Text("paused")
                    .font(.system(size: 11))
                    .foregroundColor(.white.opacity(0.35))
            } else {
                Text(context.state.endTime, style: .timer)
                    .font(.system(size: 32, weight: .light, design: .monospaced))
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)
            }
        }
        .padding(.vertical, 4)
    }

    // MARK: - Helpers
    func formatTime(_ totalSeconds: Int) -> String {
        let m = totalSeconds / 60
        let s = totalSeconds % 60
        return String(format: "%d:%02d", m, s)
    }
}
