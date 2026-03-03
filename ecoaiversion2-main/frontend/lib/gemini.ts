import { GoogleGenerativeAI, GenerativeModel, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCkI7u0mJ6qyzgF3GGwsy2xtncHPEUywT4');

const SYSTEM_PROMPT = `You are an expert in e-waste management and recycling. 
Your role is to provide accurate, helpful information about:
- Proper e-waste disposal methods
- Recycling electronics
- Environmental impact of e-waste
- Local e-waste regulations
- Best practices for electronics disposal

Only respond to queries related to e-waste management and recycling. 
For unrelated queries, politely explain that you can only help with e-waste management topics.
Keep responses concise, practical, and environmentally conscious.`;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

let model: GenerativeModel;
let chat: any;

function initializeChat() {
  model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });

  chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: 'model',
        parts: [
          { text: 'I understand. I will focus only on e-waste management topics and provide accurate, helpful information.' },
        ],
      },
    ],
  });

  return chat;
}

export async function getChatResponse(message: string): Promise<string> {
  try {
    if (!chat) {
      initializeChat();
    }

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    
    // If there's an error with the chat session, try to reinitialize
    try {
      initializeChat();
      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (retryError) {
      console.error('Error after retry:', retryError);
      return 'Sorry, I encountered an error. Please try again.';
    }
  }
}