export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface GeminiResponse {
  candidates: Array<{
      content: {
          parts: Array<{
              text: string;
          }>;
      };
  }>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  points: number;
  category: string;
  featured: boolean;
  // Add any other relevant fields
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  points: number;
  quantity: number;
  stockQuantity: number; // Example field
}