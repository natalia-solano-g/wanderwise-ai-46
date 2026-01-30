import { useState } from 'react';
import { Header, Hero } from '@/components/Header';
import { TripForm } from '@/components/TripForm';
import { ItineraryView } from '@/components/ItineraryView';
import { TripDetails, ItineraryData } from '@/types/voyager';
import { generateItinerary, getFallbackItinerary } from '@/services/voyagerApi';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);

  const handleFormSubmit = async (details: TripDetails) => {
    setIsLoading(true);

    try {
      const data = await generateItinerary(details);
      setItinerary(data);
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
      
      toast({
        title: 'Could not reach n8n webhook',
        description: 'Using demo data instead. Make sure your n8n workflow is in test mode.',
        variant: 'destructive',
      });

      // Fall back to mock data
      const fallbackData = getFallbackItinerary(details);
      setItinerary(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setItinerary(null);
  };

  // If we have an itinerary, show the itinerary view
  if (itinerary) {
    return <ItineraryView data={itinerary} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Form Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-lg">
          <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            ✨ Voyager — AI-Powered Travel Planning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
