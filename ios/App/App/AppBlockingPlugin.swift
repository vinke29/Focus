import Capacitor
import FamilyControls
import ManagedSettings
import SwiftUI
import Foundation

// MARK: - Blocking mode

enum BlockingMode: String, Codable {
    case all        // block everything
    case custom     // use FamilyActivityPicker selection
}

// MARK: - Plugin

@objc(AppBlockingPlugin)
class AppBlockingPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "AppBlockingPlugin"
    public let jsName = "AppBlocking"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getAuthorizationStatus", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showPicker", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startBlocking", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopBlocking", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkAndClearIfRequested", returnType: CAPPluginReturnPromise),
    ]

    private let store = ManagedSettingsStore()
    private let center = AuthorizationCenter.shared
    private let selectionKey = "focus-app-blocking-selection"
    private let modeKey = "focus-app-blocking-mode"

    // MARK: - Authorization

    @objc func requestAuthorization(_ call: CAPPluginCall) {
        Task {
            do {
                try await center.requestAuthorization(for: .individual)
                call.resolve(["granted": true])
            } catch {
                call.resolve(["granted": false, "error": error.localizedDescription])
            }
        }
    }

    @objc func getAuthorizationStatus(_ call: CAPPluginCall) {
        let status: String
        switch center.authorizationStatus {
        case .approved:      status = "approved"
        case .denied:        status = "denied"
        case .notDetermined: status = "notDetermined"
        @unknown default:    status = "unknown"
        }
        call.resolve(["status": status])
    }

    // MARK: - Picker

    @objc func showPicker(_ call: CAPPluginCall) {
        guard center.authorizationStatus == .approved else {
            call.reject("Family Controls not authorized")
            return
        }

        DispatchQueue.main.async {
            let model = AppSelectionModel(
                savedSelection: self.loadSelection(),
                savedMode: self.loadMode()
            )

            // Hold a strong ref so we can dismiss it from inside the sheet
            var host: UIHostingController<BlockingPickerSheet>?

            let sheet = BlockingPickerSheet(model: model) {
                host?.dismiss(animated: true)
                self.saveSelection(model.selection)
                self.saveMode(model.mode)
                let count = model.selection.applicationTokens.count + model.selection.categoryTokens.count
                call.resolve(["mode": model.mode.rawValue, "selectionCount": count])
            }

            host = UIHostingController(rootView: sheet)
            host!.modalPresentationStyle = .pageSheet
            if let sheetController = host!.sheetPresentationController {
                sheetController.detents = [.medium(), .large()]
                sheetController.prefersGrabberVisible = true
            }

            self.bridge?.viewController?.present(host!, animated: true)
        }
    }

    // MARK: - Blocking

    @objc func startBlocking(_ call: CAPPluginCall) {
        let mode = loadMode()

        switch mode {
        case .all:
            store.shield.applicationCategories = .all()
            store.shield.webDomainCategories = .all()
        case .custom:
            let selection = loadSelection()
            let hasApps = !selection.applicationTokens.isEmpty
            let hasCategories = !selection.categoryTokens.isEmpty
            let hasWebDomains = !selection.webDomainTokens.isEmpty

            if hasApps || hasCategories || hasWebDomains {
                if hasApps       { store.shield.applications = selection.applicationTokens }
                if hasCategories { store.shield.applicationCategories = .specific(selection.categoryTokens) }
                if hasWebDomains { store.shield.webDomains = selection.webDomainTokens }
            } else {
                // Custom selected but nothing chosen yet — block all as fallback
                store.shield.applicationCategories = .all()
                store.shield.webDomainCategories = .all()
            }
        }

        call.resolve(["blocking": true])
    }

    @objc func stopBlocking(_ call: CAPPluginCall) {
        clearAllStores()
        call.resolve(["blocking": false])
    }

    /// Called from JS on app resume to check if the ShieldAction extension
    /// requested a stop via shared UserDefaults.
    @objc func checkAndClearIfRequested(_ call: CAPPluginCall) {
        let defaults = UserDefaults(suiteName: "group.app.kokoon.focus")
        let requested = defaults?.bool(forKey: "stop-blocking") ?? false
        if requested {
            defaults?.removeObject(forKey: "stop-blocking")
            clearAllStores()
        }
        call.resolve(["cleared": requested])
    }

    /// Clears both default and named stores to handle shields from any build.
    private func clearAllStores() {
        store.clearAllSettings()
        // Also clear the named store — earlier builds may have set shields there
        ManagedSettingsStore(named: .init("group.app.kokoon.focus")).clearAllSettings()
    }

    // MARK: - Persistence

    private func saveSelection(_ selection: FamilyActivitySelection) {
        if let data = try? JSONEncoder().encode(selection) {
            UserDefaults.standard.set(data, forKey: selectionKey)
        }
    }

    private func loadSelection() -> FamilyActivitySelection {
        guard let data = UserDefaults.standard.data(forKey: selectionKey),
              let sel = try? JSONDecoder().decode(FamilyActivitySelection.self, from: data)
        else { return FamilyActivitySelection() }
        return sel
    }

    private func saveMode(_ mode: BlockingMode) {
        UserDefaults.standard.set(mode.rawValue, forKey: modeKey)
    }

    private func loadMode() -> BlockingMode {
        guard let raw = UserDefaults.standard.string(forKey: modeKey),
              let mode = BlockingMode(rawValue: raw)
        else { return .all }
        return mode
    }
}

