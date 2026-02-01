import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TripDetails } from '@/types/voyager';
import { months, dayOptions } from '@/data/cities';

interface TripFormProps {
  onSubmit: (details: TripDetails) => void;
  isLoading: boolean;
}

export const TripForm = ({ onSubmit, isLoading }: TripFormProps) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(4);
  const [month, setMonth] = useState('September');
  const [preferences, setPreferences] = useState('');

  const loadingSteps = [
    '✨ Creating your tailored itinerary...',
    '📚 Researching history...',
    '📰 Finding latest news...',
    '🎵 Curating local music...',
    '✨ Generating your itinerary...',
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // Cycle through loading steps
  useState(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !country.trim()) return;
    
    onSubmit({
      city: city.trim(),
      country: country.trim(),
      numberOfDays,
      month,
      preferences,
    });
  };

  return (
    <div className="bg-card border-2 border-foreground rounded-xl p-6 shadow-[8px_8px_0_0_hsl(var(--foreground))]">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* City */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Rome, Tokyo, Paris..."
            className="w-full h-12 px-4 bg-background border-2 border-foreground rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            disabled={isLoading}
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Italy, Japan, France..."
            className="w-full h-12 px-4 bg-background border-2 border-foreground rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            disabled={isLoading}
            required
          />
        </div>

        {/* Number of Days */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Number of Days
          </label>
          <select
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
            className="w-full h-12 px-4 bg-background border-2 border-foreground rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          >
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day} {day === 1 ? 'Day' : 'Days'}
              </option>
            ))}
          </select>
        </div>

        {/* Travel Month */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Travel Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full h-12 px-4 bg-background border-2 border-foreground rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-sm font-bold uppercase mb-2">
            Preferences & Notes
          </label>
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Tell us about your trip! Any must-see places? Food preferences? Traveling with kids? Budget? The more you share, the better your itinerary."
            className="w-full h-32 px-4 py-3 bg-background border-2 border-foreground rounded-lg font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full"
          disabled={isLoading || !city.trim() || !country.trim()}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                ✈️
              </motion.span>
              <span>{loadingSteps[currentStep]}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Plane size={20} />
              Generate My Itinerary
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};
