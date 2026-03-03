"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, Edit, MapPin, Package, ShoppingBag, User } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Web3Connect } from "@/components/web3-connect"
import { Alert, AlertDescription } from "@/components/ui/alert"
import App from "@/App"

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [userOrders, setUserOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserOrders() {
      if (!user) return
      
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        const res = await fetch(`${API_URL}/orders/user/${user.id}`)
        
        if (res.ok) {
          const orders = await res.json()
          setUserOrders(orders)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserOrders()
  }, [user])

  if (!user && !loading) {
    return (
      <div className="container py-10">
        <Alert>
          <AlertDescription>
            Please{" "}
            <Link href="/login" className="font-medium underline">
              log in
            </Link>{" "}
            to view your profile.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Calculate next tier threshold
  const tierThresholds = {
    Bronze: 1000,
    Silver: 2000,
    Gold: Number.POSITIVE_INFINITY,
  }

  const nextTier = user?.tier === "Bronze" ? "Silver" : user?.tier === "Silver" ? "Gold" : null
  const nextTierPoints = tierThresholds[user?.tier as keyof typeof tierThresholds] || 1000

  // Mock user data for display
  const userData = {
    name: user?.name || "Loading...",
    email: user?.email || "Loading...",
    address: "123 Green Street, Eco City, EC 12345",
    phone: "+1 (555) 123-4567",
    joinDate: user?.join_date ? new Date(user.join_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "January 2023",
    points: user?.points || 0,
    nextTier: nextTierPoints,
    tier: user?.tier || "Bronze",
    recycled: user?.recycled || 0,
    activities: [],
    orders: userOrders || [],
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3 lg:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile picture"
                    fill
                    className="rounded-full object-cover border-4 border-green-100"
                  />
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit profile picture</span>
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{userData.email}</p>
                <div className="flex items-center justify-center mb-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {userData.tier} Member
                  </Badge>
                </div>
                <div className="w-full mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{userData.points} points</span>
                    <span>{userData.nextTier} points</span>
                  </div>
                  <Progress value={(userData.points / userData.nextTier) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {nextTier
                      ? `${userData.nextTier - userData.points} points until ${nextTier} tier`
                      : "Maximum tier reached"}
                  </p>
                </div>
                <div className="grid w-full gap-2">
                  <Button asChild variant="outline">
                    <Link href="/profile/edit">Edit Profile</Link>
                  </Button>
                </div>
              </div>
              <Separator className="my-6" />
              <nav className="grid gap-2 text-sm">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "rewards" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("rewards")}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Rewards
                </Button>
                <Button
                  variant={activeTab === "orders" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "recycling" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("recycling")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Recycling History
                </Button>
                <Button
                  variant={activeTab === "blockchain" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("blockchain")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Blockchain
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 lg:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="recycling">Recycling</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                      <p>{userData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p>{userData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                      <p>{userData.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                      <p>{userData.joinDate}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <div className="flex items-start mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <p>{userData.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
<App/>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent recycling and shopping activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.orders.length > 0 ? (
                      userData.orders.slice(0, 3).map((order: any) => (
                        <div key={order.id} className="flex items-start">
                          <div className="rounded-full p-2 mr-4 bg-blue-100 text-blue-700">
                            <ShoppingBag className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                              <p className="text-sm font-medium text-muted-foreground">-{order.total_points} points</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">No recent activity</p>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-green-600" onClick={() => setActiveTab("orders")}>
                      View all orders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Points</CardTitle>
                  <CardDescription>Your current points balance and tier status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                    <Award className="h-12 w-12 text-green-600 mb-4" />
                    <h3 className="text-3xl font-bold text-green-600">{userData.points}</h3>
                    <p className="text-muted-foreground">Available Points</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Membership Tier</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Award className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{userData.tier}</p>
                            <p className="text-sm text-muted-foreground">Current Tier</p>
                          </div>
                        </div>
                        <Badge>Active</Badge>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{userData.points} points</span>
                          <span>{userData.nextTier} points</span>
                        </div>
                        <Progress value={(userData.points / userData.nextTier) * 100} className="h-2" />
                        <p className="text-sm mt-2">
                          {nextTier ? (
                            <>
                              You need{" "}
                              <span className="font-medium">{userData.nextTier - userData.points} more points</span> to
                              reach {nextTier} tier
                            </>
                          ) : (
                            <>You have reached the highest tier</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Points History</h3>
                    {userData.orders.length > 0 ? (
                      <div className="space-y-3">
                        {userData.orders.slice(0, 5).map((order: any) => (
                          <div
                            key={order.id}
                            className="flex justify-between items-center py-2 border-b last:border-0"
                          >
                            <div>
                              <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <p className="font-medium text-muted-foreground">-{order.total_points}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-4">No points history yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Products</CardTitle>
                  <CardDescription>Products you can get with your current points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Recycled Notebook",
                        points: 200,
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      {
                        name: "Bamboo Cutlery Set",
                        points: 350,
                        image: "/placeholder.svg?height=100&width=100",
                      },
                      {
                        name: "Eco-Friendly Water Bottle",
                        points: 500,
                        image: "/placeholder.svg?height=100&width=100",
                      },
                    ].map((product, index) => (
                      <div key={index} className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="relative w-20 h-20 mb-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-center">{product.name}</h4>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <Award className="h-3 w-3 mr-1" /> {product.points} points
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          disabled={userData.points < product.points}
                        >
                          {userData.points >= product.points ? "Redeem" : "Not enough points"}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button asChild variant="link" className="text-green-600">
                      <Link href="/shop">View all products</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.orders.length > 0 ? (
                    <div className="space-y-6">
                      {userData.orders.slice(0, 3).map((order: any) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted p-4 flex flex-wrap justify-between items-center gap-2">
                            <div>
                              <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="text-sm font-medium mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.cart_items?.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                  <p>{item.name} x{item.quantity}</p>
                                  <p className="text-sm text-muted-foreground">{item.points * item.quantity} points</p>
                                </div>
                              ))}
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center">
                              <p className="font-medium">Total</p>
                              <p className="font-medium">{order.total_points} points</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                      <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link href="/shop">Start Shopping</Link>
                      </Button>
                    </div>
                  )}

                  {userData.orders.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button asChild variant="outline">
                        <Link href="/profile/orders">View All Orders</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recycling Tab */}
            <TabsContent value="recycling" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recycling Impact</CardTitle>
                  <CardDescription>Your contribution to a greener planet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-3xl font-bold text-green-600">{userData.recycled} kg</h3>
                      <p className="text-sm text-muted-foreground">Total E-Waste Recycled</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-3xl font-bold text-green-600">12</h3>
                      <p className="text-sm text-muted-foreground">Recycling Visits</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <h3 className="text-3xl font-bold text-green-600">135 kg</h3>
                      <p className="text-sm text-muted-foreground">CO₂ Emissions Saved</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-3">Recycling History</h3>
                  {userData.recycled > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-start p-4 border rounded-lg">
                        <div className="rounded-full p-2 mr-4 bg-green-100 text-green-700">
                          <Package className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Total e-waste recycled: {userData.recycled} kg</p>
                          <p className="text-sm text-muted-foreground mt-1">Keep up the great work!</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No recycling history yet</p>
                  )}

                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Upcoming Collection Centers</h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Downtown Eco Center",
                          address: "123 Main St, Eco City",
                          distance: "1.2 miles",
                          hours: "Mon-Fri: 9am-5pm",
                        },
                        {
                          name: "Green Valley Recycling",
                          address: "456 Park Ave, Eco City",
                          distance: "2.5 miles",
                          hours: "Mon-Sat: 8am-7pm",
                        },
                      ].map((center, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{center.name}</p>
                            <p className="text-sm text-muted-foreground">{center.address}</p>
                            <p className="text-sm text-muted-foreground">{center.hours}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">{center.distance}</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              Get Directions
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button asChild variant="link" className="text-green-600">
                        <Link href="/collection-centers">View all centers</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blockchain Tab */}
            <TabsContent value="blockchain" className="space-y-6">
              <Web3Connect />

              {user?.walletAddress && (
                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Transactions</CardTitle>
                    <CardDescription>Your on-chain reward points activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-100 text-green-700 rounded-full p-2 mr-3">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Current Balance</p>
                            <p className="text-sm text-muted-foreground">On-chain points balance</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold">{userData.points} points</p>
                      </div>

                      <h3 className="font-medium mt-6 mb-2">Recent Transactions</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-3">
                          <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                            <div>Event</div>
                            <div>Amount</div>
                            <div>Date</div>
                            <div className="text-right">Tx Hash</div>
                          </div>
                        </div>
                        <div className="divide-y">
                          {[
                            {
                              event: "Points Awarded",
                              amount: 250,
                              date: "2023-06-10",
                              hash: "0x1a2b...3c4d",
                            },
                            {
                              event: "Points Redeemed",
                              amount: -550,
                              date: "2023-06-15",
                              hash: "0x5e6f...7g8h",
                            },
                            {
                              event: "Points Awarded",
                              amount: 400,
                              date: "2023-05-05",
                              hash: "0x9i0j...1k2l",
                            },
                          ].map((tx, index) => (
                            <div key={index} className="p-3">
                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>{tx.event}</div>
                                <div className={tx.amount > 0 ? "text-green-600" : "text-muted-foreground"}>
                                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                                </div>
                                <div className="text-muted-foreground">{tx.date}</div>
                                <div className="text-right">
                                  <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">
                                    {tx.hash}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <Button variant="outline">View All Transactions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function Wallet(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

