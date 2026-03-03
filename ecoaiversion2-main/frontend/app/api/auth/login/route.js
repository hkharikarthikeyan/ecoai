import { NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Create FormData object for server action
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    const result = await loginUser(formData)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 401 })
    }

    return NextResponse.json({ success: true, user: result.user })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

