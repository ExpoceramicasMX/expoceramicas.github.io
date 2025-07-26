export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  stock: number
  featured?: boolean
  rating?: number
  reviews?: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  address?: string
  phone?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: Date
  shippingAddress: string
  trackingNumber?: string
}