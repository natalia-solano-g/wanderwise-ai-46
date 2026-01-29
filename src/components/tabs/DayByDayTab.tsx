import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface DayByDayTabProps {
  itinerary: string;
}

export const DayByDayTab = ({ itinerary }: DayByDayTabProps) => {
  // Split itinerary by days and filter to only include actual day sections
  const days = itinerary
    .split(/---/)
    .filter((section) => section.trim())
    .filter((section) => /Day\s*\d+/i.test(section));

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <span className="highlight-box text-xl">Your Daily Itinerary</span>
      </div>

      {/* Days */}
      <div className="space-y-6">
        {days.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bordered-card"
          >
            <div className="prose prose-neutral max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <div className="flex items-center gap-3 mb-4 not-prose">
                      <span className="day-badge">
                        {String(children).match(/Day \d+/)?.[0] || `Day ${index + 1}`}
                      </span>
                      <span className="text-xl font-bold">
                        {String(children).replace(/^#+\s*Day \d+:?\s*/, '')}
                      </span>
                    </div>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mt-6 mb-3 flex items-center gap-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                }}
              >
                {day.trim()}
              </ReactMarkdown>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
