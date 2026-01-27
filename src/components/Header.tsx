import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full bg-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary" size={24} />
          <span className="text-xl font-black text-card uppercase tracking-tight">
            Voyager
          </span>
        </div>
      </div>
    </header>
  );
};

export const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-6">
            <span className="highlight-box -rotate-1 inline-block mb-2">
              AI-Powered
            </span>
            <br />
            <span>Travel Assistant</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-8">
            Click anywhere on the map to start planning your perfect adventure.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap gap-3">
            <span className="feature-badge">
              <span>✓</span>
              <span>Personalized Itineraries</span>
            </span>
            <span className="feature-badge">
              <span>✓</span>
              <span>Weather-Based Packing</span>
            </span>
            <span className="feature-badge">
              <span>✓</span>
              <span>Local Music Playlists</span>
            </span>
            <span className="feature-badge">
              <span>✓</span>
              <span>AI Travel Chat</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
