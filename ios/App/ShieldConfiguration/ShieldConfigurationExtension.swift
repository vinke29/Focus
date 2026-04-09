import ManagedSettings
import ManagedSettingsUI
import UIKit

class ShieldConfigurationExtension: ShieldConfigurationDataSource {

    private func focusShield() -> ShieldConfiguration {
        ShieldConfiguration(
            backgroundBlurStyle: .systemUltraThinMaterial,
            title: ShieldConfiguration.Label(
                text: "Focus in progress",
                color: .label
            ),
            subtitle: ShieldConfiguration.Label(
                text: "You blocked this app during focus sessions.",
                color: .secondaryLabel
            ),
            primaryButtonLabel: ShieldConfiguration.Label(
                text: "Use Anyway",
                color: .white
            ),
            primaryButtonBackgroundColor: UIColor.systemRed.withAlphaComponent(0.75),
            secondaryButtonLabel: ShieldConfiguration.Label(
                text: "Stay Focused",
                color: .label
            )
        )
    }

    override func configuration(shielding application: Application) -> ShieldConfiguration {
        focusShield()
    }

    override func configuration(shielding application: Application, in category: ActivityCategory) -> ShieldConfiguration {
        focusShield()
    }

    override func configuration(shielding webDomain: WebDomain) -> ShieldConfiguration {
        focusShield()
    }

    override func configuration(shielding webDomain: WebDomain, in category: ActivityCategory) -> ShieldConfiguration {
        focusShield()
    }
}
