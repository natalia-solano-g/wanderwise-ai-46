import { motion } from 'framer-motion';
import { Cloud, Thermometer, Droplets, Sunrise, Sunset } from 'lucide-react';
import { ItineraryData } from '@/types/voyager';

interface OverviewTabProps {
  data: ItineraryData;
}

export const OverviewTab = ({ data }: OverviewTabProps) => {
  const { overview } = data;
  const { packing, historical_context, current_news } = overview;
  const { weather, items } = packing;

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <span className="highlight-box text-xl">Before You Go</span>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather & Packing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bordered-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🧳</span>
            <h3 className="text-xl font-black uppercase">What to Pack</h3>
          </div>

          {/* Weather Summary */}
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Cloud size={20} />
              <span className="font-semibold">{weather.condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Thermometer size={16} className="text-secondary" />
                <span>
                  {weather.temp_min} - {weather.temp_max}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-blue-500" />
                <span>{weather.humidity} humidity</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunrise size={16} className="text-primary" />
                <span>{weather.sunrise}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset size={16} className="text-orange-500" />
                <span>{weather.sunset}</span>
              </div>
            </div>
          </div>

          {/* Packing List */}
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* History Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bordered-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏛️</span>
            <h3 className="text-xl font-black uppercase">Historical Context</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{historical_context}</p>
        </motion.div>

        {/* News Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bordered-card md:col-span-2"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📰</span>
            <h3 className="text-xl font-black uppercase">Current News</h3>
          </div>
          <ul className="space-y-3">
            {current_news.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-secondary font-bold mt-1">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
