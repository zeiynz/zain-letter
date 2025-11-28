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

interface NewsletterTemplateProps {
    subject: string
    content: string
}

export default function NewsletterTemplate({
    subject,
    content,
}: NewsletterTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>{subject}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={box}>
                        <Text style={heading}>{subject}</Text>
                        <Hr style={hr} />
                        <Section
                            style={contentSection}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <Hr style={hr} />
                        <Text style={footer}>
                            You received this email because you subscribed to our newsletter.
                            Manage your preferences or unsubscribe anytime.
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
    color: '#1f2937',
}

const contentSection = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4b5563',
    margin: '24px 0',
}

const hr = {
    borderColor: '#e5e7eb',
    margin: '32px 0',
}

const footer = {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '16px 0 0',
}
