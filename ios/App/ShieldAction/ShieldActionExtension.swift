import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    private let store = ManagedSettingsStore(named: .init("group.app.kokoon.focus"))

    // MARK: - App tokens

    // Clears all shields so the app opens regardless of blocking mode (all vs custom).
    private func clearAllShields() {
        store.shield.applications = nil
        store.shield.applicationCategories = nil
        store.shield.webDomainCategories = nil
        store.shield.webDomains = nil
    }

    override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.defer)
        @unknown default:
            completionHandler(.defer)
        }
    }

    // MARK: - Web domains

    override func handle(action: ShieldAction, for webDomain: WebDomainToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.defer)
        @unknown default:
            completionHandler(.defer)
        }
    }

    // MARK: - Categories

    override func handle(action: ShieldAction, for category: ActivityCategoryToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            clearAllShields()
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.defer)
        @unknown default:
            completionHandler(.defer)
        }
    }
}
