import { serverSupabase } from '../../utils/supabase'

export default defineEventHandler(async () => {
  const supabase = serverSupabase()
  const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true })
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return data
})