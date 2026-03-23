import Capacitor
import AuthenticationServices

@objc(AppleSignInPlugin)
class AppleSignInPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "AppleSignInPlugin"
    public let jsName = "SignInWithApple"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "authorize", returnType: CAPPluginReturnPromise),
    ]

    private var pendingCall: CAPPluginCall?

    @objc func authorize(_ call: CAPPluginCall) {
        self.pendingCall = call

        let provider = ASAuthorizationAppleIDProvider()
        let request = provider.createRequest()

        var scopes: [ASAuthorization.Scope] = []
        if let scopesStr = call.getString("scopes") {
            if scopesStr.contains("name")  { scopes.append(.fullName) }
            if scopesStr.contains("email") { scopes.append(.email) }
        }
        request.requestedScopes = scopes.isEmpty ? nil : scopes

        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self
        controller.performRequests()
    }
}

extension AppleSignInPlugin: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithAuthorization authorization: ASAuthorization) {
        guard let call = pendingCall,
              let credential = authorization.credential as? ASAuthorizationAppleIDCredential else { return }
        pendingCall = nil

        let identityToken = credential.identityToken.flatMap { String(data: $0, encoding: .utf8) }
        let authCode     = credential.authorizationCode.flatMap { String(data: $0, encoding: .utf8) }

        call.resolve([
            "response": [
                "user":              credential.user,
                "email":             credential.email as Any,
                "givenName":         credential.fullName?.givenName as Any,
                "familyName":        credential.fullName?.familyName as Any,
                "identityToken":     identityToken as Any,
                "authorizationCode": authCode as Any,
            ]
        ])
    }

    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithError error: Error) {
        pendingCall?.reject(error.localizedDescription)
        pendingCall = nil
    }
}