// MARK: - SwiftUI

class AppSelectionModel: ObservableObject {
    @Published var selection: FamilyActivitySelection
    @Published var mode: BlockingMode
    @Published var showingPicker = false

    init(savedSelection: FamilyActivitySelection, savedMode: BlockingMode) {
        self.selection = savedSelection
        self.mode = savedMode
    }
}

struct BlockingPickerSheet: View {
    @ObservedObject var model: AppSelectionModel
    let onDone: () -> Void

    var body: some View {
        NavigationView {
            List {
                Section {
                    BlockModeRow(
                        icon: "circle.slash",
                        title: "Block all apps",
                        subtitle: "Every app is blocked during focus",
                        isSelected: model.mode == .all
                    ) { model.mode = .all }

                    BlockModeRow(
                        icon: "slider.horizontal.3",
                        title: "Choose specific apps",
                        subtitle: selectionSubtitle,
                        isSelected: model.mode == .custom
                    ) {
                        model.mode = .custom
                        model.showingPicker = true
                    }
                } header: {
                    Text("What to block during focus sessions")
                        .textCase(nil)
                        .font(.system(size: 13))
                }

                if model.mode == .custom {
                    Section {
                        Button {
                            model.showingPicker = true
                        } label: {
                            Label("Edit app selection", systemImage: "pencil")
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Block During Focus")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done", action: onDone)
                        .fontWeight(.semibold)
                }
            }
            .sheet(isPresented: $model.showingPicker) {
                NativePickerSheet(selection: $model.selection)
            }
        }
    }

    private var selectionSubtitle: String {
        let count = model.selection.applicationTokens.count + model.selection.categoryTokens.count
        if count == 0 { return "Tap to choose apps and categories" }
        return "\(count) item\(count == 1 ? "" : "s") selected"
    }
}

struct BlockModeRow: View {
    let icon: String
    let title: String
    let subtitle: String
    let isSelected: Bool
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 14) {
                Image(systemName: icon)
                    .frame(width: 28)
                    .foregroundColor(isSelected ? .primary : .secondary)

                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .foregroundColor(.primary)
                        .font(.system(size: 15))
                    Text(subtitle)
                        .foregroundColor(.secondary)
                        .font(.system(size: 12))
                }

                Spacer()

                if isSelected {
                    Image(systemName: "checkmark")
                        .foregroundColor(.blue)
                        .fontWeight(.semibold)
                }
            }
            .padding(.vertical, 4)
        }
    }
}

struct NativePickerSheet: View {
    @Binding var selection: FamilyActivitySelection
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationView {
            FamilyActivityPicker(selection: $selection)
                .navigationTitle("Choose Apps")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .confirmationAction) {
                        Button("Done") { dismiss() }
                            .fontWeight(.semibold)
                    }
                }
        }
    }
}
