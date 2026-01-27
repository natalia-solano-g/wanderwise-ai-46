import { ItineraryData } from '@/types/voyager';

export const generateMockItinerary = (city: string, country: string, numberOfDays: number, month: string): ItineraryData => {
  const mockData: Record<string, Partial<ItineraryData>> = {
    'London': {
      weather: {
        date: `2026-${month.toLowerCase()}-15`,
        condition: 'Partly cloudy with occasional showers',
        maxTempC: 18,
        minTempC: 11,
        humidity: 75,
        sunrise: '06:30 AM',
        sunset: '08:15 PM',
      },
      history: `London, the capital of England and the United Kingdom, has a history spanning nearly two millennia. Founded as Londinium by the Romans around 43 AD, it became a major settlement and trading post. The city survived the Great Fire of 1666, which destroyed much of the medieval city, leading to Christopher Wren's masterpiece, St. Paul's Cathedral. During the Victorian era, London became the world's largest city and capital of the British Empire. Today, it seamlessly blends ancient history with modern innovation, from the Tower of London to the Shard.`,
      news: `• The British Museum announces a new exhibit on Ancient Egyptian artifacts opening this ${month}\n• London's Elizabeth Line celebrates expansion with improved weekend services\n• West End sees record ticket sales for new musical productions\n• Borough Market launches sustainable food initiative with local vendors\n• Thames cleanup project removes 10 tonnes of plastic, celebrates milestone`,
      songs: `1. London Calling - The Clash
2. Waterloo Sunset - The Kinks
3. A Day in the Life - The Beatles
4. West End Girls - Pet Shop Boys
5. Baker Street - Gerry Rafferty
6. Up the Junction - Squeeze
7. Primrose Hill - Madness
8. Electric Avenue - Eddy Grant
9. The Passenger - Iggy Pop
10. London Bridge - Fergie
11. Sunny Afternoon - The Kinks
12. Life on Mars? - David Bowie
13. Fashion - David Bowie
14. London Loves - Blur
15. Parklife - Blur
16. Common People - Pulp
17. A Town Called Malice - The Jam
18. Ghost Town - The Specials
19. Champagne Supernova - Oasis
20. Don't Look Back in Anger - Oasis`,
      itinerary: `## Day 1: Royal London & Historic Heart

### Morning ☀️
Start your London adventure at **Westminster Abbey**, where British monarchs have been crowned for centuries. The Gothic architecture and the Poets' Corner are not to be missed. Walk along the Thames to see **Big Ben** and the **Houses of Parliament**.

### Afternoon 🌤️
Cross Westminster Bridge for iconic photo opportunities, then head to **St. James's Park** for a peaceful stroll. Time your visit to **Buckingham Palace** for the Changing of the Guard ceremony (check schedule). End at **Trafalgar Square** and visit the **National Gallery** (free entry).

### Evening 🌙
Dinner in **Covent Garden** - try traditional British fare at Rules, London's oldest restaurant. Catch a West End show if time permits.

---

## Day 2: Museums & Markets

### Morning ☀️
Explore the **British Museum** - home to the Rosetta Stone and Egyptian mummies. It's free and you could spend days here, so prioritize your must-sees.

### Afternoon 🌤️
Take the Tube to **Borough Market** for a gourmet lunch. Sample artisan cheeses, fresh oysters, and incredible street food. Walk across the **Millennium Bridge** for views of St. Paul's Cathedral.

### Evening 🌙
Visit **St. Paul's Cathedral** for Evensong (free) - an ethereal experience. Dinner in the **Barbican** area.

---

## Day 3: Tower & East London

### Morning ☀️
Book early entry to the **Tower of London** to see the Crown Jewels before crowds arrive. Don't miss the Yeoman Warder tours - they're entertaining and informative.

### Afternoon 🌤️
Walk across **Tower Bridge** (you can do the glass floor experience). Explore the trendy **Shoreditch** neighborhood - street art, vintage shops, and coffee culture.

### Evening 🌙
Dinner at **Dishoom** for legendary Bombay-style cuisine. Walk along the South Bank for evening views.

---

## Day 4: Royal Parks & Shopping

### Morning ☀️
Rent a bike or walk through **Hyde Park** and **Kensington Gardens**. Visit **Kensington Palace** where William and Kate reside.

### Afternoon 🌤️
Shopping on **Oxford Street** or for something more upscale, explore **Bond Street** and **Regent Street**. Tea at **Fortnum & Mason** is a quintessential experience.

### Evening 🌙
Farewell dinner in **Soho** - take your pick from world cuisines. End with drinks at a rooftop bar with city views.`,
    },
    'Paris': {
      weather: {
        date: `2026-${month.toLowerCase()}-15`,
        condition: 'Mild and sunny with light clouds',
        maxTempC: 22,
        minTempC: 14,
        humidity: 65,
        sunrise: '07:00 AM',
        sunset: '08:45 PM',
      },
      history: `Paris, the City of Light, has been a major settlement since the 3rd century BC when it was founded by a Gallic tribe called the Parisii. The city flourished in the Middle Ages as a center of learning with the establishment of the Sorbonne. The French Revolution of 1789 transformed Paris and France forever. Baron Haussmann's 19th-century renovation gave Paris its iconic wide boulevards and uniform buildings. The city has been home to countless artists, writers, and thinkers, from Monet to Hemingway.`,
      news: `• Louvre announces extended evening hours for summer visitors\n• New metro line connects major tourist attractions\n• Paris Olympics legacy: sports venues now open to public\n• Seine swimming officially open after historic cleanup effort\n• French pastry week celebrates city's best bakeries`,
      songs: `1. La Vie en Rose - Édith Piaf
2. Sous le ciel de Paris - Yves Montand
3. Je t'aime... moi non plus - Serge Gainsbourg
4. Champs-Élysées - Joe Dassin
5. Paris - ZAZ
6. La Bohème - Charles Aznavour
7. Sympathique - Pink Martini
8. Midnight in Paris - Si Tu Vois Ma Mère
9. Paris s'éveille - Jacques Dutronc
10. Non, je ne regrette rien - Édith Piaf
11. Les Champs-Élysées - Joe Dassin
12. Paris, Texas - Ry Cooder
13. I Love Paris - Cole Porter
14. April in Paris - Ella Fitzgerald
15. An American in Paris - Gershwin
16. Sous les ponts de Paris - Dean Martin
17. Parisienne Walkways - Gary Moore
18. Paris - The Chainsmokers
19. Paris - Friendly Fires
20. A Night in Paris - Can`,
      itinerary: `## Day 1: Iconic Paris

### Morning ☀️
Start early at the **Eiffel Tower** - book skip-the-line tickets. Take the elevator to the summit for breathtaking views. Walk through the **Champ de Mars** gardens.

### Afternoon 🌤️
Stroll along the **Seine** to the **Musée d'Orsay** for Impressionist masterpieces. Cross to the **Tuileries Garden** for a peaceful break.

### Evening 🌙
Dinner cruise on the Seine or dine at a classic bistro in **Saint-Germain-des-Prés**.`,
    },
    'Tokyo': {
      weather: {
        date: `2026-${month.toLowerCase()}-15`,
        condition: 'Clear skies with mild humidity',
        maxTempC: 25,
        minTempC: 18,
        humidity: 70,
        sunrise: '05:45 AM',
        sunset: '06:30 PM',
      },
      history: `Tokyo, originally called Edo, was a small fishing village until it became the seat of the Tokugawa shogunate in 1603. For over 250 years, Edo grew into one of the world's largest cities. When Emperor Meiji moved from Kyoto to Edo in 1868, it was renamed Tokyo ("Eastern Capital"). Despite devastating earthquakes and WWII bombing, Tokyo rebuilt itself into a futuristic megalopolis. Today it's a unique blend of ultra-modern technology and ancient temples.`,
      news: `• Tokyo Tower celebrates anniversary with special illuminations\n• New bullet train route reduces travel time to Osaka\n• Shibuya Crossing gets pedestrian-friendly upgrades\n• Traditional craft workshops surge in popularity with tourists\n• Cherry blossom festival dates announced for this season`,
      songs: `1. Sukiyaki - Kyu Sakamoto
2. Plastic Love - Mariya Takeuchi
3. First Love - Utada Hikaru
4. Tokyo Drift - Teriyaki Boyz
5. Ride on Time - Tatsuro Yamashita
6. Tokyo - Imagine Dragons
7. Merry Christmas Mr. Lawrence - Ryuichi Sakamoto
8. Big in Japan - Alphaville
9. Turning Japanese - The Vapors
10. Shibuya-Kei - Various Artists
11. Tokyo Nights - Miki Matsubara
12. 4:00 AM - Taeko Ohnuki
13. Stay With Me - Miki Matsubara
14. City Pop Tokyo - Various
15. True Romance - Wada Kanako
16. Silent Siren - Fujiya
17. Summer Vacation - Tube
18. Tokyo Girl - Perfume
19. Heavy Rotation - AKB48
20. Lemon - Kenshi Yonezu`,
      itinerary: `## Day 1: Traditional Tokyo

### Morning ☀️
Visit **Senso-ji Temple** in Asakusa, Tokyo's oldest temple. Explore **Nakamise Shopping Street** for traditional snacks and souvenirs.

### Afternoon 🌤️
Take a water bus down the **Sumida River** to modern **Odaiba**. Visit teamLab or enjoy the futuristic architecture.

### Evening 🌙
Experience **Shibuya Crossing** at night, then dinner in **Shinjuku** - try an izakaya for authentic Japanese dining.`,
    },
  };

  // Get city-specific data or generate generic
  const cityData = mockData[city] || {
    weather: {
      date: `2026-${month.toLowerCase()}-15`,
      condition: 'Pleasant weather expected',
      maxTempC: 24,
      minTempC: 16,
      humidity: 60,
      sunrise: '06:30 AM',
      sunset: '07:30 PM',
    },
    history: `${city} is a vibrant destination with a rich cultural heritage. The city has evolved through centuries of history, blending traditional charm with modern innovation. Visitors will find a unique atmosphere that reflects the local culture and traditions of ${country}.`,
    news: `• Local festivals and events happening throughout ${month}\n• New attractions opening for tourists\n• Cultural exhibitions showcasing local heritage\n• Transportation improvements for visitors\n• Sustainable tourism initiatives launched`,
    songs: `1. Local Favorite - Traditional Artist
2. City Anthem - Popular Band
3. Cultural Melody - Folk Singer
4. Modern Hit - Contemporary Artist
5. Classic Tune - Legendary Musician
6. Dance Track - Local DJ
7. Romantic Ballad - Singer
8. Festival Song - Band
9. Street Music - Performer
10. Historical Piece - Orchestra
11. Pop Hit - Star
12. Rock Classic - Band
13. Jazz Standard - Ensemble
14. Electronic Beat - Producer
15. Acoustic Session - Songwriter
16. Live Performance - Artist
17. Studio Recording - Musician
18. Remix Version - DJ
19. Acoustic Cover - Singer
20. Original Composition - Composer`,
    itinerary: `## Day 1: Exploring ${city}

### Morning ☀️
Start your day at the historic city center. Visit the main landmarks and soak in the local atmosphere.

### Afternoon 🌤️
Explore local markets and try authentic cuisine. Visit museums or galleries showcasing local art and history.

### Evening 🌙
Enjoy dinner at a recommended restaurant and experience the nightlife.`,
  };

  // Generate additional days if needed
  let fullItinerary = cityData.itinerary || '';
  for (let day = 2; day <= numberOfDays; day++) {
    if (!fullItinerary.includes(`Day ${day}`)) {
      fullItinerary += `

---

## Day ${day}: Continued Exploration

### Morning ☀️
Discover more hidden gems and local favorites. Visit neighborhoods off the tourist path.

### Afternoon 🌤️
Relax at a local café or park. Do some shopping for unique souvenirs.

### Evening 🌙
Try a different cuisine or return to a favorite spot. Enjoy the city at night.`;
    }
  }

  return {
    weather: cityData.weather!,
    history: cityData.history!,
    news: cityData.news!,
    songs: cityData.songs!,
    itinerary: fullItinerary,
    city,
    country,
    numberOfDays,
    month,
  };
};
