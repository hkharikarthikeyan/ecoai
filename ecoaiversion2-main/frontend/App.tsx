"use client"; // Mark this as a Client Component

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Camera, MessageSquare, X } from "lucide-react";
import ChatMessage from "./components/ChatMessage";
import { ImageUpload } from "./components/ImageUpload";
import { getChatResponse } from "./lib/gemini";
import type { Message, ChatState } from "./types";

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });
  const [input, setInput] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ensure that the initial state is consistent
  useEffect(() => {
    // This effect runs only on the client side
    setIsChatOpen(false); // Initialize the chat state on the client
  }, []);

  // Scroll to Bottom Function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to Bottom on New Message
  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));
    setInput("");

    try {
      const response = await getChatResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error:", error);
      setChatState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Handle Image Analysis Completion
  const handleImageAnalysis = async (prompt: string) => {
    try {
      // Hide image upload UI
      setShowImageUpload(false);
      setInput("");

      // Set loading state
      setChatState((prev) => ({
        ...prev,
        isLoading: true,
      }));

      // Get analysis from Gemini
      const response = await getChatResponse(prompt);
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error:", error);
      setChatState((prev) => ({ ...prev, isLoading: false }));
      // Show error to user
      alert("Error getting response. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200"
          suppressHydrationWarning
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Pop-Up Window */}
      {isChatOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">E-Waste Chat Assistant</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-blue-700 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatState.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {chatState.isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            )}
            {showImageUpload && (
              <div className="my-4">
                <ImageUpload onAnalysisComplete={handleImageAnalysis} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowImageUpload(!showImageUpload)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about e-waste..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={chatState.isLoading || !input.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;