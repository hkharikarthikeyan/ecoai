"use server"
import { getCurrentUser } from "./auth"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function createOrder(formData) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { success: false, message: "User not authenticated" }
    }

    const cartItems = JSON.parse(formData.get("cartItems"))
    const deliveryMethod = formData.get("deliveryMethod")
    const totalPoints = Number.parseInt(formData.get("totalPoints"))

    const orderData = {
      user_id: user.id,
      cart_items: cartItems,
      delivery_method: deliveryMethod,
      total_points: totalPoints,
      delivery_details: deliveryMethod === "delivery" ? {
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        phone: formData.get("phone"),
      } : null
    }

    const res = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })

    const result = await res.json()
    return result
  } catch (error) {
    return { success: false, message: "Connection error" }
  }
}

export async function getUserOrders() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { success: false, message: "User not authenticated" }
    }

    const res = await fetch(`${API_URL}/orders/user/${user.id}`)
    const orders = await res.json()
    
    return { success: true, orders }
  } catch (error) {
    return { success: false, message: "Connection error" }
  }
}

export async function getOrderById(orderId) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { success: false, message: "User not authenticated" }
    }

    const res = await fetch(`${API_URL}/orders/${orderId}`)
    const order = await res.json()
    
    return { success: true, order }
  } catch (error) {
    return { success: false, message: "Connection error" }
  }
}

