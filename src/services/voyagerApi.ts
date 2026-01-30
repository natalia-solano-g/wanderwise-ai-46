import { TripDetails, ItineraryData, WeatherData, OverviewData, DayItinerary, PlaylistSong, ChatData } from '@/types/voyager';

const N8N_WEBHOOK_URL = 'https://natisolanog.app.n8n.cloud/webhook-test/voyager';

// Webhook response structure (array of objects)
interface N8nWebhookItem {
  city: string;
  country: string;
  temperature: string;
  packing: string; // markdown string
  history: string;
  news: string; // markdown string
  songs: string; // markdown string with numbered list
  itinerary: Array<{
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
  }>;
}

type N8nWebhookResponse = N8nWebhookItem[];

function validateResponse(data: unknown): data is N8nWebhookResponse {
  if (!Array.isArray(data) || data.length === 0) return false;
  const item = data[0] as Record<string, unknown>;
  
  return (
    typeof item.city === 'string' &&
    typeof item.country === 'string' &&
    Array.isArray(item.itinerary)
  );
}

// Parse markdown packing list into array of items
function parsePackingItems(markdown: string): string[] {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const items: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Match lines starting with - (list items)
    if (trimmed.startsWith('- ')) {
      items.push(trimmed.substring(2).trim());
    }
  }
  
  return items.length > 0 ? items : [
    'Light layers - t-shirts and a light jacket',
    'Comfortable walking shoes',
    'Power adapter for your electronics',
    'Small daypack for daily adventures',
  ];
}

// Parse markdown news into array of items
function parseNewsItems(markdown: string): string[] {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const items: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Match lines starting with - (list items) or numbered items
    if (trimmed.startsWith('- ')) {
      items.push(trimmed.substring(2).trim());
    } else if (/^\d+\./.test(trimmed)) {
      items.push(trimmed.replace(/^\d+\.\s*/, '').trim());
    }
  }
  
  return items.length > 0 ? items : [
    'Local festivals and events happening',
    'New attractions opening for tourists',
    'Cultural exhibitions showcasing local heritage',
  ];
}

// Parse songs markdown into structured playlist
function parseSongs(markdown: string): PlaylistSong[] {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const songs: PlaylistSong[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Match pattern: "1. Song Title - Artist[optional reference]"
    const match = trimmed.match(/^\d+\.\s*(.+?)\s*-\s*(.+?)(?:\[\d+\].*)?$/);
    if (match) {
      songs.push({
        title: match[1].trim(),
        artist: match[2].trim().replace(/\[\d+\]/g, '').trim(),
      });
    }
  }
  
  return songs.length > 0 ? songs : [
    { title: 'Local Favorite', artist: 'Traditional Artist' },
    { title: 'City Anthem', artist: 'Popular Band' },
  ];
}

// Transform webhook response to internal ItineraryData format
function transformResponse(webhookData: N8nWebhookItem, details: TripDetails): ItineraryData {
  return {
    overview: {
      packing: {
        weather: {
          condition: webhookData.temperature || 'Pleasant weather expected',
          temp_min: '16°C',
          temp_max: '24°C',
          humidity: '60%',
          sunrise: '06:30 AM',
          sunset: '07:30 PM',
        },
        items: parsePackingItems(webhookData.packing),
      },
      historical_context: webhookData.history || `${details.city} is a vibrant destination with a rich cultural heritage spanning centuries.`,
      current_news: parseNewsItems(webhookData.news),
    },
    itinerary: webhookData.itinerary || [],
    playlist: parseSongs(webhookData.songs),
    chat: {
      initial_message: `Hi! I'm your Voyager assistant. I've prepared a ${details.numberOfDays}-day itinerary for your trip to ${details.city}. Feel free to ask me anything about your trip!`,
      context: {
        city: webhookData.city || details.city,
        country: webhookData.country || details.country,
        days: details.numberOfDays,
        month: details.month,
      },
    },
  };
}

export async function generateItinerary(details: TripDetails): Promise<ItineraryData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: details.city,
        country: details.country,
        number_of_days: details.numberOfDays,
        month: details.month,
        preferences: details.preferences,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!validateResponse(data)) {
      throw new Error('Invalid response structure from n8n');
    }

    // Take the first item from the array and transform it
    return transformResponse(data[0], details);
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Log the error for debugging
    console.error('n8n webhook error:', error);
    
    // Re-throw with a user-friendly message
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
    
    throw new Error('Failed to generate itinerary. Please try again.');
  }
}

// Export fallback function for error cases
export function getFallbackItinerary(details: TripDetails): ItineraryData {
  return {
    overview: {
      packing: {
        weather: {
          condition: 'Pleasant weather expected',
          temp_min: '16°C',
          temp_max: '24°C',
          humidity: '60%',
          sunrise: '06:30 AM',
          sunset: '07:30 PM',
        },
        items: [
          'Light layers - t-shirts and a light jacket',
          'Comfortable walking shoes',
          'Sunglasses and sun hat',
          'Power adapter for your electronics',
          'Small daypack for daily adventures',
        ],
      },
      historical_context: `${details.city} is a vibrant destination with a rich cultural heritage spanning centuries. The city offers a unique blend of traditional charm and modern amenities, making it an ideal destination for travelers seeking authentic experiences.`,
      current_news: [
        'Local festivals and events happening throughout ' + details.month,
        'New attractions opening for tourists',
        'Cultural exhibitions showcasing local heritage',
        'Transportation improvements for visitors',
        'Sustainable tourism initiatives launched',
      ],
    },
    itinerary: Array.from({ length: details.numberOfDays }, (_, i) => ({
      day: i + 1,
      title: i === 0 ? `Exploring ${details.city}` : `Day ${i + 1} Adventures`,
      morning: 'Start your day at the historic city center. Visit the main landmarks and soak in the local atmosphere.',
      afternoon: 'Explore local markets and try authentic cuisine. Visit museums or galleries showcasing local art and history.',
      evening: 'Enjoy dinner at a recommended restaurant and experience the nightlife.',
    })),
    playlist: [
      { title: 'Local Favorite Song 1', artist: 'Traditional Artist' },
      { title: 'Local Favorite Song 2', artist: 'Popular Local Band' },
      { title: 'Travel Vibes', artist: 'International Artist' },
      { title: 'City Nights', artist: 'Local DJ' },
      { title: 'Cultural Heritage', artist: 'Folk Ensemble' },
    ],
    chat: {
      initial_message: `Hi! I'm your Voyager assistant. I've prepared a ${details.numberOfDays}-day itinerary for your trip to ${details.city}. Feel free to ask me anything about your trip!`,
      context: {
        city: details.city,
        country: details.country,
        days: details.numberOfDays,
        month: details.month,
      },
    },
  };
}
