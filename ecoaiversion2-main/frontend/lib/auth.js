"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function loginUser(formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const result = await res.json()
    
    if (!result.success) {
      return result
    }

    cookies().set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user: result.user }
  } catch (error) {
    return { success: false, message: "Connection error" }
  }
}

export async function registerUser(formData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    
    const result = await res.json()
    
    if (!result.success) {
      return result
    }

    // Auto-login after registration
    cookies().set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user: result.user }
  } catch (error) {
    return { success: false, message: "Connection error" }
  }
}

export async function logoutUser() {
  cookies().delete("auth_token")
  return { success: true }
}

export async function getCurrentUser() {
  try {
    const token = cookies().get("auth_token")?.value
    
    if (!token) {
      return null
    }

    const res = await fetch(`${API_URL}/auth/me?token=${token}`)
    
    if (!res.ok) {
      cookies().delete("auth_token")
      return null
    }
    
    return await res.json()
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }
  
  return user
}

