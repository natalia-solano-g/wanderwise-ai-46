import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { City, TripDetails } from '@/types/voyager';
import { months, dayOptions } from '@/data/cities';

interface TripFormProps {
  city: City;
  onClose: () => void;
  onSubmit: (details: TripDetails) => void;
  isLoading: boolean;
}

export const TripForm = ({ city, onClose, onSubmit, isLoading }: TripFormProps) => {
  const [numberOfDays, setNumberOfDays] = useState(4);
  const [month, setMonth] = useState('September');
  const [preferences, setPreferences] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      city: city.name,
      country: city.country,
      numberOfDays,
      month,
      preferences,
    });
  };

  const loadingSteps = [
    '🌤️ Checking weather...',
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border-2 border-foreground rounded-xl p-6 w-full max-w-lg shadow-[8px_8px_0_0_hsl(var(--foreground))]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black uppercase">{city.name}</h2>
            <p className="text-muted-foreground">{city.country}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-foreground hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* City image placeholder */}
        <div className="w-full h-40 bg-muted rounded-lg border-2 border-foreground mb-6 flex items-center justify-center overflow-hidden">
          <img
            src={`https://source.unsplash.com/800x400/?${city.name},travel,landmark`}
            alt={city.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={isLoading}
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
      </motion.div>
    </motion.div>
  );
};
