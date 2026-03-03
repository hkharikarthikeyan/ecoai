"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: any
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  connectWallet: () => Promise<{ success: boolean; message?: string; walletAddress?: string }>
}

const AuthContext = createContext<AuthContextType | null>(null)

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>
      // Add other ethereum methods/properties as needed
    }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Fetch current user on initial load
  useEffect(() => {
    async function loadUserFromAPI() {
      try {
        setUser(null)
      } catch (error) {
        console.error("Error loading user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUserFromAPI()
  }, [])

  // Update path in cookie for redirect after login
  useEffect(() => {
    if (pathname) {
      document.cookie = `path=${pathname}; path=/; max-age=3600; SameSite=Lax`
    }
  }, [pathname])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (data.success) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An error occurred during registration" }
    }
  }

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return { success: false, message: "MetaMask is not installed" }
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        return { success: false, message: "No accounts found" }
      }

      const walletAddress = accounts[0]

      // Update user in database
      const res = await fetch("/api/user/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }),
      })

      const data = await res.json()

      if (data.success) {
        setUser((prev: any) => (prev ? { ...prev, walletAddress } : { walletAddress }))
        return { success: true, walletAddress }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error("Connect wallet error:", error)
      return { success: false, message: "An error occurred while connecting wallet" }
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    connectWallet,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

