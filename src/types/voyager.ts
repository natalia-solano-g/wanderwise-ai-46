export interface City {
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
}

export interface TripDetails {
  city: string;
  country: string;
  numberOfDays: number;
  month: string;
  preferences: string;
}

// New webhook response structure
export interface WeatherData {
  condition: string;
  temp_min: string;
  temp_max: string;
  humidity: string;
  sunrise: string;
  sunset: string;
}

export interface PackingData {
  weather: WeatherData;
  items: string[];
}

export interface OverviewData {
  packing: PackingData;
  historical_context?: string;
  current_news: string[];
}

export interface DayItinerary {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface PlaylistSong {
  title: string;
  artist: string;
}

export interface ChatContext {
  city: string;
  country: string;
  days: number;
  month: string;
}

export interface ChatData {
  initial_message: string;
  context: ChatContext;
}

export interface ItineraryData {
  overview: OverviewData;
  itinerary: DayItinerary[];
  playlist: PlaylistSong[];
  chat: ChatData;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type TabType = 'overview' | 'day-by-day' | 'playlist' | 'chat';
