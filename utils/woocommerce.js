export function createWooCommerceAPI() {
  const config = useRuntimeConfig()
  
  const baseURL = `${config.woocommerceUrl}/wp-json/wc/v3`
  const auth = Buffer.from(`${config.woocommerceKey}:${config.woocommerceSecret}`).toString('base64')
  
  async function request(endpoint, options = {}) {
    const { method = 'GET', body, params = {} } = options
    
    let url = `${baseURL}/${endpoint}`
    
    if (method === 'GET' && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`
      }
    }
    
    const headers = {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Nuxt-WooCommerce/1.0'
    }
    
    const requestInit = { method, headers }
    
    if (body && (method === 'POST' || method === 'PUT')) {
      requestInit.body = JSON.stringify(body)
    }
    
    try {
      const response = await fetch(url, requestInit)
      
      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.message || `HTTP ${response.status}: ${response.statusText}`
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      
      return {
        data,
        headers: {
          'x-wp-total': response.headers.get('x-wp-total'),
          'x-wp-totalpages': response.headers.get('x-wp-totalpages')
        }
      }
    } catch (error) {
      console.error(`WooCommerce API Error: ${error.message}`)
      throw error
    }
  }
  
  return {
    get: (endpoint, params) => request(endpoint, { method: 'GET', params }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body }),
    delete: (endpoint, params) => request(endpoint, { method: 'DELETE', params })
  }
}