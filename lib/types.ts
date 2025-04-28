export interface Book {
  id: string
  title: string
  authors: string[]
  description: string
  categories: string[]
  publisher?: string
  publishedDate?: string
  language?: string
  pageCount?: number
  printType?: string
  maturityRating?: string
  isbn?: string
  price: number
  coverImage: string
}

export interface OrderItem {
  id: string
  bookId: string
  title: string
  price: number
  quantity: number
  coverImage?: string
}

export interface Order {
  id: string
  userId: string
  status: string
  shippingAddress: string
  paymentMethod: string
  subtotal: number
  tax: number
  shipping: number
  total: number
  orderItems: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  isAdmin?: boolean
}
