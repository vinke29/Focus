import Foundation
import ActivityKit

@available(iOS 16.2, *)
struct FocusTimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var endTime: Date
        var isPaused: Bool
        var pausedRemaining: Int  // seconds remaining when paused
    }
    var totalDurationSeconds: Int
}
