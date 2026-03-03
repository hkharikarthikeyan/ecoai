import { NextResponse } from "next/server"
import { getOrderById } from "@/lib/orders"

export async function GET(request, context) {
  try {
    // Ensure params is properly awaited
    const params = await context.params

    // Check if params and id exist
    if (!params?.id) {
      return NextResponse.json({ success: false, message: "Missing order ID" }, { status: 400 })
    }

    // Fetch order details
    const result = await getOrderById(params.id)

    if (!result?.success) {
      return NextResponse.json({ success: false, message: result?.message || "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, order: result.order })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

