import { ItineraryData, DayItinerary, PlaylistSong } from '@/types/voyager';

interface CityMockData {
  weather: {
    condition: string;
    temp_min: string;
    temp_max: string;
    humidity: string;
    sunrise: string;
    sunset: string;
  };
  packingItems: string[];
  historical_context: string;
  current_news: string[];
  playlist: PlaylistSong[];
  itinerary: DayItinerary[];
}

export const generateMockItinerary = (city: string, country: string, numberOfDays: number, month: string): ItineraryData => {
  const mockData: Record<string, Partial<CityMockData>> = {
    'London': {
      weather: {
        condition: 'Partly cloudy with occasional showers',
        temp_min: '11°C',
        temp_max: '18°C',
        humidity: '75%',
        sunrise: '06:30 AM',
        sunset: '08:15 PM',
      },
      packingItems: [
        'Waterproof jacket or umbrella',
        'Light layers for variable weather',
        'Comfortable walking shoes',
        'Power adapter (UK Type G)',
        'Small daypack for daily adventures',
      ],
      historical_context: `London, the capital of England and the United Kingdom, has a history spanning nearly two millennia. Founded as Londinium by the Romans around 43 AD, it became a major settlement and trading post. The city survived the Great Fire of 1666, which destroyed much of the medieval city, leading to Christopher Wren's masterpiece, St. Paul's Cathedral. During the Victorian era, London became the world's largest city and capital of the British Empire.`,
      current_news: [
        `The British Museum announces a new exhibit on Ancient Egyptian artifacts opening this ${month}`,
        "London's Elizabeth Line celebrates expansion with improved weekend services",
        'West End sees record ticket sales for new musical productions',
        'Borough Market launches sustainable food initiative with local vendors',
        'Thames cleanup project removes 10 tonnes of plastic, celebrates milestone',
      ],
      playlist: [
        { title: 'London Calling', artist: 'The Clash' },
        { title: 'Waterloo Sunset', artist: 'The Kinks' },
        { title: 'A Day in the Life', artist: 'The Beatles' },
        { title: 'West End Girls', artist: 'Pet Shop Boys' },
        { title: 'Baker Street', artist: 'Gerry Rafferty' },
        { title: 'Life on Mars?', artist: 'David Bowie' },
        { title: 'Parklife', artist: 'Blur' },
        { title: 'Common People', artist: 'Pulp' },
        { title: "Don't Look Back in Anger", artist: 'Oasis' },
        { title: 'London Loves', artist: 'Blur' },
      ],
      itinerary: [
        {
          day: 1,
          title: 'Royal London & Historic Heart',
          morning: 'Start your London adventure at Westminster Abbey, where British monarchs have been crowned for centuries. Walk along the Thames to see Big Ben and the Houses of Parliament.',
          afternoon: 'Cross Westminster Bridge for iconic photo opportunities, then head to St. James\'s Park for a peaceful stroll. Time your visit to Buckingham Palace for the Changing of the Guard.',
          evening: 'Dinner in Covent Garden - try traditional British fare at Rules, London\'s oldest restaurant. Catch a West End show if time permits.',
        },
        {
          day: 2,
          title: 'Museums & Markets',
          morning: 'Explore the British Museum - home to the Rosetta Stone and Egyptian mummies. It\'s free and incredible.',
          afternoon: 'Take the Tube to Borough Market for a gourmet lunch. Sample artisan cheeses, fresh oysters, and incredible street food.',
          evening: 'Visit St. Paul\'s Cathedral for Evensong (free) - an ethereal experience. Dinner in the Barbican area.',
        },
        {
          day: 3,
          title: 'Tower & East London',
          morning: 'Book early entry to the Tower of London to see the Crown Jewels before crowds arrive. Don\'t miss the Yeoman Warder tours.',
          afternoon: 'Walk across Tower Bridge (you can do the glass floor experience). Explore the trendy Shoreditch neighborhood.',
          evening: 'Dinner at Dishoom for legendary Bombay-style cuisine. Walk along the South Bank for evening views.',
        },
        {
          day: 4,
          title: 'Royal Parks & Shopping',
          morning: 'Rent a bike or walk through Hyde Park and Kensington Gardens. Visit Kensington Palace.',
          afternoon: 'Shopping on Oxford Street or for something more upscale, explore Bond Street. Tea at Fortnum & Mason is a quintessential experience.',
          evening: 'Farewell dinner in Soho - take your pick from world cuisines. End with drinks at a rooftop bar with city views.',
        },
      ],
    },
    'Paris': {
      weather: {
        condition: 'Mild and sunny with light clouds',
        temp_min: '14°C',
        temp_max: '22°C',
        humidity: '65%',
        sunrise: '07:00 AM',
        sunset: '08:45 PM',
      },
      packingItems: [
        'Light layers for mild weather',
        'Comfortable walking shoes',
        'Sunglasses and sun hat',
        'Power adapter (EU Type C/E)',
        'Small daypack for daily adventures',
      ],
      historical_context: `Paris, the City of Light, has been a major settlement since the 3rd century BC when it was founded by a Gallic tribe called the Parisii. The city flourished in the Middle Ages as a center of learning with the establishment of the Sorbonne. Baron Haussmann's 19th-century renovation gave Paris its iconic wide boulevards and uniform buildings.`,
      current_news: [
        'Louvre announces extended evening hours for summer visitors',
        'New metro line connects major tourist attractions',
        'Paris Olympics legacy: sports venues now open to public',
        'Seine swimming officially open after historic cleanup effort',
        'French pastry week celebrates city\'s best bakeries',
      ],
      playlist: [
        { title: 'La Vie en Rose', artist: 'Édith Piaf' },
        { title: 'Sous le ciel de Paris', artist: 'Yves Montand' },
        { title: 'Champs-Élysées', artist: 'Joe Dassin' },
        { title: 'Paris', artist: 'ZAZ' },
        { title: 'La Bohème', artist: 'Charles Aznavour' },
        { title: 'Non, je ne regrette rien', artist: 'Édith Piaf' },
        { title: 'I Love Paris', artist: 'Cole Porter' },
        { title: 'April in Paris', artist: 'Ella Fitzgerald' },
        { title: 'Midnight in Paris', artist: 'Sidney Bechet' },
        { title: 'Paris s\'éveille', artist: 'Jacques Dutronc' },
      ],
      itinerary: [
        {
          day: 1,
          title: 'Iconic Paris',
          morning: 'Start early at the Eiffel Tower - book skip-the-line tickets. Take the elevator to the summit for breathtaking views.',
          afternoon: 'Stroll along the Seine to the Musée d\'Orsay for Impressionist masterpieces. Cross to the Tuileries Garden for a peaceful break.',
          evening: 'Dinner cruise on the Seine or dine at a classic bistro in Saint-Germain-des-Prés.',
        },
      ],
    },
    'Tokyo': {
      weather: {
        condition: 'Clear skies with mild humidity',
        temp_min: '18°C',
        temp_max: '25°C',
        humidity: '70%',
        sunrise: '05:45 AM',
        sunset: '06:30 PM',
      },
      packingItems: [
        'Comfortable walking shoes',
        'Light breathable clothing',
        'Pocket WiFi or SIM card recommended',
        'Small towel (for summer)',
        'Cash (many places don\'t accept cards)',
      ],
      historical_context: `Tokyo, originally called Edo, was a small fishing village until it became the seat of the Tokugawa shogunate in 1603. When Emperor Meiji moved from Kyoto to Edo in 1868, it was renamed Tokyo ("Eastern Capital"). Despite devastating earthquakes and WWII bombing, Tokyo rebuilt itself into a futuristic megalopolis.`,
      current_news: [
        'Tokyo Tower celebrates anniversary with special illuminations',
        'New bullet train route reduces travel time to Osaka',
        'Shibuya Crossing gets pedestrian-friendly upgrades',
        'Traditional craft workshops surge in popularity with tourists',
        'Cherry blossom festival dates announced for this season',
      ],
      playlist: [
        { title: 'Sukiyaki', artist: 'Kyu Sakamoto' },
        { title: 'Plastic Love', artist: 'Mariya Takeuchi' },
        { title: 'First Love', artist: 'Utada Hikaru' },
        { title: 'Tokyo Drift', artist: 'Teriyaki Boyz' },
        { title: 'Ride on Time', artist: 'Tatsuro Yamashita' },
        { title: 'Stay With Me', artist: 'Miki Matsubara' },
        { title: 'Tokyo Girl', artist: 'Perfume' },
        { title: 'Lemon', artist: 'Kenshi Yonezu' },
        { title: 'City Pop Tokyo', artist: 'Various' },
        { title: 'Merry Christmas Mr. Lawrence', artist: 'Ryuichi Sakamoto' },
      ],
      itinerary: [
        {
          day: 1,
          title: 'Traditional Tokyo',
          morning: 'Visit Senso-ji Temple in Asakusa, Tokyo\'s oldest temple. Explore Nakamise Shopping Street for traditional snacks.',
          afternoon: 'Take a water bus down the Sumida River to modern Odaiba. Visit teamLab or enjoy the futuristic architecture.',
          evening: 'Experience Shibuya Crossing at night, then dinner in Shinjuku - try an izakaya for authentic Japanese dining.',
        },
      ],
    },
  };

  // Get city-specific data or generate generic
  const cityData = mockData[city] || generateGenericCityData(city, country, month);

  // Generate additional days if needed
  const itinerary = [...(cityData.itinerary || [])];
  for (let day = itinerary.length + 1; day <= numberOfDays; day++) {
    itinerary.push({
      day,
      title: `Day ${day} Adventures`,
      morning: 'Discover more hidden gems and local favorites. Visit neighborhoods off the tourist path.',
      afternoon: 'Relax at a local café or park. Do some shopping for unique souvenirs.',
      evening: 'Try a different cuisine or return to a favorite spot. Enjoy the city at night.',
    });
  }

  return {
    overview: {
      packing: {
        weather: cityData.weather || {
          condition: 'Pleasant weather expected',
          temp_min: '16°C',
          temp_max: '24°C',
          humidity: '60%',
          sunrise: '06:30 AM',
          sunset: '07:30 PM',
        },
        items: cityData.packingItems || [
          'Light layers - t-shirts and a light jacket',
          'Comfortable walking shoes',
          'Power adapter for your electronics',
          'Small daypack for daily adventures',
        ],
      },
      historical_context: cityData.historical_context || `${city} is a vibrant destination with a rich cultural heritage. The city has evolved through centuries of history, blending traditional charm with modern innovation.`,
      current_news: cityData.current_news || [
        `Local festivals and events happening throughout ${month}`,
        'New attractions opening for tourists',
        'Cultural exhibitions showcasing local heritage',
        'Transportation improvements for visitors',
        'Sustainable tourism initiatives launched',
      ],
    },
    itinerary,
    playlist: cityData.playlist || [
      { title: 'Local Favorite', artist: 'Traditional Artist' },
      { title: 'City Anthem', artist: 'Popular Band' },
      { title: 'Cultural Melody', artist: 'Folk Singer' },
      { title: 'Modern Hit', artist: 'Contemporary Artist' },
      { title: 'Classic Tune', artist: 'Legendary Musician' },
    ],
    chat: {
      initial_message: `Hi! I'm your Voyager assistant. I've prepared a ${numberOfDays}-day itinerary for your trip to ${city}. Feel free to ask me anything about your trip!`,
      context: {
        place: `${city}, ${country}`,
        days: numberOfDays,
        month,
      },
    },
  };
};

