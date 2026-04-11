import Foundation
import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    private let store = ManagedSettingsStore(named: .init("group.app.kokoon.focus"))

    // MARK: - Shield clearing

    /// Clears all shields directly in the extension process, then also
    /// sets a shared-defaults flag so the main app can double-check on resume.
    private func clearAllShields() {
        store.shield.applications = nil
        store.shield.applicationCategories = nil
        store.shield.webDomainCategories = nil
        store.shield.webDomains = nil
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
