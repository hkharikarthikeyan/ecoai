"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, MessageCircle, Phone, Search, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import AnimationObserver from "@/components/animation-observer"
import App from "@/App"

interface ThumbsUpProps extends React.SVGProps<SVGSVGElement> {
  // You can add any additional props if needed
}

function ThumbsUp(props: ThumbsUpProps) {
  return (
    <svg
      {...props} // Spread props to allow passing SVG attributes
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
      <path d="M2 10h4v12H2z" />
      <path d="M22 10h-4v12h4z" />
      <path d="M6 10h12l-6-8z" />
    </svg>
  );
}

interface MessageForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  message: string;
  centerName: string;
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string; // Optional className prop
}

function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium leading-none ${className}`} // Combine with any additional classes
      {...props} // Spread other props onto the label
    />
  );
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("centers")
  const [selectedCenter, setSelectedCenter] = useState<any>(null)
  const [messageForm, setMessageForm] = useState<MessageForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    message: "",
    centerName: "",
  })

  // Mock community centers data
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
      events: [
        {
          title: "E-Waste Collection Drive",
          date: "2023-08-15",
          time: "10:00 AM - 2:00 PM",
          description: "Bring your old electronics for responsible recycling. Get bonus points for participation!",
        },
      ],
      members: 124,
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
      events: [
        {
          title: "Recycling Workshop",
          date: "2023-08-20",
          time: "3:00 PM - 5:00 PM",
          description: "Learn how to properly recycle different types of e-waste and their environmental impact.",
        },
      ],
      members: 98,
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
      events: [
        {
          title: "Tech Repair Cafe",
          date: "2023-08-25",
          time: "1:00 PM - 4:00 PM",
          description:
            "Bring your broken electronics and learn how to repair them with the help of our tech experts. Extend the life of your devices!",
        },
      ],
      members: 76,
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
      events: [
        {
          title: "Community Cleanup Day",
          date: "2023-09-05",
          time: "9:00 AM - 12:00 PM",
          description: "Join us for a neighborhood cleanup and e-waste collection event. Refreshments provided!",
        },
      ],
      members: 145,
    },
  ]

  // Filter centers based on search query
  const filteredCenters = centers.filter((center) => {
    return (
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Handle message form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setMessageForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle pickup request submission
  const handlePickupRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Pickup Request Sent",
      description: `Your request has been sent to ${messageForm.centerName}. They will contact you shortly.`,
    })
    // Reset form
    setMessageForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      time: "",
      message: "",
      centerName: "",
    })
  }

  return (
    <div className="container py-10">
      <AnimationObserver />

      <div className="max-w-3xl mx-auto text-center mb-10 fade-in-up">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Community Hub</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Connect with local recycling centers, join events, and schedule pickups for your e-waste.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 fade-in-up">
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

        <Card className="fade-in-up delay-100">
          <CardHeader className="pb-3">
            <CardTitle>Community Stats</CardTitle>
            <CardDescription>Our growing recycling community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-2xl font-bold text-primary">443</p>
                <p className="text-sm text-muted-foreground">Community Members</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <App/>
      </div>

      <Tabs defaultValue="centers" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="centers">Collection Centers</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="centers" className="mt-6">
          {filteredCenters.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCenters.map((center) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="slide-in-up"
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image src={center.image || "/placeholder.svg"} alt={center.name} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{center.name}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {center.distance} mi
                        </Badge>
                      </div>
                      <CardDescription className="flex items-start">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-1 mt-0.5 shrink-0" />
                        {center.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 flex-grow">
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-primary mr-2" />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <Clock className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span>{center.hours}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span>{center.members} community members</span>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => setMessageForm((prev) => ({ ...prev, centerName: center.name }))}
                          >
                            Request Pickup
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Schedule E-Waste Pickup</DialogTitle>
                            <DialogDescription>
                              Fill out this form to request a pickup from {center.name}
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handlePickupRequest}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={messageForm.name}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                  Email
                                </Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={messageForm.email}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                  Phone
                                </Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  value={messageForm.phone}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="address" className="text-right">
                                  Address
                                </Label>
                                <Input
                                  id="address"
                                  name="address"
                                  value={messageForm.address}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                  Date
                                </Label>
                                <Input
                                  id="date"
                                  name="date"
                                  type="date"
                                  value={messageForm.date}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                  Time
                                </Label>
                                <Select
                                  name="time"
                                  value={messageForm.time}
                                  onValueChange={(value) => setMessageForm((prev) => ({ ...prev, time: value }))}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                                    <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                                    <SelectItem value="evening">Evening (4PM - 7PM)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="message" className="text-right">
                                  Details
                                </Label>
                                <Textarea
                                  id="message"
                                  name="message"
                                  placeholder="Describe the e-waste items you need picked up"
                                  value={messageForm.message}
                                  onChange={handleInputChange}
                                  className="col-span-3"
                                  required
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="bg-primary hover:bg-primary/90">
                                Submit Request
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No centers found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Reset Search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {centers.flatMap((center) =>
              center.events.map((event, index) => (
                <motion.div
                  key={`${center.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="slide-in-up"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </Badge>
                      </div>
                      <CardDescription>{center.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-start text-sm mt-2">
                        <MapPin className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span>{center.address}</span>
                      </div>
                      <p className="text-sm mt-2">{event.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90">RSVP to Event</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )),
            )}
          </div>
        </TabsContent>

        <TabsContent value="forum" className="mt-6">
          <div className="grid gap-6">
            <Card className="fade-in-up">
              <CardHeader>
                <CardTitle>Community Discussion</CardTitle>
                <CardDescription>Join the conversation about e-waste recycling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      author: "EcoWarrior",
                      avatar: "/placeholder.svg?height=40&width=40",
                      date: "2 days ago",
                      title: "Best way to recycle old smartphones?",
                      content:
                        "I have a drawer full of old smartphones. What's the best way to recycle them and ensure data privacy?",
                      replies: 12,
                      likes: 24,
                    },
                    {
                      id: 2,
                      author: "GreenTech",
                      avatar: "/placeholder.svg?height=40&width=40",
                      date: "1 week ago",
                      title: "Downtown Eco Center experience",
                      content:
                        "Just wanted to share my great experience at the Downtown Eco Center. They were super helpful with my old computer equipment!",
                      replies: 8,
                      likes: 19,
                    },
                    {
                      id: 3,
                      author: "RecycleQueen",
                      avatar: "/placeholder.svg?height=40&width=40",
                      date: "2 weeks ago",
                      title: "Upcoming E-Waste Collection Drive",
                      content:
                        "Is anyone planning to attend the E-Waste Collection Drive at Green Valley Recycling next weekend? I have some large items to bring.",
                      replies: 15,
                      likes: 32,
                    },
                  ].map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Image
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.author}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{post.title}</h3>
                            <span className="text-xs text-muted-foreground">{post.date}</span>
                          </div>
                          <p className="text-sm text-primary font-medium">{post.author}</p>
                          <p className="text-sm mt-2">{post.content}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageCircle className="h-4 w-4 mr-1" /> {post.replies} Replies
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-4 w-4 mr-1" /> {post.likes} Likes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">Start a New Discussion</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg mt-12 fade-in-up">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
            <p className="text-muted-foreground mb-4">
              Become part of our growing community of eco-conscious individuals. Share tips, attend events, and help
              make a difference.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Connect with Like-minded People</h3>
                  <p className="text-sm text-muted-foreground">
                    Share ideas and learn from others passionate about sustainability
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Attend Local Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Participate in workshops, collection drives, and community meetups
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Get Support</h3>
                  <p className="text-sm text-muted-foreground">Ask questions and get help with your recycling needs</p>
                </div>
              </div>
            </div>
            <Button className="mt-6 bg-primary hover:bg-primary/90">Join Community</Button>
          </div>
          <div className="hidden md:block">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Community illustration"
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

