"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Phone, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import App from "@/App"

export default function CollectionCentersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDistance, setFilterDistance] = useState("all")

  // Mock collection centers data
  const centers = [
    {
      id: 1,
      name: "Downtown Eco Center",
      address: "123 Main Street, Eco City, EC 12345",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri: 9am-5pm, Sat: 10am-4pm",
      distance: 1.2,
      image: "/images/cen-1.jpg",
      features: ["Electronics", "Batteries", "Appliances"],
      acceptsLargeItems: true,
    },
    {
      id: 2,
      name: "Green Valley Recycling",
      address: "456 Park Avenue, Eco City, EC 12345",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Sat: 8am-7pm, Sun: 10am-4pm",
      distance: 2.5,
      image: "/images/cen-2.png",
      features: ["Electronics", "Batteries", "Free Data Wiping"],
      acceptsLargeItems: true,
    },
    {
      id: 3,
      name: "Tech Reclaim Center",
      address: "789 Tech Blvd, Eco City, EC 12345",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Fri: 10am-6pm",
      distance: 3.8,
      image: "/images/cen-3.jpg",
      features: ["Electronics", "Computer Parts", "Mobile Devices"],
      acceptsLargeItems: false,
    },
    {
      id: 4,
      name: "EcoTech Recyclers",
      address: "321 Green Street, Eco City, EC 12345",
      phone: "+1 (555) 789-0123",
      hours: "Tue-Sat: 9am-5pm",
      distance: 5.2,
      image: "/images/cen-4.jpeg",
      features: ["Electronics", "Batteries", "Appliances", "Free Pickup"],
      acceptsLargeItems: true,
    },
    {
      id: 5,
      name: "Sustainable Solutions",
      address: "555 Eco Drive, Eco City, EC 12345",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm",
      distance: 7.5,
      image: "/images/cen-5.png",
      features: ["Electronics", "Batteries", "Corporate Services"],
      acceptsLargeItems: true,
    },
    {
      id: 6,
      name: "Community Recycling Hub",
      address: "888 Community Lane, Eco City, EC 12345",
      phone: "+1 (555) 345-6789",
      hours: "Wed-Sun: 10am-6pm",
      distance: 8.9,
      image: "/images/cen-6.png",
      features: ["Electronics", "Educational Programs", "Community Events"],
      acceptsLargeItems: false,
    },
  ]

  // Filter centers based on search query and distance filter
  const filteredCenters = centers.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDistance =
      filterDistance === "all" ||
      (filterDistance === "under5" && center.distance < 5) ||
      (filterDistance === "5to10" && center.distance >= 5 && center.distance <= 10) ||
      (filterDistance === "over10" && center.distance > 10)

    return matchesSearch && matchesDistance
  })

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recycle Centers</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Find your nearest e-waste collection center and start recycling today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Find a Collection Center</CardTitle>
            <CardDescription>Search by location or center name</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Enter city, zip code, or center name"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filter Results</CardTitle>
            <CardDescription>Narrow down your search</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={filterDistance} onValueChange={setFilterDistance}>
              <SelectTrigger>
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Distances</SelectItem>
                <SelectItem value="under5">Under 5 miles</SelectItem>
                <SelectItem value="5to10">5-10 miles</SelectItem>
                <SelectItem value="over10">Over 10 miles</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <App/>
      </div>

      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          {filteredCenters.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCenters.map((center) => (
                <Card key={center.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image src={center.image || "/placeholder.svg"} alt={center.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {center.distance} mi
                      </Badge>
                    </div>
                    <CardDescription className="flex items-start">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1 mt-0.5 shrink-0" />
                      {center.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 shrink-0" />
                      <span>{center.hours}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {center.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {center.acceptsLargeItems && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-100">
                          Large Items
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`} target="_blank">
                        Directions
                      </Link>
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No centers found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilterDistance("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="map" className="mt-6">
          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="aspect-[16/9] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Interactive Map</h3>
                  <p className="text-muted-foreground mb-4">Map view would display all collection centers here.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <h2 className="text-xl font-bold">Nearby Centers</h2>
            {filteredCenters.slice(0, 3).map((center) => (
              <Card key={center.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold">{center.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {center.address}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {center.hours}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline">{center.distance} mi</Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`} target="_blank">
                          Directions
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted rounded-lg p-6 mt-12">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Schedule a Pickup</h2>
            <p className="text-muted-foreground mb-4">
              Can't make it to a collection center? We offer pickup services for large quantities of e-waste or for Gold
              tier members.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Flexible Scheduling</h3>
                  <p className="text-sm text-muted-foreground">Choose a date and time that works for you</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Convenient Service</h3>
                  <p className="text-sm text-muted-foreground">We'll come to your home or office</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Earn Bonus Points</h3>
                  <p className="text-sm text-muted-foreground">Get 10% extra points for scheduled pickups</p>
                </div>
              </div>
            </div>
            <Button className="mt-6 bg-green-600 hover:bg-green-700">Schedule Pickup</Button>
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/pickup.png"
              alt="E-waste pickup service"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Award(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