function generateGenericCityData(city: string, country: string, month: string): Partial<CityMockData> {
  return {
    weather: {
      condition: 'Pleasant weather expected',
      temp_min: '16°C',
      temp_max: '24°C',
      humidity: '60%',
      sunrise: '06:30 AM',
      sunset: '07:30 PM',
    },
    packingItems: [
      'Light layers - t-shirts and a light jacket',
      'Comfortable walking shoes',
      'Power adapter for your electronics',
      'Small daypack for daily adventures',
    ],
    historical_context: `${city} is a vibrant destination with a rich cultural heritage. The city has evolved through centuries of history, blending traditional charm with modern innovation.`,
    current_news: [
      `Local festivals and events happening throughout ${month}`,
      'New attractions opening for tourists',
      'Cultural exhibitions showcasing local heritage',
      'Transportation improvements for visitors',
      'Sustainable tourism initiatives launched',
    ],
    playlist: [
      { title: 'Local Favorite', artist: 'Traditional Artist' },
      { title: 'City Anthem', artist: 'Popular Band' },
      { title: 'Cultural Melody', artist: 'Folk Singer' },
      { title: 'Modern Hit', artist: 'Contemporary Artist' },
      { title: 'Classic Tune', artist: 'Legendary Musician' },
    ],
    itinerary: [
      {
        day: 1,
        title: `Exploring ${city}`,
        morning: 'Start your day at the historic city center. Visit the main landmarks and soak in the local atmosphere.',
        afternoon: 'Explore local markets and try authentic cuisine. Visit museums or galleries showcasing local art and history.',
        evening: 'Enjoy dinner at a recommended restaurant and experience the nightlife.',
      },
    ],
  };
}
