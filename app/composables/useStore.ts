import type { Product, CartItem, User, Order } from '~/types'

// Mock data for demonstration - Comprehensive ceramic products
export const mockProducts: Product[] = [
  // Vases & Decorative
  {
    id: '1',
    name: 'Artisan Ceramic Vase - Azure Blue',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Beautiful handcrafted ceramic vase with azure blue glaze. Perfect for home decoration and fresh flowers. Each piece is unique with slight variations in color and texture.',
    category: 'Vases',
    stock: 15,
    featured: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: '2',
    name: 'Modern Geometric Vase Set',
    price: 124.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    description: 'Set of 3 modern geometric ceramic vases in different sizes. Minimalist design perfect for contemporary homes.',
    category: 'Vases',
    stock: 8,
    featured: false,
    rating: 4.6,
    reviews: 18
  },
  {
    id: '3',
    name: 'Rustic Terra Cotta Vase',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
    description: 'Handmade terra cotta vase with natural finish. Brings warmth and earthiness to any space.',
    category: 'Vases',
    stock: 22,
    featured: false,
    rating: 4.4,
    reviews: 31
  },

  // Dinnerware
  {
    id: '4',
    name: 'Ceramic Bowl Set - Ocean Breeze',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
    description: 'Set of 4 ceramic bowls with ocean-inspired blue and white patterns. Perfect for soups, salads, and cereals.',
    category: 'Dinnerware',
    stock: 12,
    featured: true,
    rating: 4.7,
    reviews: 42
  },
  {
    id: '5',
    name: 'Complete Ceramic Dinner Set',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    description: 'Complete 16-piece ceramic dinner set for 4 people. Includes plates, bowls, and side plates with elegant white finish.',
    category: 'Dinnerware',
    stock: 5,
    featured: true,
    rating: 4.9,
    reviews: 67
  },
  {
    id: '6',
    name: 'Artisan Pasta Bowls Set',
    price: 67.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    description: 'Set of 4 wide ceramic bowls perfect for pasta, salads, and sharing dishes. Hand-glazed with speckled finish.',
    category: 'Dinnerware',
    stock: 18,
    featured: false,
    rating: 4.5,
    reviews: 29
  },

  // Drinkware
  {
    id: '7',
    name: 'Handmade Ceramic Coffee Mug',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    description: 'Handcrafted ceramic coffee mug with comfortable handle. Perfect size for your morning coffee or evening tea.',
    category: 'Drinkware',
    stock: 35,
    featured: false,
    rating: 4.3,
    reviews: 156
  },
  {
    id: '8',
    name: 'Ceramic Espresso Cup Set',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    description: 'Set of 4 elegant espresso cups with saucers. Perfect for serving authentic Italian espresso.',
    category: 'Drinkware',
    stock: 24,
    featured: false,
    rating: 4.6,
    reviews: 38
  },
  {
    id: '9',
    name: 'Large Ceramic Tea Pot',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    description: 'Beautiful ceramic teapot with infuser. Holds 6 cups and perfect for tea ceremonies or daily use.',
    category: 'Drinkware',
    stock: 14,
    featured: false,
    rating: 4.7,
    reviews: 22
  },

  // Planters
  {
    id: '10',
    name: 'Modern Ceramic Planter',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    description: 'Sleek modern ceramic planter with drainage hole. Perfect for succulents, herbs, or small houseplants.',
    category: 'Planters',
    stock: 28,
    featured: false,
    rating: 4.4,
    reviews: 73
  },
  {
    id: '11',
    name: 'Hanging Ceramic Planter Set',
    price: 78.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    description: 'Set of 3 hanging ceramic planters with rope hangers. Create a beautiful vertical garden indoors.',
    category: 'Planters',
    stock: 16,
    featured: false,
    rating: 4.8,
    reviews: 45
  },
  {
    id: '12',
    name: 'Large Floor Ceramic Planter',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    description: 'Large statement ceramic planter perfect for floor placement. Ideal for large plants and trees.',
    category: 'Planters',
    stock: 7,
    featured: false,
    rating: 4.6,
    reviews: 19
  },

  // Decorative Items
  {
    id: '13',
    name: 'Decorative Ceramic Plate',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    description: 'Elegant decorative ceramic plate with hand-painted floral design. Perfect for wall display or table centerpiece.',
    category: 'Decoration',
    stock: 20,
    featured: false,
    rating: 4.2,
    reviews: 34
  },
  {
    id: '14',
    name: 'Ceramic Candle Holders Set',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Set of 3 ceramic candle holders in varying heights. Creates beautiful ambient lighting for any room.',
    category: 'Decoration',
    stock: 25,
    featured: false,
    rating: 4.5,
    reviews: 28
  },
  {
    id: '15',
    name: 'Ceramic Sculpture - Abstract',
    price: 156.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Unique abstract ceramic sculpture. Each piece is one-of-a-kind and makes a stunning focal point.',
    category: 'Decoration',
    stock: 3,
    featured: true,
    rating: 4.9,
    reviews: 12
  },

  // Kitchen & Serving
  {
    id: '16',
    name: 'Ceramic Serving Platter',
    price: 48.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    description: 'Large ceramic serving platter perfect for entertaining. Beautiful reactive glaze creates unique patterns.',
    category: 'Serving',
    stock: 15,
    featured: false,
    rating: 4.6,
    reviews: 41
  },
  {
    id: '17',
    name: 'Ceramic Mixing Bowl Set',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
    description: 'Set of 3 nesting ceramic mixing bowls. Perfect for baking and food preparation with non-slip bases.',
    category: 'Kitchen',
    stock: 21,
    featured: false,
    rating: 4.7,
    reviews: 58
  },
  {
    id: '18',
    name: 'Ceramic Butter Dish',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    description: 'Classic ceramic butter dish with lid. Keeps butter fresh and adds elegance to your breakfast table.',
    category: 'Kitchen',
    stock: 32,
    featured: false,
    rating: 4.3,
    reviews: 76
  },

  // Bathroom & Home
  {
    id: '19',
    name: 'Ceramic Soap Dispenser',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Elegant ceramic soap dispenser with pump mechanism. Adds style to any bathroom or kitchen sink.',
    category: 'Bathroom',
    stock: 18,
    featured: false,
    rating: 4.4,
    reviews: 33
  },
  {
    id: '20',
    name: 'Ceramic Tissue Box Cover',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Decorative ceramic tissue box cover. Hides unsightly tissue boxes while adding style to your space.',
    category: 'Bathroom',
    stock: 26,
    featured: false,
    rating: 4.1,
    reviews: 19
  }
]

