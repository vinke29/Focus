import Foundation
import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    // MARK: - Shield clearing

    /// Clears all shields from both named and default stores, then sets
    /// a shared-defaults flag so the main app can double-check on resume.
    private func clearAllShields() {
        // Clear the named store (used by AppBlockingPlugin.startBlocking)
        let named = ManagedSettingsStore(named: .init("group.app.kokoon.focus"))
        named.clearAllSettings()

        // Also clear the default store in case it has leftover shields
        let defaultStore = ManagedSettingsStore()
        defaultStore.clearAllSettings()

        // Backup flag for main app to pick up on resume
        UserDefaults(suiteName: "group.app.kokoon.focus")?.set(true, forKey: "stop-blocking")
    }

    // MARK: - App tokens

    override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.close)
        @unknown default:
            completionHandler(.close)
        }
    }

    // MARK: - Web domains

    override func handle(action: ShieldAction, for webDomain: WebDomainToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.close)
        @unknown default:
            completionHandler(.close)
        }
    }

    // MARK: - Categories

    override func handle(action: ShieldAction, for category: ActivityCategoryToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.close)
        @unknown default:
            completionHandler(.close)
        }
    }
}
