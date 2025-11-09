import { serverSupabase } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const supabase = serverSupabase()
  const { data, error } = await supabase.from('products').update(body).eq('id', id).select('*').single()
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return data
})