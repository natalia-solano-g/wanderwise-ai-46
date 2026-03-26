import { TripDetails, ItineraryData, OverviewData, DayItinerary, PlaylistSong, ChatData } from '@/types/voyager';
import { supabase } from '@/integrations/supabase/client';

// New webhook response structure
interface N8nWebhookItem {
  trip_id: string;
  destination: {
    city: string;
    country: string;
    duration: number;
    month: string;
  };
  overview: OverviewData;
  itinerary: DayItinerary[];
  playlist: PlaylistSong[];
}

type N8nWebhookResponse = N8nWebhookItem[];

function validateResponse(data: unknown): data is N8nWebhookResponse {
  if (!Array.isArray(data) || data.length === 0) return false;
  const item = data[0] as Record<string, unknown>;
  
  const destination = item.destination as Record<string, unknown> | undefined;
  
  return Boolean(
    destination &&
    typeof destination.city === 'string' &&
    typeof destination.country === 'string' &&
    item.overview &&
    Array.isArray(item.itinerary)
  );
}

// Transform webhook response to internal ItineraryData format
function transformResponse(webhookData: N8nWebhookItem): ItineraryData {
  const { destination, overview, itinerary, playlist } = webhookData;
  
  return {
    overview,
    itinerary,
    playlist: playlist || [],
    chat: {
      initial_message: `Hi! I'm your Voyager assistant. I've prepared a ${destination.duration}-day itinerary for your trip to ${destination.city}. Feel free to ask me anything about your trip!`,
      context: {
        place: `${destination.city}, ${destination.country}`,
        days: destination.duration,
        month: destination.month,
      },
    },
  };
}

export async function generateItinerary(details: TripDetails): Promise<ItineraryData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds

    let data, error;
    try {
      const result = await supabase.functions.invoke('generate-itinerary', {
        body: {
          place: details.place,
          number_of_days: details.numberOfDays,
          month: details.month,
          preferences: details.preferences,
        },
      });
      data = result.data;
      error = result.error;
    } finally {
      clearTimeout(timeoutId);
    }

    if (error) {
      console.error('Edge function error:', error);
      throw new Error('Failed to generate itinerary. Please try again.');
    }

    if (!validateResponse(data)) {
      console.error('Invalid response structure. Raw data:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response structure from backend');
    }

    return transformResponse(data[0]);
  } catch (error) {
    console.error('Generate itinerary error:', error);
    if (error instanceof Error) {
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
      title: i === 0 ? `Exploring ${details.place}` : `Day ${i + 1} Adventures`,
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
      initial_message: `Hi! I'm your Voyager assistant. I've prepared a ${details.numberOfDays}-day itinerary for your trip to ${details.place}. Feel free to ask me anything about your trip!`,
      context: {
        place: details.place,
        days: details.numberOfDays,
        month: details.month,
      },
    },
  };
}
