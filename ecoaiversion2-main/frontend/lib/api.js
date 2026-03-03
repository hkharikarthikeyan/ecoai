const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = {
  async register(name, email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    return res.json()
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return res.json()
  },

  async logout() {
    const res = await fetch(`${API_URL}/auth/logout`, { method: 'POST' })
    return res.json()
  },

  async getCurrentUser(token) {
    const res = await fetch(`${API_URL}/auth/me?token=${token}`)
    return res.json()
  },

  async createOrder(orderData) {
    const res = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    return res.json()
  },

  async getOrder(orderId) {
    const res = await fetch(`${API_URL}/orders/${orderId}`)
    return res.json()
  },

  async getUserOrders(userId) {
    const res = await fetch(`${API_URL}/orders/user/${userId}`)
    return res.json()
  }
}
