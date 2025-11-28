'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Subscriber } from '@/types'
import { Mail, Loader2, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react'

async function fetchSubscribers(): Promise<Subscriber[]> {
    const response = await fetch('/api/admin/subscribers')
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
}

async function sendNewsletter(subject: string, content: string) {
    const response = await fetch('/api/admin/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content }),
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
}

async function deleteSubscriber(id: string) {
    const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.data
}

export default function Dashboard() {
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [sending, setSending] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [message, setMessage] = useState<{
        type: 'success' | 'error'
        text: string
    } | null>(null)

    const { data: subscribers = [], isLoading, error, refetch } = useQuery({
        queryKey: ['subscribers'],
        queryFn: fetchSubscribers,
        refetchInterval: 10000,
    })

    const handleDeleteSubscriber = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this subscriber?')) return

        setDeleting(id)
        try {
            await deleteSubscriber(id)
            setMessage({ type: 'success', text: 'Subscriber deleted successfully' })
            // Refetch subscribers to update the list
            await refetch()
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Failed to delete subscriber',
            })
        } finally {
            setDeleting(null)
        }
    }

    const handleSendNewsletter = async () => {
        if (!subject || !content) {
            setMessage({ type: 'error', text: 'Subject and content are required' })
            return
        }

        setSending(true)
        setMessage(null)

        try {
            const result = await sendNewsletter(subject, content)
            setMessage({
                type: 'success',
                text: `Newsletter sent to ${result.sent} subscribers`,
            })
            setSubject('')
            setContent('')
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'Failed to send newsletter',
            })
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-poppins">Admin Dashboard</h1>
                <p className="text-slate-400 font-poppins">
                    Manage subscribers and send newsletters
                </p>
            </div>

            {/* Subscribers Section */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white font-poppins">
                        Subscribers ({subscribers.length})
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                        <span className="ml-2 text-slate-400 font-poppins">Loading subscribers...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-200 font-medium font-poppins">Error loading subscribers</p>
                            <p className="text-red-300 text-sm font-poppins">
                                {error instanceof Error ? error.message : 'Unknown error'}
                            </p>
                        </div>
                    </div>
                ) : subscribers.length === 0 ? (
                    <p className="text-slate-400 text-center py-8 font-poppins">
                        No subscribers yet. Promote the landing page to get started!
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="border-b border-slate-700">
                                <tr>
                                    <th className="px-4 py-3 font-medium text-slate-300 font-poppins">Email</th>
                                    <th className="px-4 py-3 font-medium text-slate-300 font-poppins">
                                        Subscribed
                                    </th>
                                    <th className="px-4 py-3 font-medium text-slate-300 font-poppins">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.map((sub: Subscriber) => (
                                    <tr
                                        key={sub.id}
                                        className="border-b border-slate-800 hover:bg-slate-800/30"
                                    >
                                        <td className="px-4 py-3 text-slate-200 font-poppins">{sub.email}</td>
                                        <td className="px-4 py-3 text-slate-400 font-poppins">
                                            {new Date(sub.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteSubscriber(sub.id)}
                                                disabled={deleting === sub.id}
                                                className="text-red-400 border-red-500/30 hover:bg-red-900/20 font-poppins"
                                            >
                                                {deleting === sub.id ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Delete
                                                    </>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Send Newsletter Section */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 font-poppins">
                    Send Newsletter
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-poppins">
                            Subject
                        </label>
                        <Input
                            type="text"
                            placeholder="Newsletter subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            disabled={sending}
                            className="bg-slate-800/50 border-slate-700 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2 font-poppins">
                            Content (HTML)
                        </label>
                        <textarea
                            placeholder="Newsletter content (HTML supported)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={sending}
                            rows={8}
                            className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-white text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 font-poppins"
                        />
                    </div>

                    {message && (
                        <div
                            className={`flex items-start gap-3 p-4 rounded-lg border ${message.type === 'success'
                                ? 'bg-green-900/20 border-green-800'
                                : 'bg-red-900/20 border-red-800'
                                }`}
                        >
                            {message.type === 'success' ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            )}
                            <p
                                className={`font-poppins ${message.type === 'success'
                                    ? 'text-green-200'
                                    : 'text-red-200'
                                    }`}
                            >
                                {message.text}
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={handleSendNewsletter}
                            disabled={sending || subscribers.length === 0}
                            className="flex-1"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Newsletter'
                            )}
                        </Button>
                        {subscribers.length === 0 && (
                            <p className="text-xs text-slate-400 py-2">
                                No subscribers to send to
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
