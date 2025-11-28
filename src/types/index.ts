export type Subscriber = {
    id: string
    email: string
    created_at: string
}

export type NewsletterPayload = {
    subject: string
    content: string
}

export type ApiResponse<T = unknown> = {
    success: boolean
    data?: T
    error?: string
    code?: string
}

export type AuthPayload = {
    password: string
}

export type SubscribePayload = {
    email: string
}
