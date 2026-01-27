import { TripDetails, ItineraryData, WeatherData } from '@/types/voyager';
import { generateMockItinerary } from '@/data/mockItinerary';

const N8N_WEBHOOK_URL = 'https://natisolanog.app.n8n.cloud/webhook-test/voyager';

interface N8nWeatherResponse {
  date: string;
  condition: string;
  max_temp_c: number;
  min_temp_c: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}

interface N8nResponse {
  weather: N8nWeatherResponse;
  history: string;
  news: string;
  songs: string;
  itinerary: string;
}

function transformWeather(weather: N8nWeatherResponse): WeatherData {
  return {
    date: weather.date,
    condition: weather.condition,
    maxTempC: weather.max_temp_c,
    minTempC: weather.min_temp_c,
    humidity: weather.humidity,
    sunrise: weather.sunrise,
    sunset: weather.sunset,
  };
}

function validateResponse(data: unknown): data is N8nResponse {
  if (!data || typeof data !== 'object') return false;
  const response = data as Record<string, unknown>;
  
  return (
    typeof response.weather === 'object' &&
    typeof response.history === 'string' &&
    typeof response.news === 'string' &&
    typeof response.songs === 'string' &&
    typeof response.itinerary === 'string'
  );
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

    return {
      weather: transformWeather(data.weather),
      history: data.history,
      news: data.news,
      songs: data.songs,
      itinerary: data.itinerary,
      city: details.city,
      country: details.country,
      numberOfDays: details.numberOfDays,
      month: details.month,
    };
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
  return generateMockItinerary(
    details.city,
    details.country,
    details.numberOfDays,
    details.month
  );
}
