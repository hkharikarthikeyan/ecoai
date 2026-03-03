"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, MapPin, Recycle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AnimationObserver from "@/components/animation-observer"
import App from "@/App"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimationObserver />

      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 mb-4 text-xs md:text-sm font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                  🌱 Eco-Friendly Initiative
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Recycle E-Waste, Earn Rewards
                </h1>
                <p className="max-w-[600px] text-sm md:text-base lg:text-xl text-muted-foreground">
                  Turn your electronic waste into reward points. Shop eco-friendly products with your earned points.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all text-sm md:text-base">
                  <Link href="/collection-centers">Find Recycle Centers</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 hover:bg-green-50 dark:hover:bg-green-950 text-sm md:text-base">
                  <Link href="/ewaste">Learn About E-Waste</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur-2xl opacity-20 animate-pulse"></div>
              <Image
                src="/images/download.png"
                alt="E-waste recycling illustration"
                width={550}
                height={550}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-2xl relative z-10 ring-4 ring-white dark:ring-gray-800"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-8 md:py-12 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter fade-in-up">How It Works</h2>
              <p className="text-sm md:text-base lg:text-xl text-muted-foreground fade-in-up delay-100">
                Our simple process to recycle e-waste and earn rewards
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center slide-in-left group">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">1. Collect E-Waste</h3>
              <p className="text-muted-foreground">
                Gather your old electronics, batteries, and other e-waste items from your home.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center slide-in-left delay-200 group">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">2. Drop at Collection Center</h3>
              <p className="text-muted-foreground">
                Visit your nearest collection center and drop off your e-waste for proper recycling.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center slide-in-left delay-300 group">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">3. Earn & Redeem Points</h3>
              <p className="text-muted-foreground">
                Get reward points based on quantity and quality. Use points to shop eco-friendly products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-8 md:py-12 lg:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter fade-in-up">
                Featured Products
              </h2>
              <p className="text-sm md:text-base lg:text-xl text-muted-foreground fade-in-up delay-100">
                Redeem your points for these eco-friendly products
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 md:mt-8">
            {[
              {
                name: "Recycled Notebook",
                points: 200,
                image: "/images/download-1.jpeg",
              },
              {
                name: "Bamboo Cutlery Set",
                points: 350,
                image: "/images/download-2.jpeg",
              },
              {
                name: "Solar Power Bank",
                points: 1200,
                image: "/images/download-8.jpeg",
              },
              {
                name: "Eco-Friendly Water Bottle",
                points: 500,
                image: "/images/download-3.jpeg",
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden scale-in delay-100 group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500">
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-all group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                  <CardDescription className="flex items-center text-green-600 font-semibold">
                    <Award className="h-4 w-4 mr-1" /> {product.points} points
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button asChild variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white transition-all">
                    <Link href="/shop">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8 fade-in-up">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/shop" className="flex items-center">
                Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl fade-in-up">Our Impact</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed fade-in-up delay-100">
                  Together, we're making a difference in reducing e-waste and protecting our environment.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="slide-in-left hover:shadow-xl transition-all border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">5,000+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Kilograms of e-waste collected</p>
                  </CardContent>
                </Card>
                <Card className="slide-in-left delay-100 hover:shadow-xl transition-all border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">2,500+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Active users recycling e-waste</p>
                  </CardContent>
                </Card>
                <Card className="slide-in-left delay-200 hover:shadow-xl transition-all border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">50+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Collection centers nationwide</p>
                  </CardContent>
                </Card>
                <Card className="slide-in-left delay-300 hover:shadow-xl transition-all border-l-4 border-l-pink-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">1M+</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Reward points redeemed</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="slide-in-right"
            >
              <Image
                src="/images/imp.jpg"
                alt="Environmental impact illustration"
                width={550}
                height={550}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover shadow-lg"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter fade-in-up drop-shadow-lg">
                Join Our Mission Today
              </h2>
              <p className="text-white/90 text-sm md:text-base lg:text-xl fade-in-up delay-100">
                Start recycling e-waste, earning rewards, and shopping eco-friendly products.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row fade-in-up delay-200">
              <Button asChild size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm md:text-base">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm md:text-base"
              >
                <Link href="/collection-centers">Find Nearest Center</Link>
              </Button>
            </div>
          </div>
        </div>
        <App/>
      </section>
    </div>
  )
}

