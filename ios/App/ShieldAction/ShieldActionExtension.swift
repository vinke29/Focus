import Foundation
import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    // MARK: - Shield clearing

    /// Clears all shields from both default and named stores, then signals
    /// the main app via shared UserDefaults as a backup.
    private func clearAllShields() {
        ManagedSettingsStore().clearAllSettings()
        ManagedSettingsStore(named: .init("group.app.kokoon.focus")).clearAllSettings()
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
