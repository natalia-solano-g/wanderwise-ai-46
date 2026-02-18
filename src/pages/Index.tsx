import { useState } from 'react';
import { Header, Hero } from '@/components/Header';
import { TripForm } from '@/components/TripForm';
import { ItineraryView } from '@/components/ItineraryView';
import { TripDetails, ItineraryData } from '@/types/voyager';
import { generateItinerary } from '@/services/voyagerApi';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (details: TripDetails) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await generateItinerary(details);
      setItinerary(data);
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
      setError('Oops! We couldn\'t create your itinerary 🗺️');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setError(null);
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
          {error ? (
            <div className="bg-card border-2 border-destructive rounded-xl p-8 text-center space-y-4">
              <div className="flex justify-center">
                <AlertCircle className="h-16 w-16 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {error}
              </h2>
              <p className="text-muted-foreground">
                Double-check that your destination actually exists and is spelled correctly. 
                Even our AI gets confused by "Pairs" instead of "Paris" 😅
              </p>
              <Button 
                onClick={handleTryAgain}
                className="gap-2"
              >
                <RefreshCw size={18} />
                Let's try again!
              </Button>
            </div>
          ) : (
            <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          )}
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