// Mock categories for filtering
export const categories = [
  'All',
  'Vases',
  'Dinnerware', 
  'Drinkware',
  'Planters',
  'Decoration',
  'Serving',
  'Kitchen',
  'Bathroom'
]

// Mock user data for testing
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    address: '123 Main St, Anytown, USA 12345',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2', 
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    address: '456 Oak Ave, Somewhere, USA 67890',
    phone: '+1 (555) 987-6543'
  }
]

// Mock orders for testing
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[3], quantity: 2 }
    ],
    total: 181.97,
    status: 'delivered',
    createdAt: new Date('2024-01-15'),
    shippingAddress: '123 Main St, Anytown, USA 12345',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      { product: mockProducts[4], quantity: 1 }
    ],
    total: 189.99,
    status: 'shipped',
    createdAt: new Date('2024-01-20'),
    shippingAddress: '123 Main St, Anytown, USA 12345',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    userId: '1',
    items: [
      { product: mockProducts[6], quantity: 3 },
      { product: mockProducts[9], quantity: 1 }
    ],
    total: 94.96,
    status: 'processing',
    createdAt: new Date('2024-01-25'),
    shippingAddress: '123 Main St, Anytown, USA 12345'
  }
]

// Store state
export const useAuthStore = () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      // Find user in mock data or create new one
      const existingUser = mockUsers.find(u => u.email === email)
      if (existingUser) {
        user.value = existingUser
      } else {
        user.value = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0]
        }
      }
      return true
    }
    return false
  }

  const register = (email: string, password: string, name: string) => {
    // Mock registration
    if (email && password && name) {
      user.value = {
        id: Date.now().toString(),
        email,
        name
      }
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    register,
    logout,
    updateProfile
  }
}

export const useCartStore = () => {
  const items = ref<CartItem[]>([])
  
  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  const totalPrice = computed(() => 
    items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  )

  const addToCart = (product: Product, quantity = 1) => {
    // Validate product
    if (!product || !product.id) {
      throw new Error('Invalid product')
    }

    // Check stock availability
    if (product.stock <= 0) {
      throw new Error('Product is out of stock')
    }

    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      
      // Check if new quantity exceeds stock
      if (newQuantity > product.stock) {
        throw new Error(`Only ${product.stock} items available in stock`)
      }
      
      existingItem.quantity = newQuantity
    } else {
      // Check if requested quantity exceeds stock
      if (quantity > product.stock) {
        throw new Error(`Only ${product.stock} items available in stock`)
      }
      
      items.value.push({ product, quantity })
    }
  }

  const removeFromCart = (productId: string) => {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        // Check stock availability
        if (quantity > item.product.stock) {
          throw new Error(`Only ${item.product.stock} items available in stock`)
        }
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const getItemQuantity = (productId: string) => {
    const item = items.value.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  const isInCart = (productId: string) => {
    return items.value.some(item => item.product.id === productId)
  }

  return {
    items: readonly(items),
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart
  }
}

export const useOrderStore = () => {
  const orders = ref<Order[]>([...mockOrders])

  const createOrder = (cartItems: CartItem[], shippingAddress: string, userId: string) => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      userId,
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date(),
      shippingAddress,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }
    
    orders.value.push(order)
    return order
  }

  const getUserOrders = (userId: string) => {
    return orders.value.filter(order => order.userId === userId)
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
    }
  }

  return {
    orders: readonly(orders),
    createOrder,
    getUserOrders,
    updateOrderStatus
  }
}

// Product store for filtering and searching
export const useProductStore = () => {
  const products = ref<Product[]>([...mockProducts])
  const selectedCategory = ref('All')
  const searchQuery = ref('')
  const sortBy = ref<'name' | 'price' | 'rating'>('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')

  const filteredProducts = computed(() => {
    let filtered = products.value

    // Filter by category
    if (selectedCategory.value !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy.value]
      let bValue: any = b[sortBy.value]

      if (sortBy.value === 'name') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder.value === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  })

  const featuredProducts = computed(() => 
    products.value.filter(product => product.featured)
  )

  const getProductById = (id: string) => {
    return products.value.find(product => product.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return products.value.filter(product => product.category === category)
  }

  const searchProducts = (query: string) => {
    searchQuery.value = query
  }

  const setCategory = (category: string) => {
    selectedCategory.value = category
  }

  const setSorting = (field: 'name' | 'price' | 'rating', order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
  }

  return {
    products: readonly(products),
    filteredProducts,
    featuredProducts,
    selectedCategory: readonly(selectedCategory),
    searchQuery: readonly(searchQuery),
    sortBy: readonly(sortBy),
    sortOrder: readonly(sortOrder),
    getProductById,
    getProductsByCategory,
    searchProducts,
    setCategory,
    setSorting
  }
}