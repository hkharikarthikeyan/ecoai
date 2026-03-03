import { NextResponse } from "next/server"
import { logoutUser } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const result = await logoutUser()

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    const cookieStore = await cookies()
    cookieStore.delete("session_token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

