import { BrowserProvider, JsonRpcProvider, Contract } from "ethers" // ✅ Updated for ethers v6

// ABI for the EcoRewards smart contract
const ecoRewardsABI = [
  // Events
  "event PointsAwarded(address indexed user, uint256 amount, string reason)",
  "event PointsRedeemed(address indexed user, uint256 amount, string productId)",

  // Read functions
  "function balanceOf(address user) view returns (uint256)",
  "function getTotalRecycled() view returns (uint256)",

  // Write functions
  "function awardPoints(address user, uint256 amount, string reason) external",
  "function redeemPoints(uint256 amount, string productId) external",
  "function transferPoints(address to, uint256 amount) external",
]

// Smart contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"

// Initialize Web3 provider
export async function getWeb3Provider() {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      return new BrowserProvider(window.ethereum) // ✅ Updated for ethers v6
    } catch (error) {
      console.error("User denied account access")
      return null
    }
  } else if (typeof window !== "undefined") {
    console.log("Please install MetaMask!")
    return null
  } else {
    return new JsonRpcProvider(process.env.ETHEREUM_RPC_URL || "https://mainnet.infura.io/v3/your-infura-key")
  }
}

// Get contract instance
export async function getEcoRewardsContract(withSigner = false) {
  const provider = await getWeb3Provider()
  if (!provider) return null

  if (withSigner) {
    const signer = await provider.getSigner() // ✅ Updated for ethers v6
    return new Contract(contractAddress, ecoRewardsABI, signer)
  }

  return new Contract(contractAddress, ecoRewardsABI, provider)
}

// Get user's points balance
export async function getUserPointsBalance(address) {
  try {
    const contract = await getEcoRewardsContract()
    if (!contract) return 0

    const balance = await contract.balanceOf(address)
    return Number.parseInt(balance.toString())
  } catch (error) {
    console.error("Error getting user balance:", error)
    return 0
  }
}

// Award points to a user
export async function awardPoints(userAddress, amount, reason) {
  try {
    const contract = await getEcoRewardsContract(true)
    if (!contract) throw new Error("Contract not available")

    const tx = await contract.awardPoints(userAddress, amount, reason)
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error awarding points:", error)
    return false
  }
}

// Redeem points for a product
export async function redeemPoints(amount, productId) {
  try {
    const contract = await getEcoRewardsContract(true)
    if (!contract) throw new Error("Contract not available")

    const tx = await contract.redeemPoints(amount, productId)
    await tx.wait()
    return true
  } catch (error) {
    console.error("Error redeeming points:", error)
    return false
  }
}

// Connect wallet and return address
export async function connectWallet() {
  try {
    const provider = await getWeb3Provider()
    if (!provider) throw new Error("No provider available")

    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    return address
  } catch (error) {
    console.error("Error connecting wallet:", error)
    return null
  }
}

