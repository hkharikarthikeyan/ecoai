"use client"

import Link from "next/link"
import { Award, Menu, ShoppingBag, User, Wallet } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

// Assuming you have a CartItem type defined
interface CartItem {
    id: string;
    name: string;
    quantity: number;
    // Add other properties as needed
}

export function SiteHeader() {
  const { user, logout, connectWallet } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartUpdated, setCartUpdated] = useState(false)
  const pathname = usePathname()
  const [currentPathname, setCurrentPathname] = useState(pathname)

  useEffect(() => {
    setCurrentPathname(pathname)
  }, [pathname])

  // Get cart count from backend
  useEffect(() => {
    const getCartCount = async () => {
      if (user) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`)
          if (res.ok) {
            const cart = await res.json()
            const newCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)

            if (newCount > cartCount && cartCount > 0) {
              setCartUpdated(true)
              setTimeout(() => setCartUpdated(false), 2000)
            }

            setCartCount(newCount)
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error)
        }
      }
    }

    getCartCount()
    window.addEventListener("cartUpdated", getCartCount)
    return () => window.removeEventListener("cartUpdated", getCartCount)
  }, [user, cartCount])

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const handleConnectWallet = async () => {
    const result = await connectWallet()
    if (result.success) {
      toast({
        title: "Wallet connected",
        description: "Your wallet has been successfully connected.",
      })
    } else {
      toast({
        title: "Connection failed",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/ewaste", label: "E-Waste Info" },
    { href: "/collection-centers", label: "Recycle Centers" },
    { href: "/community", label: "Community" },
    { href: "/shop", label: "Shop" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isScrolled ? "shadow-md bg-background/95" : "bg-background/80"
      }`}
    >
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Recycle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </motion.div>
          <span className="font-bold text-base md:text-lg">EcoRecycle</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                currentPathname === item.href ? "text-primary font-semibold" : ""
              }`}
            >
              {item.label}
              {currentPathname === item.href && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center ml-auto space-x-2 md:space-x-4">
          <Link href="/shop/cart" className="relative">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: cartUpdated ? [1, 1.2, 1] : 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: cartUpdated ? 0.5 : 0.3,
                    type: "spring",
                  }}
                  className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="text-sm text-muted-foreground">
                  <Award className="mr-2 h-4 w-4 text-primary" />
                  {user.points || 0} points
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/rewards" className="cursor-pointer flex items-center">
                    <Award className="mr-2 h-4 w-4" /> Rewards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/orders" className="cursor-pointer flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Orders
                  </Link>
                </DropdownMenuItem>
                {!user.walletAddress && (
                  <DropdownMenuItem onClick={handleConnectWallet} className="cursor-pointer flex items-center">
                    <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex space-x-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" suppressHydrationWarning>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium ${
                      currentPathname === item.href ? "text-primary font-semibold" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {!user ? (
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                      asChild
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                      asChild
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Award className="h-3 w-3 mr-1 text-primary" /> {user.points || 0} points
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                      asChild
                    >
                      <Link href="/profile">My Profile</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                      asChild
                    >
                      <Link href="/profile/rewards">My Rewards</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                      asChild
                    >
                      <Link href="/profile/orders">My Orders</Link>
                    </Button>
                    {!user.walletAddress && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleConnectWallet()
                          setMobileMenuOpen(false)
                        }}
                      >
                        Connect Wallet
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

interface RecycleProps extends React.SVGProps<SVGSVGElement> {
  // You can add any additional props if needed
}

function Recycle(props: RecycleProps) {
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
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  )
}

