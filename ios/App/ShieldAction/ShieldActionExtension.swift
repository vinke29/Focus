import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    private let store = ManagedSettingsStore()

    // MARK: - App tokens

    override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            // "Use Anyway" — unblock just this app for the rest of the session
            store.shield.applications?.remove(application)
            completionHandler(.close)
        case .secondaryButtonPressed:
            // "Stay Focused" — go back to home screen
            completionHandler(.close)
        @unknown default:
            completionHandler(.close)
        }
    }

    // MARK: - Web domains

    override func handle(action: ShieldAction, for webDomain: WebDomainToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            store.shield.webDomains?.remove(webDomain)
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
            // For category blocks we can't remove a single token — clear all category blocks
            store.shield.applicationCategories = nil
            store.shield.webDomainCategories = nil
            completionHandler(.close)
        case .secondaryButtonPressed:
            completionHandler(.close)
        @unknown default:
            completionHandler(.close)
        }
    }
}
