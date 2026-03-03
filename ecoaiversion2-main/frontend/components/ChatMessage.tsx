import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-green-500'
      }`}>
        {isUser ? (
          <MessageSquare className="w-5 h-5 text-black" />
        ) : (
          <Bot className="w-5 h-5 text-black" />
        )}
      </div>
      <div className={`flex-1 px-4 py-2 rounded-lg ${
        isUser ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;