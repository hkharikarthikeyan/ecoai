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