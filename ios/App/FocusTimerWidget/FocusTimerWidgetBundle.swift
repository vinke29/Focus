//
//  FocusTimerWidgetBundle.swift
//  FocusTimerWidget
//
//  Created by Ignacio Vinke on 3/20/26.
//

import WidgetKit
import SwiftUI

@main
struct FocusTimerWidgetBundle: WidgetBundle {
    var body: some Widget {
        if #available(iOS 16.2, *) {
            FocusTimerLiveActivity()
        }
    }
}
