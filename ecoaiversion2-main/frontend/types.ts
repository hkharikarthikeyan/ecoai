export interface Message {
    id: string;
    content: string;
    role: string;
    timestamp: Date;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    image?: string;
    points: number;
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