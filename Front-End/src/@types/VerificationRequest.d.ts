export {}

declare global {

    interface VerificationRequest {
        id: string
        name: string
        description: string
        university: string
        metadata: string
    }
}
