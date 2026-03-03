import type React from "react"
import ChatBot from "./ChatBot"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <ChatBot />
    </div>
  )
}

export default Layout

