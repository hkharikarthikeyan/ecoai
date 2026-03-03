import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    const { walletAddress } = await request.json()

    const client = await clientPromise
    const db = client.db()

    await db.collection("users").updateOne({ _id: new ObjectId(user.id) }, { $set: { walletAddress } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

