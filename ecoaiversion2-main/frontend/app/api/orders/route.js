// app/api/orders/create/route.js
import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = "mongodb+srv://harik:hari919597@cluster1.vpugu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1" // Add your MongoDB connection string to .env
const client = new MongoClient(uri)

export async function POST(request) {
  try {
    const body = await request.formData()
    const cartItems = JSON.parse(body.get("cartItems"))
    const deliveryMethod = body.get("deliveryMethod")
    const totalPoints = Number.parseInt(body.get("totalPoints"))
    const deliveryDetails =
      deliveryMethod === "delivery"
        ? {
            firstName: body.get("firstName"),
            lastName: body.get("lastName"),
            address: body.get("address"),
            city: body.get("city"),
            state: body.get("state"),
            zip: body.get("zip"),
            phone: body.get("phone"),
          }
        : null

    // Connect to MongoDB
    await client.connect()
    const db = client.db("myDatabase") // Replace with your database name
    const ordersCollection = db.collection("orders")

    // Insert order into MongoDB
    const order = {
      userId: "user-id-here", // Replace with actual user ID from session or token
      cartItems,
      deliveryMethod,
      totalPoints,
      deliveryDetails,
      status: "pending",
      createdAt: new Date(),
    }

    const result = await ordersCollection.insertOne(order)

    // Return success response
    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
  } finally {
    await client.close()
  }
}

