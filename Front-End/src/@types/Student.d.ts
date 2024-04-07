export {}

declare global {
    interface Student {
        id: string
        firstName: string
        lastName: string
        email: string
        dateOfBirth: string
        imgBase64: string
        walletAddress: string
    }

    interface StudentMetadata {
        firstName: string
        lastName: string
        diploma: string
        university: string
        dateOfIssue: string
        specialization: string
    }
}
