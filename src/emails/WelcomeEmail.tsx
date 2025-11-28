import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
    email?: string
}

export default function WelcomeEmail({ email }: WelcomeEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>You&apos;re officially part of our community!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={box}>
                        <Text style={heading}>Welcome!</Text>
                        <Hr style={hr} />
                        <Text style={paragraph}>
                            Hi {email ? email.split('@')[0] : 'there'},
                        </Text>
                        <Text style={paragraph}>
                            Thank you for subscribing to our newsletter. We&apos;re thrilled to have
                            you on board!
                        </Text>
                        <Text style={paragraph}>
                            You&apos;ll be the first to know about exciting updates, exclusive
                            insights, and valuable content tailored just for you.
                        </Text>
                        <Section style={buttonContainer}>
                            <a
                                style={button}
                                href="https://youtube.com/@iamzeiyn"
                            >
                                You&apos;re in!
                            </a>
                        </Section>
                        <Hr style={hr} />
                        <Text style={footer}>
                            Questions? Reply to this email, we&apos;d love to hear from you.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

const main = {
    backgroundColor: '#f9fafb',
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
}

const box = {
    padding: '0 48px',
}

const heading = {
    fontSize: '32px',
    fontWeight: '700',
    margin: '16px 0',
    padding: '0',
    lineHeight: '1.3',
    textAlign: 'center' as const,
    color: '#1f2937',
}

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '16px 0',
    color: '#4b5563',
}

const hr = {
    borderColor: '#e5e7eb',
    margin: '32px 0',
}

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '32px 0',
}

const button = {
    backgroundColor: '#9333ea',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
}

const footer = {
    fontSize: '14px',
    color: '#9ca3af',
    textAlign: 'center' as const,
    margin: '16px 0 0',
}
