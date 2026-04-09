// app-blocking.js — bridge to the native AppBlockingPlugin (iOS only)
// All methods resolve immediately on non-iOS platforms (web/Android) with no-op results.

const AppBlocking = window.Capacitor?.Plugins?.AppBlocking;

const isAvailable = () => !!AppBlocking;

export async function requestAppBlockingAuthorization() {
    if (!isAvailable()) return { granted: false };
    return AppBlocking.requestAuthorization();
}

export async function getAppBlockingStatus() {
    if (!isAvailable()) return { status: 'notDetermined' };
    return AppBlocking.getAuthorizationStatus();
}

export async function showAppPicker() {
    if (!isAvailable()) return { selectionCount: 0 };
    return AppBlocking.showPicker();
}

export async function startAppBlocking() {
    if (!isAvailable()) return { blocking: false };
    return AppBlocking.startBlocking();
}

export async function stopAppBlocking() {
    if (!isAvailable()) return { blocking: false };
    return AppBlocking.stopBlocking();
}
