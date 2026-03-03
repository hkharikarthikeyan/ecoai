"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ChevronRight, Clock, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Order {
  _id: string
  createdAt: string
  trackingInfo: any
  items: any[]
  deliveryMethod: string
  deliveryAddress?: any
  totalPoints: number
}

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`)
        const data = await res.json()

        if (data.success) {
          setOrder(data.order)
        } else {
          setError(data.message || "Order not found")
        }
      } catch (error) {
        console.error("Error fetching order:", error)
        setError("An error occurred while loading your order")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground animate-pulse mb-4" />
          <h2 className="text-xl font-bold mb-2">Loading order details...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container py-10">
        <Alert variant="destructive">
          <AlertTitle>Order Not Found</AlertTitle>
          <AlertDescription>
            The order you are looking for does not exist. Please check the order ID and try again.
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order #{order._id.slice(0, 8)}</CardTitle>
            <CardDescription>
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Order Status</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-700 rounded-full p-2">
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{order.trackingInfo?.status}</p>
                      <p className="text-sm text-muted-foreground">{order.trackingInfo?.history[0].description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.points * item.quantity} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Delivery Method</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-700 rounded-full p-2">
                        {order.deliveryMethod === "pickup" ? (
                          <Package className="h-5 w-5" />
                        ) : (
                          <Truck className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">
                          {order.deliveryMethod === "pickup" ? "Pickup from Collection Center" : "Home Delivery"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.deliveryMethod === "pickup"
                            ? "Visit your nearest collection center to pick up your items"
                            : "Your items will be delivered to your address"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {order.deliveryMethod === "delivery" && order.deliveryAddress && (
                  <div>
                    <h3 className="font-medium mb-2">Delivery Address</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p>
                        {order.deliveryAddress.firstName} {order.deliveryAddress.lastName}
                      </p>
                      <p>{order.deliveryAddress.address}</p>
                      <p>
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zip}
                      </p>
                      <p>{order.deliveryAddress.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{order.totalPoints - (order.deliveryMethod === "delivery" ? 50 : 0)} points</span>
                  </div>
                  {order.deliveryMethod === "delivery" && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>50 points</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{order.totalPoints} points</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/profile/orders">View All Orders</Link>
              </Button>
              <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-4 bg-green-100 text-green-700 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is being processed and prepared for{" "}
                  {order.deliveryMethod === "pickup" ? "pickup" : "delivery"}.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 bg-green-100 text-green-700 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium">
                  {order.deliveryMethod === "pickup" ? "Pickup Notification" : "Shipping"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {order.deliveryMethod === "pickup"
                    ? "You'll receive an email when your order is ready for pickup."
                    : "Your order will be shipped to your address. You'll receive tracking information via email."}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 bg-green-100 text-green-700 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium">Enjoy Your Products</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for supporting sustainable products and e-waste recycling!
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button asChild variant="link" className="p-0 h-auto text-green-600">
              <Link href="/profile/orders" className="flex items-center">
                Track your order status
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

