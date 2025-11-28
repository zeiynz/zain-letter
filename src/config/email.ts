export const emailConfig = {
    from: process.env.RESEND_FROM_EMAIL,
    brandName: 'Zain Newsletter',
    supportEmail: 'support@zainletter.com',
} as const

export type EmailConfig = typeof emailConfig
