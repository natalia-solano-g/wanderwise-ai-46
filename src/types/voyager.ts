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

export interface WeatherData {
  date: string;
  condition: string;
  maxTempC: number;
  minTempC: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}

export interface ItineraryData {
  weather: WeatherData;
  history: string;
  news: string;
  songs: string;
  itinerary: string;
  city: string;
  country: string;
  numberOfDays: number;
  month: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type TabType = 'overview' | 'day-by-day' | 'playlist' | 'chat';
