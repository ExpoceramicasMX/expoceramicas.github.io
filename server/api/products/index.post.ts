import { serverSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = serverSupabase()
  const { data, error } = await supabase.from('products').insert(body).select('*').single()
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return data
})