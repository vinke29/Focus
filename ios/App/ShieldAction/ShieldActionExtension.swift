import Foundation
import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    // MARK: - Shield clearing

    /// Clears all shields from the default store and signals the main app
    /// via shared UserDefaults as a backup.
    private func clearAllShields() {
        // Clear the default store (same one used by AppBlockingPlugin)
        ManagedSettingsStore().clearAllSettings()

        // Backup: signal main app to also clear on resume
        UserDefaults(suiteName: "group.app.kokoon.focus")?.set(true, forKey: "stop-blocking")
    }

    // MARK: - App tokens

    override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.defer)
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
            completionHandler(.defer)
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
            completionHandler(.defer)
        case .secondaryButtonPressed:
            completionHandler(.close)
        @unknown default:
            completionHandler(.close)
        }
    }
}
