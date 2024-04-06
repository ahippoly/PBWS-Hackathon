export {}

declare global {
    interface PendingAction {
        id: string
        type: string
        payload: unknown
        status: string
        error: string
    }

    interface PendingActionCredentials extends PendingAction {
        payload: DiplomaWeb3
    }

    interface PendingActionVerification extends PendingAction {
        payload: VerificationRequest
    }
}
