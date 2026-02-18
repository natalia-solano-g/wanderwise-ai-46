import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ItineraryData, TabType, ChatMessage } from '@/types/voyager';
import { OverviewTab } from './tabs/OverviewTab';
import { DayByDayTab } from './tabs/DayByDayTab';
import { PlaylistTab } from './tabs/PlaylistTab';
import { ChatTab } from './tabs/ChatTab';

interface ItineraryViewProps {
  data: ItineraryData;
  onBack: () => void;
}

export const ItineraryView = ({ data, onBack }: ItineraryViewProps) => {
  const { place, days, month } = data.chat.context;
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: data.chat.initial_message,
      timestamp: new Date(),
    },
  ]);

  const tabs: { id: TabType; label: string; emoji: string }[] = [
    { id: 'overview', label: 'Overview', emoji: '📋' },
    { id: 'day-by-day', label: 'Day-by-Day', emoji: '📅' },
    { id: 'playlist', label: 'Playlist', emoji: '🎵' },
    { id: 'chat', label: 'Chat', emoji: '💬' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={`https://source.unsplash.com/1920x800/?${place},cityscape,landmark`}
          alt={place}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="absolute top-6 left-6 bg-card/90 backdrop-blur-sm hover:bg-card"
        >
          <ArrowLeft size={20} />
          Back
        </Button>

        {/* Hero Content */}
        <div className="absolute bottom-8 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-card"
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase text-shadow mb-2">
              {place}
            </h1>
            <div className="flex items-center gap-4 text-lg font-semibold text-shadow">
              <span>{days} Days</span>
              <span>•</span>
              <span>{month}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button flex items-center gap-2 ${
                  activeTab === tab.id ? 'active' : ''
                }`}
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && <OverviewTab data={data} />}
          {activeTab === 'day-by-day' && <DayByDayTab itinerary={data.itinerary} />}
          {activeTab === 'playlist' && <PlaylistTab playlist={data.playlist} city={place} />}
          {activeTab === 'chat' && (
            <ChatTab
              messages={chatMessages}
              setMessages={setChatMessages}
              itineraryContext={data}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
