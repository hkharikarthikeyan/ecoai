import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Create FormData object for server action
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)

    const result = await registerUser(formData)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

