import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header, Hero } from '@/components/Header';
import { WorldMap } from '@/components/WorldMap';
import { TripForm } from '@/components/TripForm';
import { ItineraryView } from '@/components/ItineraryView';
import { City, TripDetails, ItineraryData } from '@/types/voyager';
import { generateMockItinerary } from '@/data/mockItinerary';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleFormClose = () => {
    setSelectedCity(null);
  };

  const handleFormSubmit = async (details: TripDetails) => {
    setIsLoading(true);
    setLoadingStep(0);

    // Simulate loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, 4));
    }, 2000);

    // Simulate API call delay (in production, call n8n webhook)
    await new Promise((resolve) => setTimeout(resolve, 8000));

    clearInterval(stepInterval);

    // Generate mock itinerary
    const mockData = generateMockItinerary(
      details.city,
      details.country,
      details.numberOfDays,
      details.month
    );

    setItinerary(mockData);
    setIsLoading(false);
    setSelectedCity(null);
  };

  const handleBackToMap = () => {
    setItinerary(null);
  };

  // If we have an itinerary, show the itinerary view
  if (itinerary) {
    return <ItineraryView data={itinerary} onBack={handleBackToMap} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <WorldMap onCitySelect={handleCitySelect} />
        </div>
      </section>

      {/* Trip Form Modal */}
      <AnimatePresence>
        {selectedCity && (
          <TripForm
            city={selectedCity}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>

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
