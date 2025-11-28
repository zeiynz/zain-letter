import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

function createSupabaseClient(): SupabaseClient | null {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
        // Don't throw during build, return null
        if (process.env.NODE_ENV === 'production' && !supabaseUrl) {
            return null
        }
        throw new Error(
            'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
        )
    }

    return createClient(supabaseUrl, supabaseKey)
}

export function getSupabaseClient(): SupabaseClient | null {
    if (!supabaseInstance) {
        supabaseInstance = createSupabaseClient()
    }
    return supabaseInstance
}

// Lazy-load supabase client only when actually used
export const supabase = new Proxy(
    {},
    {
        get(_target, prop: string | symbol) {
            const client = getSupabaseClient()
            if (client === null) {
                throw new Error('Supabase client not initialized. Check your environment variables.')
            }
            return (client as unknown as Record<string | symbol, unknown>)[prop]
        },
    }
) as SupabaseClient
