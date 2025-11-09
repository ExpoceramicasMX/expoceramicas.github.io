import { createClient } from '@supabase/supabase-js'


export function serverSupabase() {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl
  const serviceKey = config.supabaseServiceKey

  if (!url || !serviceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Supabase server config missing' })
  }

  return createClient(url, serviceKey)
}