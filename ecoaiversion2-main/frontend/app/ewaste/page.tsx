import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Battery, Cpu, HardDrive, Laptop, Smartphone, Tv } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import App from "@/App"

interface AwardProps {
  // Define any props that Award should accept, for example:
  width?: number; // Optional prop
  height?: number; // Optional prop
  // Add other props as needed
}

function Award(props: AwardProps) {
  return (
    <svg
      width={props.width || 24} // Default width if not provided
      height={props.height || 24} // Default height if not provided
      xmlns="http://www.w3.org/2000/svg"
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

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  // You can add any additional props if needed
}

function CheckIcon(props: CheckIconProps) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function EWastePage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">E-Waste Information</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Learn about electronic waste, its impact on the environment, and how you can help by recycling.
        </p>
      </div>
      <App/>

      <Tabs defaultValue="what-is-ewaste" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="what-is-ewaste">What is E-Waste?</TabsTrigger>
          <TabsTrigger value="acceptable-items">Acceptable Items</TabsTrigger>
          <TabsTrigger value="rewards">Rewards System</TabsTrigger>
        </TabsList>

        <TabsContent value="what-is-ewaste" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Understanding Electronic Waste</h2>
              <p className="text-muted-foreground mb-4">
                Electronic waste, or e-waste, refers to discarded electronic devices and equipment. These include
                computers, televisions, smartphones, and other electronic devices that have reached the end of their
                useful life.
              </p>
              <p className="text-muted-foreground mb-4">
                E-waste contains valuable materials that can be recovered and recycled, including gold, silver, copper,
                and palladium. However, it also contains hazardous materials like lead, mercury, and cadmium that can
                harm the environment and human health if not properly managed.
              </p>
              <p className="text-muted-foreground">
                By recycling your e-waste with us, you're helping to recover valuable resources, prevent pollution, and
                reduce the need for mining raw materials.
              </p>
            </div>
            <Image
              src="/images/img2.png"
              alt="E-waste illustration"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Environmental Impact</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resource Conservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Recycling e-waste recovers valuable materials and reduces the need for mining raw materials.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pollution Prevention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Proper e-waste disposal prevents toxic substances from contaminating soil and water.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Energy Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Recycling materials from e-waste uses significantly less energy than extracting and processing new
                    materials.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Why should I recycle my e-waste?</AccordionTrigger>
                <AccordionContent>
                  Recycling e-waste helps recover valuable materials, prevents toxic substances from entering the
                  environment, reduces the need for mining raw materials, and saves energy. Plus, with our program, you
                  earn reward points that can be redeemed for eco-friendly products!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I prepare my devices for recycling?</AccordionTrigger>
                <AccordionContent>
                  Before recycling your electronic devices, make sure to back up any important data, then perform a
                  factory reset to remove all personal information. Remove any batteries if possible, as they may need
                  to be recycled separately. If you're unsure how to prepare a specific device, our collection center
                  staff can assist you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data safe when I recycle my devices?</AccordionTrigger>
                <AccordionContent>
                  We take data security seriously. While we recommend that you erase all personal data from your devices
                  before recycling, our process includes a secure data destruction step for all storage devices. This
                  ensures that any remaining personal information cannot be recovered.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What happens to my e-waste after I drop it off?</AccordionTrigger>
                <AccordionContent>
                  After collection, your e-waste is sorted and sent to specialized recycling facilities. There, it
                  undergoes a process to safely separate valuable materials like gold, silver, copper, and plastics.
                  These materials are then processed and used to manufacture new products, completing the recycling
                  loop.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="acceptable-items" className="mt-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Acceptable E-Waste Items</h2>
            <p className="text-muted-foreground mt-2">
              We accept a wide range of electronic devices and components for recycling.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                  <Smartphone className="h-6 w-6" />
                </div>
                <CardTitle>Mobile Devices</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Smartphones</li>
                  <li>Tablets</li>
                  <li>Cell Phones</li>
                  <li>E-Readers</li>
                  <li>MP3 Players</li>
                </ul>
              </CardContent>
              <CardFooter className="text-center pt-0">
                <p className="text-sm font-medium text-green-600">50-200 points per device</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                  <Laptop className="h-6 w-6" />
                </div>
                <CardTitle>Computers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Laptops</li>
                  <li>Desktop Computers</li>
                  <li>Monitors</li>
                  <li>Keyboards & Mice</li>
                  <li>Printers & Scanners</li>
                </ul>
              </CardContent>
              <CardFooter className="text-center pt-0">
                <p className="text-sm font-medium text-green-600">100-500 points per device</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                  <Tv className="h-6 w-6" />
                </div>
                <CardTitle>Home Electronics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Televisions</li>
                  <li>DVD/Blu-ray Players</li>
                  <li>Gaming Consoles</li>
                  <li>Audio Equipment</li>
                  <li>Remote Controls</li>
                </ul>
              </CardContent>
              <CardFooter className="text-center pt-0">
                <p className="text-sm font-medium text-green-600">75-400 points per device</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                  <Cpu className="h-6 w-6" />
                </div>
                <CardTitle>Computer Components</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Motherboards</li>
                  <li>CPUs</li>
                  <li>Graphics Cards</li>
                  <li>RAM</li>
                  <li>Power Supplies</li>
                </ul>
              </CardContent>
              <CardFooter className="text-center pt-0">
                <p className="text-sm font-medium text-green-600">25-150 points per component</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                  <HardDrive className="h-6 w-6" />
                </div>
                <CardTitle>Storage Devices</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Hard Drives</li>
                  <li>SSDs</li>
                  <li>USB Flash Drives</li>
                  <li>Memory Cards</li>
                  <li>External Storage</li>
                </ul>
              </CardContent>
              <CardFooter className="text-center pt-0">
                <p className="text-sm font-medium text-green-600">15-100 points per device</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                  <Battery className="h-6 w-6" />
                </div>
                <CardTitle>Batteries & Accessories</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Rechargeable Batteries</li>
                  <li>Laptop Batteries</li>
                  <li>Phone Batteries</li>
                  <li>Chargers & Adapters</li>
                  <li>Cables & Wires</li>
                </ul>
              </CardContent>
              <CardFooter className="text-center pt-0">
                <p className="text-sm font-medium text-green-600">5-50 points per item</p>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-10 bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Items We Cannot Accept</h3>
            <p className="text-muted-foreground mb-4">
              For safety and regulatory reasons, we cannot accept the following items:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <span className="mr-2 text-red-500">✕</span> Damaged lithium batteries
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-red-500">✕</span> Smoke detectors
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-red-500">✕</span> Light bulbs (except LEDs)
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-red-500">✕</span> Appliances with refrigerants
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-red-500">✕</span> Medical devices
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-red-500">✕</span> Items with hazardous waste labels
              </li>
            </ul>
            <p className="text-sm mt-4">
              If you're unsure whether we can accept a specific item, please contact us before bringing it to a
              collection center.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">How Our Rewards System Works</h2>
              <p className="text-muted-foreground mb-4">
                Our rewards program is designed to incentivize e-waste recycling by offering points that can be redeemed
                for eco-friendly products in our shop.
              </p>
              <p className="text-muted-foreground mb-4">
                The number of points you earn depends on the type, quantity, and condition of the e-waste you recycle.
                Higher-value items like laptops and smartphones in good condition earn more points than smaller items
                like cables.
              </p>
              <p className="text-muted-foreground">
                Once you've earned points, you can browse our shop and redeem them for a variety of sustainable
                products, from recycled stationery to solar-powered gadgets.
              </p>
            </div>
            <Image
              src="/images/imp3.png"
              alt="Rewards illustration"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Points System</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border">Category</th>
                    <th className="text-left p-3 border">Item Examples</th>
                    <th className="text-left p-3 border">Condition Factors</th>
                    <th className="text-left p-3 border">Points Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Smartphones & Tablets</td>
                    <td className="p-3 border">iPhone, Samsung Galaxy, iPad</td>
                    <td className="p-3 border">Working, age, model</td>
                    <td className="p-3 border">50-200 points</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Laptops & Computers</td>
                    <td className="p-3 border">MacBook, Dell, HP, Custom PCs</td>
                    <td className="p-3 border">Working, specifications, age</td>
                    <td className="p-3 border">100-500 points</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Monitors & TVs</td>
                    <td className="p-3 border">LCD, LED, OLED displays</td>
                    <td className="p-3 border">Working, size, resolution</td>
                    <td className="p-3 border">75-300 points</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Computer Components</td>
                    <td className="p-3 border">CPUs, GPUs, RAM, Motherboards</td>
                    <td className="p-3 border">Working, specifications, age</td>
                    <td className="p-3 border">25-150 points</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Peripherals</td>
                    <td className="p-3 border">Keyboards, Mice, Speakers</td>
                    <td className="p-3 border">Working condition</td>
                    <td className="p-3 border">10-50 points</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Cables & Adapters</td>
                    <td className="p-3 border">USB cables, Power adapters</td>
                    <td className="p-3 border">Working, type</td>
                    <td className="p-3 border">5-20 points</td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Batteries</td>
                    <td className="p-3 border">Laptop batteries, Phone batteries</td>
                    <td className="p-3 border">Type, condition</td>
                    <td className="p-3 border">5-30 points</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Note: The final point value is determined by our collection center staff based on the actual condition and
              specifications of the items.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Membership Tiers</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                    <Award width={24} height={24} />
                  </div>
                  <CardTitle>Bronze</CardTitle>
                  <CardDescription>0-999 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Basic reward redemption</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Monthly newsletter</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Standard recycling service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                    <Award width={24} height={24} />
                  </div>
                  <CardTitle>Silver</CardTitle>
                  <CardDescription>1,000-1,999 points</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>All Bronze benefits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>10% bonus points on recycling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Early access to new products</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Quarterly e-waste pickup service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 text-green-700 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                    <Award width={24} height={24} />
                  </div>
                  <CardTitle>Gold</CardTitle>
                  <CardDescription>2,000+ points</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>All Silver benefits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>25% bonus points on recycling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Exclusive gold member products</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Monthly e-waste pickup service</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                      <span>Priority customer support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
            </div>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Earning Rewards?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Sign up today and start recycling your e-waste to earn points and redeem them for eco-friendly products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/signup">
                  Create an Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/collection-centers">Find Collection Centers</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

