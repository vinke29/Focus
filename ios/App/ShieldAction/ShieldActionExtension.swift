import ManagedSettings

class ShieldActionExtension: ShieldActionDelegate {

    private let store = ManagedSettingsStore(named: .init("group.app.kokoon.focus"))

    // MARK: - App tokens

    // Signals the main app to stop blocking via shared UserDefaults.
    // The main app reads this flag in applicationDidBecomeActive and clears all shields.
    private func requestStopBlocking() {
        UserDefaults(suiteName: "group.app.kokoon.focus")?.set(true, forKey: "stop-blocking")
    }

    override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:
            requestStopBlocking()
            completionHandler(.defer)
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
            requestStopBlocking()
            completionHandler(.defer)
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
            requestStopBlocking()
            completionHandler(.defer)
        case .secondaryButtonPressed:
            completionHandler(.defer)
        @unknown default:
            completionHandler(.defer)
        }
    }
}
