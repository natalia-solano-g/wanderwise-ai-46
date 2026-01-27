import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlaylistTabProps {
  songs: string;
  city: string;
}

export const PlaylistTab = ({ songs, city }: PlaylistTabProps) => {
  const [copied, setCopied] = useState(false);

  // Parse songs
  const songList = songs
    .split('\n')
    .filter((song) => song.trim())
    .map((song) => {
      const match = song.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/);
      if (match) {
        return { title: match[1].trim(), artist: match[2].trim() };
      }
      return { title: song.replace(/^\d+\.\s*/, ''), artist: '' };
    });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(songs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="highlight-box text-xl">Your Travel Soundtrack</span>
          <p className="text-muted-foreground mt-2">
            20 songs to set the mood for your {city} adventure
          </p>
        </div>
        <Button
          variant={copied ? 'primary' : 'coral'}
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy Playlist
            </>
          )}
        </Button>
      </div>

      {/* Song List */}
      <div className="bordered-card">
        <div className="grid sm:grid-cols-2 gap-3">
          {songList.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <span className="font-bold text-sm">{index + 1}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{song.title}</p>
                {song.artist && (
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="flex items-start gap-3 p-4 bg-muted rounded-lg border-2 border-foreground/10">
        <Music className="text-secondary shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Tip:</strong> Copy the playlist and paste it into Spotify's search to quickly add these songs, or ask a Voyager to create a Spotify playlist for you in the Chat tab!
        </p>
      </div>
    </div>
  );
};
