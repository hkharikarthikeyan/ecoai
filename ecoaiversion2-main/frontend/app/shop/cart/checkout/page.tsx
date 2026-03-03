"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Award, CreditCard, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import App from "@/App"

interface CartItem {
  id: string
  points: number
  quantity: number
  name: string
  image?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()

  const [cartItems, setCartItems] = useState([])
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Calculate total points
  const subtotal = cartItems.reduce((total, item: any) => total + item.product_points * item.quantity, 0)
  const deliveryFee = deliveryMethod === "delivery" ? 50 : 0
  const totalPoints = subtotal + deliveryFee

  // Form data for delivery
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  })

  // Load cart items from backend
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`)
          if (res.ok) {
            const data = await res.json()
            setCartItems(data)
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error)
        }
      }
      fetchCart()
    }
  }, [user])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle checkout
  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?redirect=/shop/cart/checkout")
      return
    }

    if (totalPoints > (user?.points || 0)) {
      setError("You don't have enough points for this order")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const orderData = {
        cart_items: cartItems.map((item: any) => ({
          id: item.product_id,
          name: item.product_name,
          points: item.product_points,
          quantity: item.quantity
        })),
        delivery_method: deliveryMethod,
        total_points: totalPoints,
        delivery_details: deliveryMethod === "delivery" ? {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          phone: formData.phone
        } : null,
        user_id: user.id
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/user/${user.id}`, { method: "DELETE" })
        window.dispatchEvent(new Event("cartUpdated"))
        router.push(`/shop/order-confirmation/${result.order_id}`)
      } else {
        setError(result.detail || "Failed to place order")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setError("An error occurred while processing your order")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shop/cart">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to cart</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold ml-2">Checkout</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Delivery Method</CardTitle>
                <CardDescription>Choose how you want to receive your items</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="flex items-start space-x-2 mb-4">
                    <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="pickup" className="font-medium">
                        Pickup from Collection Center
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Pick up your items from your nearest collection center at no additional cost.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="delivery" className="font-medium">
                        Home Delivery
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get your items delivered to your doorstep for an additional 50 points.
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                {deliveryMethod === "delivery" && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium">Delivery Address</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
<App/>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your items before completing your order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image src={item.product_image || "/placeholder.svg"} alt={item.product_name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{item.product_name}</h3>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.product_points * item.quantity} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal} points</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>50 points</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{totalPoints} points</span>
                </div>

                <div className="bg-muted p-3 rounded-lg text-sm">
                  <p className="font-medium mb-1">Available Balance</p>
                  <p className="text-green-600 font-bold text-lg flex items-center">
                    <Award className="h-4 w-4 mr-1" /> {user?.points || 0} points
                  </p>
                  {totalPoints > (user?.points || 0) && (
                    <p className="text-destructive mt-2">You don't have enough points for this order.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={
                    isLoading ||
                    totalPoints > (user?.points || 0) ||
                    (deliveryMethod === "delivery" && Object.values(formData).some((val) => !val))
                  }
                  onClick={handleCheckout}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Order
                    </>
                  )}
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/shop/cart">Back to Cart</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-muted rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">You need to add items to your cart before checkout.</p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

