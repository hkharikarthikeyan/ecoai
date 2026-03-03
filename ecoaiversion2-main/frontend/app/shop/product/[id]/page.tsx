"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Award, Minus, Plus, ShoppingCart, Star, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import AnimationObserver from "@/components/animation-observer"
import App from "@/App"

export default function ProductPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string) || 1

  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  // Mock product data (replace with dynamic data fetching if needed)
  const product = {
    id: productId,
    name: "Eco-Friendly Recycled Notebook",
    description:
      "Crafted from 100% post-consumer recycled paper, this premium eco-friendly notebook is designed for sustainable writing. It features 120 smooth, acid-free pages bound in a sturdy kraft cover, making it perfect for journaling, sketching, and note-taking.",
    points: 250,
    category: "Stationery",
    featured: true,
    inStock: true,
    stockQuantity: 15,
    rating: 4.7,
    reviews: 32,
    images: [
      "/images/download-1.jpeg",
    ],
    features: [
      "Made from 100% post-consumer recycled paper",
      "120 acid-free pages",
      "Sturdy kraft cover",
      "Eco-friendly manufacturing process",
      "Supports reforestation initiatives",
    ],
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Increase quantity with stock limit check
  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((prev) => prev + 1)
    } else {
      toast({
        title: "Stock Limit Reached",
        description: "You've reached the maximum available stock for this product.",
      })
    }
  }

  // Decrease quantity with minimum limit check
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Add to cart with stock validation
  const addToCart = () => {
    if (!product.inStock) {
      toast({ title: "Out of Stock", description: "This product is currently out of stock." })
      return
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists in cart
      const updatedQuantity = existingCart[existingItemIndex].quantity + quantity
      if (updatedQuantity > product.stockQuantity) {
        toast({
          title: "Stock Limit Exceeded",
          description: `You can only add ${product.stockQuantity - existingCart[existingItemIndex].quantity} more of this item.`,
        })
        return
      }
      existingCart[existingItemIndex].quantity = updatedQuantity
    } else {
      // Add new item to cart
      existingCart.push({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0] || "/placeholder.svg",
        points: product.points,
        quantity: quantity,
        stockQuantity: product.stockQuantity || 10,
      })
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))
    toast({ title: "Added to Cart", description: `${product.name} has been added to your cart.` })

    // Trigger a custom event to notify the cart page
    window.dispatchEvent(new Event("cartUpdated"))
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center mb-8">
          <div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>
          <div className="h-6 w-40 bg-muted animate-pulse rounded ml-2"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <div className="h-full w-full bg-muted animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-muted animate-pulse rounded"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-1/2 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-1/4 bg-muted animate-pulse rounded"></div>
            <div className="h-24 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-10 w-1/3 bg-muted animate-pulse rounded"></div>
            <div className="flex gap-4 mt-6">
              <div className="h-12 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-12 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <AnimationObserver />

      <div className="flex items-center mb-8 fade-in-up">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to shop</span>
          </Link>
        </Button>
        <div className="ml-2 text-sm text-muted-foreground">
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>{" "}
          / {product.category}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4 slide-in-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-lg overflow-hidden border"
          >
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden border cursor-pointer transition-all ${
                  activeImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="slide-in-right">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            {product.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center mt-2 mb-4"
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center mb-6"
          >
            <div className="text-2xl font-bold text-primary flex items-center">
              <Award className="h-5 w-5 mr-1" /> {product.points} points
            </div>
            {product.inStock ? (
              <span className="ml-4 text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full">
                In Stock ({product.stockQuantity} left)
              </span>
            ) : (
              <span className="ml-4 text-sm text-red-700 flex items-center bg-red-100 px-2 py-1 rounded-full">
                <XCircle className="h-4 w-4 mr-1" /> Out of Stock
              </span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground mb-6"
          >
            {product.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <h3 className="font-medium mb-2">Key Features:</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
<App/>
          {/* Quantity Selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center mb-6"
          >
            <span className="mr-3 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-9 w-9 rounded-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= product.stockQuantity}
                className="h-9 w-9 rounded-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Add to Cart and Buy Now Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4"
          >
            <Button className="bg-primary hover:bg-primary/90 flex-1" onClick={addToCart} disabled={!product.inStock}>
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/shop/cart">Buy Now</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

