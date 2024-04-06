export {}

declare global {

    interface VerificationRequest {
        id: string
        name: string
        company: string
        imgBase64: string
    }
}
