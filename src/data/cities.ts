import { City } from '@/types/voyager';

export const cities: City[] = [
  // Europe
  { name: 'London', country: 'United Kingdom', coordinates: [-0.1276, 51.5074], region: 'Europe' },
  { name: 'Paris', country: 'France', coordinates: [2.3522, 48.8566], region: 'Europe' },
  { name: 'Rome', country: 'Italy', coordinates: [12.4964, 41.9028], region: 'Europe' },
  { name: 'Barcelona', country: 'Spain', coordinates: [2.1734, 41.3851], region: 'Europe' },
  { name: 'Amsterdam', country: 'Netherlands', coordinates: [4.9041, 52.3676], region: 'Europe' },
  { name: 'Berlin', country: 'Germany', coordinates: [13.4050, 52.5200], region: 'Europe' },
  { name: 'Prague', country: 'Czech Republic', coordinates: [14.4378, 50.0755], region: 'Europe' },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', coordinates: [139.6917, 35.6895], region: 'Asia' },
  { name: 'Bangkok', country: 'Thailand', coordinates: [100.5018, 13.7563], region: 'Asia' },
  { name: 'Singapore', country: 'Singapore', coordinates: [103.8198, 1.3521], region: 'Asia' },
  { name: 'Dubai', country: 'UAE', coordinates: [55.2708, 25.2048], region: 'Asia' },
  
  // Americas
  { name: 'New York', country: 'USA', coordinates: [-74.0060, 40.7128], region: 'Americas' },
  { name: 'Los Angeles', country: 'USA', coordinates: [-118.2437, 34.0522], region: 'Americas' },
  { name: 'Mexico City', country: 'Mexico', coordinates: [-99.1332, 19.4326], region: 'Americas' },
  { name: 'Rio de Janeiro', country: 'Brazil', coordinates: [-43.1729, -22.9068], region: 'Americas' },
  
  // Oceania & Africa
  { name: 'Sydney', country: 'Australia', coordinates: [151.2093, -33.8688], region: 'Oceania' },
  { name: 'Cape Town', country: 'South Africa', coordinates: [18.4241, -33.9249], region: 'Africa' },
];

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const dayOptions = Array.from({ length: 14 }, (_, i) => i + 1);
