import { motion } from 'framer-motion';
import { DayItinerary } from '@/types/voyager';

interface DayByDayTabProps {
  itinerary: DayItinerary[];
}

export const DayByDayTab = ({ itinerary }: DayByDayTabProps) => {
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <span className="highlight-box text-xl">Your Daily Itinerary</span>
      </div>

      {/* Days */}
      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bordered-card"
          >
            {/* Day Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="day-badge">Day {day.day}</span>
              <span className="text-xl font-bold">{day.title}</span>
            </div>

            {/* Time Periods */}
            <div className="space-y-4">
              {/* Morning */}
              <div className="flex items-start gap-3">
                <div className="w-24 shrink-0">
                  <span className="text-sm font-bold uppercase text-primary flex items-center gap-1">
                    ☀️ Morning
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{day.morning}</p>
              </div>

              {/* Afternoon */}
              <div className="flex items-start gap-3">
                <div className="w-24 shrink-0">
                  <span className="text-sm font-bold uppercase text-secondary flex items-center gap-1">
                    🌤️ Afternoon
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{day.afternoon}</p>
              </div>

              {/* Evening */}
              <div className="flex items-start gap-3">
                <div className="w-24 shrink-0">
                  <span className="text-sm font-bold uppercase text-orange-500 flex items-center gap-1">
                    🌙 Evening
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{day.evening}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
