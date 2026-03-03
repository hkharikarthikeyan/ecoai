"use client"

import type React from "react"

import { useState } from "react"
import { Wallet, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

export function Web3Connect() {
  const { user, connectWallet } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState("")

  const handleConnect = async () => {
    setIsConnecting(true)
    setError("")

    try {
      const result = await connectWallet()

      if (result.success) {
        toast({
          title: "Wallet connected",
          description: "Your wallet has been successfully connected to your account.",
        })
      } else {
        setError(result.message || "Failed to connect wallet")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setError("An error occurred while connecting your wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  if (user?.walletAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Wallet</CardTitle>
          <CardDescription>Your wallet is connected to the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-100 text-green-700 rounded-full p-2 mr-3">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Connected Wallet</p>
                <p className="text-sm text-muted-foreground break-all">{user.walletAddress}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Your rewards points are now synchronized with the blockchain. You can track your points and transactions on
            the blockchain.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Blockchain Wallet</CardTitle>
        <CardDescription>Enhance your rewards with blockchain technology</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <p className="text-muted-foreground">Connect your Ethereum wallet to access additional blockchain features:</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
            <span>Store your reward points securely on the blockchain</span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
            <span>Transfer points to other users</span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
            <span>Verify the authenticity of your recycling contributions</span>
          </li>
          <li className="flex items-start">
            <CheckIcon className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
            <span>Access exclusive blockchain-based rewards</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleConnect} disabled={isConnecting} className="w-full bg-green-600 hover:bg-green-700">
          {isConnecting ? (
            <>Connecting Wallet...</>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
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

