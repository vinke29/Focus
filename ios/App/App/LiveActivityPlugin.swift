import Capacitor
import ActivityKit

@objc(LiveActivityPlugin)
class LiveActivityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LiveActivityPlugin"
    public let jsName = "LiveActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopActivity", returnType: CAPPluginReturnPromise),
    ]

    private var _currentActivity: Any?

    @available(iOS 16.2, *)
    private var currentActivity: Activity<FocusTimerAttributes>? {
        get { _currentActivity as? Activity<FocusTimerAttributes> }
        set { _currentActivity = newValue }
    }

    @objc func startActivity(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve(["started": false])
            return
        }

        // End all existing Focus activities first
        let endState = FocusTimerAttributes.ContentState(
            endTime: Date(), isPaused: false, pausedRemaining: 0
        )
        for activity in Activity<FocusTimerAttributes>.activities {
            Task {
                await activity.end(.init(state: endState, staleDate: nil),
                                   dismissalPolicy: .immediate)
            }
        }
        currentActivity = nil

        let totalSeconds = call.getInt("totalSeconds") ?? 1500
        let remainingSeconds = call.getInt("remainingSeconds") ?? totalSeconds

        let attributes = FocusTimerAttributes(totalDurationSeconds: totalSeconds)
        let state = FocusTimerAttributes.ContentState(
            endTime: Date().addingTimeInterval(Double(remainingSeconds)),
            isPaused: false,
            pausedRemaining: 0
        )

        do {
            let activity = try Activity.request(
                attributes: attributes,
                content: .init(state: state, staleDate: nil)
            )
            currentActivity = activity
            call.resolve(["started": true])
        } catch {
            call.reject("Failed to start live activity: \(error.localizedDescription)")
        }
    }

    @objc func updateActivity(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else { call.resolve(); return }
        let remainingSeconds = call.getInt("remainingSeconds") ?? 0
        let isPaused = call.getBool("isPaused") ?? false

        let state = FocusTimerAttributes.ContentState(
            endTime: Date().addingTimeInterval(Double(remainingSeconds)),
            isPaused: isPaused,
            pausedRemaining: isPaused ? remainingSeconds : 0
        )

        Task {
            await currentActivity?.update(.init(state: state, staleDate: nil))
            call.resolve()
        }
    }

    @objc func stopActivity(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else { call.resolve(); return }
        let state = FocusTimerAttributes.ContentState(
            endTime: Date(),
            isPaused: false,
            pausedRemaining: 0
        )
        Task {
            // End all Focus activities to prevent orphans
            for activity in Activity<FocusTimerAttributes>.activities {
                await activity.end(.init(state: state, staleDate: nil),
                                   dismissalPolicy: .immediate)
            }
            currentActivity = nil
            call.resolve()
        }
    }
}
