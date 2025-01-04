import React, { useState, useRef, useEffect } from 'react';
import { Send, Stars } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ThemeContextType {
  theme: "light" | "dark";
}

const GeminiChat: React.FC = () => {
  // ... keep existing state and effects ...
  const { theme } = useTheme() as ThemeContextType;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ... keep existing fetchGeminiResponse ...
  const fetchGeminiResponse = async (userMessage: string): Promise<string> => {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!API_KEY) {
      throw new Error('Gemini API key not found');
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: userMessage
              }]
            }]
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from Gemini');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  // ... keep existing handleSubmit ...
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setInputMessage('');
    setIsLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: trimmedMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetchGeminiResponse(trimmedMessage);
      console.log(response);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        timestamp: new Date()
      };
      console.log(error);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
    const formatContent = (text: string) => {
      return text.split('\n\n').map((section, sectionIndex) => {
        const lines = section.split('\n');
        const isBold = lines[0].startsWith('**');
        
        return (
          <div key={sectionIndex} className="mb-4">
            {isBold ? (
              <div className="font-semibold mb-2">
                {lines[0].replace(/\*\*/g, '')}
              </div>
            ) : (
              <div>{lines[0]}</div>
            )}
            {lines.slice(1).map((line, lineIndex) => (
              <div key={lineIndex} className="ml-4 flex items-start">
                {line.startsWith('*') && (
                  <>
                    <span className="mr-2">•</span>
                    <span>{line.replace('* ', '')}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        );
      });
    };

    return <div className="space-y-2">{formatContent(content)}</div>;
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
    <div
  className={`max-w-3xl mx-auto w-full ${
    message.role === 'user'
      ? isDark
        ? 'bg-gray-700' // Dark background for user
        : 'bg-gray-100' // Light background for user
      : isDark
      ? 'bg-gray-800' // Dark background for others
      : 'bg-white' // Light background for others
  } p-6 rounded-lg`}
  
>


      <div className="flex gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'user' 
            ? 'bg-blue-600' 
            : isDark ? 'bg-purple-900' : 'bg-purple-100'
        }`}>
          {message.role === 'user' ? (
            <span className="text-white font-medium">U</span>
          ) : (
            <Stars className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          )}
        </div>
        <div className="flex-1">
          <div className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {message.role === 'user' ? 'You' : 'Gemini'}
          </div>
          <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {message.role === 'assistant' ? (
              <FormattedContent content={message.content} />
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ... keep existing return statement ...
  return (
    <div className={`w-full h-full flex flex-col `}>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-6">
              <Stars className={`w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'} mx-auto`} />
              <h2 className={`text-3xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                How can I help you today?
              </h2>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        
        {isLoading && (
          <div className="max-w-3xl mx-auto w-full p-6">
            <div className="flex gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-purple-900' : 'bg-purple-100'
              }`}>
                <Stars className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div className="flex-1">
                <div className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gemini
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-400'} rounded-full animate-bounce`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message Gemini..."
              className={`w-full p-4 pr-32 border rounded-2xl focus:outline-none focus:ring-1 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                  : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            />
            <div className="absolute right-2 top-2">
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className={`p-2 rounded-full ${
                  isDark ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2 text-center`}>
            Gemini may display inaccurate info, including about people, places, or facts.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;