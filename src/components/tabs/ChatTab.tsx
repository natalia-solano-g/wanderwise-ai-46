import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { ChatMessage, ItineraryData } from '@/types/voyager';

interface ChatTabProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  itineraryContext: ItineraryData;
}

const suggestedQuestions = [
  'Best restaurants near the main attractions?',
  'How do I get from the airport to the city center?',
  'What\'s the best way to get around?',
  'Any hidden gems or local favorites?',
];

export const ChatTab = ({ messages, setMessages, itineraryContext }: ChatTabProps) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { place, days, month } = itineraryContext.chat.context;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (in production, this would call an API)
    setTimeout(() => {
      const response = generateMockResponse(messageText, place, month);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <span className="highlight-box text-xl">Ask Voyager</span>
        <p className="text-muted-foreground mt-2">
          Have questions about your trip? I'm here to help!
        </p>
      </div>

      {/* Chat Container */}
      <div className="bordered-card flex flex-col h-[500px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`chat-message ${message.role}`}
            >
              {message.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="chat-message assistant"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="text-xs px-3 py-1.5 bg-muted hover:bg-primary/20 rounded-full transition-colors text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t-2 border-foreground/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your trip..."
              className="flex-1 h-12 px-4 bg-background border-2 border-foreground rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isTyping}
            />
            <Button
              variant="primary"
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function generateMockResponse(question: string, place: string, month: string): string {
  const q = question.toLowerCase();

  if (q.includes('restaurant') || q.includes('food') || q.includes('eat')) {
    return `Great question! Here are some top dining recommendations for ${place}:

**Fine Dining:**
- The Ivy (classic British cuisine)
- Sketch (modern European with stunning interiors)

**Casual Eats:**
- Borough Market vendors (amazing street food)
- Dishoom (legendary Bombay-style breakfast)

**Budget-Friendly:**
- Pret A Manger (quick and healthy)
- Local pubs for traditional fare

Would you like specific recommendations near any attraction in your itinerary?`;
  }

  if (q.includes('airport') || q.includes('transport') || q.includes('get around')) {
    return `Here are the best ways to get around ${place}:

**From the Airport:**
- Train/Metro: Usually fastest and most economical
- Express train services available at major airports
- Taxi/Uber: More convenient but pricier

**Getting Around:**
- Public transport is excellent - get a day pass
- Walking is great for central areas
- Bike rentals are popular and scenic

**Pro tip:** Download the local transit app before you arrive!`;
  }

  if (q.includes('hidden') || q.includes('local') || q.includes('secret')) {
    return `Here are some hidden gems in ${place} that most tourists miss:

🏛️ **Lesser-known Museums:** Check smaller galleries away from main tourist areas

🍽️ **Local Favorites:** Ask your hotel concierge for their personal recommendations

🌿 **Secret Spots:** Look for rooftop bars and hidden courtyards

📸 **Photo Spots:** Early morning visits to popular spots = no crowds!

Would you like me to suggest specific hidden gems for any particular day of your trip?`;
  }

  return `That's a great question about ${place}! 

Based on your itinerary, I'd recommend:
- Checking local event listings for ${month}
- Connecting with locals through walking tours
- Exploring neighborhoods beyond the main tourist areas

Is there anything specific about your trip I can help with? I can provide details about:
- Transportation options
- Restaurant recommendations  
- Cultural tips and etiquette
- Day trip ideas`;
}
