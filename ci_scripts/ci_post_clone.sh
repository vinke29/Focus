#!/bin/sh
# Xcode Cloud: runs automatically after repo clone, before build.
# Installs npm dependencies so Capacitor SPM local package paths resolve.

set -e

# Move to repo root (script runs from ci_scripts/)
cd "$(dirname "$0")/.."

# Install node if not present (Xcode Cloud has homebrew)
if ! command -v node &> /dev/null; then
  brew install node
fi

npm install
