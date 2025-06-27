const CACHE_NAME = 'portfolio-cache-v2';

// Get the base path from the service worker's own URL
const getBasePath = () => {
  const swUrl = new URL(self.location.href);
  const pathSegments = swUrl.pathname.split('/');
  // Remove 'service-worker.js' from the end
  pathSegments.pop();
  return pathSegments.join('/') + '/';
};

const basePath = getBasePath();

// Function to normalize URLs with base path
const normalizeUrl = (url) => {
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  return basePath + url;
};

const urlsToCache = [
  'favicon-1.ico?v=2',
  'gt/01/map.png',
  'gt/01/map-overlay.png',
  'gt/01/MapPin.png',
  'gt/01/MapPinMarked.png',
  'gt/01/MapPinShelter.png',
  'gt/01/gear.svg',
  'gt/01/MapPinSurvivor.svg',
  'gt/01/item/Lockpick.png',
  'gt/01/item/Bolt cutter.png',
  'gt/01/survivor/Miguel.png',
  'gt/01/survivor/Barb.png',
  'gt/01/survivor/Aubrey.png',
  'gt/01/survivor/Rahul.png',
  'gt/01/survivor/Joe.png',
  'gt/01/survivor/Frank.png',
  'gt/01/survivor/Lester.png',
  'gt/01/survivor/Michelle.png',
  'gt/01/survivor/Hudson.png',
  'gt/01/survivor/Robbie.png',
  'gt/01/survivor/Cooper.png',
  'gt/01/survivor/Kirk.png',
  'gt/01/survivor/Isabel.png',

  /* Sign files */
  'gt/01/sign/Arcade.png',
  'gt/01/sign/Automotive.png',
  'gt/01/sign/Bar.png',
  'gt/01/sign/Bookstore.png',
  'gt/01/sign/Clinic.png',
  'gt/01/sign/Construction.png',
  'gt/01/sign/Container.png',
  'gt/01/sign/Corp.png',
  'gt/01/sign/Diner.png',
  'gt/01/sign/Electronic.png',
  'gt/01/sign/Fast food.png',
  'gt/01/sign/Fire.png',
  'gt/01/sign/Gallery.png',
  'gt/01/sign/Gas.png',
  'gt/01/sign/Hardware.png',
  'gt/01/sign/Hospital.png',
  'gt/01/sign/House.png',
  'gt/01/sign/Laundry.png',
  'gt/01/sign/Manor.png',
  'gt/01/sign/Meats Factory.png',
  'gt/01/sign/Meats House.png',
  'gt/01/sign/Motel.png',
  'gt/01/sign/Motor.png',
  'gt/01/sign/Parlor.png',
  'gt/01/sign/Police.png',
  'gt/01/sign/Records.png',
  'gt/01/sign/Route.png',
  'gt/01/sign/School.png',
  'gt/01/sign/Sport.png',
  'gt/01/sign/Taxi.png',
  'gt/01/sign/Trailer.png',
  'gt/01/sign/Water.png',
  'gt/01/sign/Worship.png',

  /* Upper files */
  'gt/01/upper/15 Independence Blvd.png',
  'gt/01/upper/22 Springwood Drive.png',
  'gt/01/upper/319 Schrader St.png',
  'gt/01/upper/38 Irving Drive.png',
  'gt/01/upper/9th Precinct Station.png',
  'gt/01/upper/Ashby Hoarder\'s House.png',
  'gt/01/upper/Aunty Mae\'s Truck Stop Diner.png',
  'gt/01/upper/Best Electronics.png',
  'gt/01/upper/Bloomingburg Books.png',
  'gt/01/upper/Bottle Hill Ruin.png',
  'gt/01/upper/Briarwood Motel.png',
  'gt/01/upper/Container Yard No.3.png',
  'gt/01/upper/Elkins Family Clinic.png',
  'gt/01/upper/Fire Station No.13.png',
  'gt/01/upper/Fire Station No.8.png',
  'gt/01/upper/Fitzgerald House.png',
  'gt/01/upper/Galaxy Zone Arcade.png',
  'gt/01/upper/Griffith & Sons Hardware.png',
  'gt/01/upper/Hacket Construction Inc..png',
  'gt/01/upper/Hardwick\'s Trailer.png',
  'gt/01/upper/Harshaw Presbyterian.png',
  'gt/01/upper/Jay\'s Motel.png',
  'gt/01/upper/Jensen Elementary School.png',
  'gt/01/upper/Kinski Foundation Gallery.png',
  'gt/01/upper/Lester Barr Automotive.png',
  'gt/01/upper/Mercer High School.png',
  'gt/01/upper/Millwood Manor.png',
  'gt/01/upper/Mitchum Powell Plaza.png',
  'gt/01/upper/Old Ballard.png',
  'gt/01/upper/Pioneer Motor Company.png',
  'gt/01/upper/Pogo\'s Greenhaven.png',
  'gt/01/upper/Pogo\'s on 9th.png',
  'gt/01/upper/RM&K Communications.png',
  'gt/01/upper/Red Mile Gas Station.png',
  'gt/01/upper/St Bernadette Hospital.png',
  'gt/01/upper/Stanton & Son Meats.png',
  'gt/01/upper/Styx Arcade.png',
  'gt/01/upper/Texas Sport Supply.png',
  'gt/01/upper/Texway Gas Green St.png',
  'gt/01/upper/Texway Gas Hart St.png',
  'gt/01/upper/The Hitchpost.png',
  'gt/01/upper/The Indigo Rose.png',
  'gt/01/upper/Thirty Ought Six Bar.png',
  'gt/01/upper/US Route 93.png',
  'gt/01/upper/Value Records.png',
  'gt/01/upper/Victory Meat Processing.png',
  'gt/01/upper/Vivaldi\'s.png',
  'gt/01/upper/Walton City Water Treatment.png',
  'gt/01/upper/Walton Taxi Depot.png',
  'gt/01/upper/Wash and Dry Laundromat.png',

  /* Traits - Shelter files */
  'gt/01/traits/shelter/Distillery.png',
  'gt/01/traits/shelter/Garden.png',
  'gt/01/traits/shelter/Shelter Beds.png',
  'gt/01/traits/shelter/Water Collector.png',

  /* Traits - Survivor files */
  'gt/01/traits/survivor/Bad Back.png',
  'gt/01/traits/survivor/Bad Cook.png',
  'gt/01/traits/survivor/Badly Hurt.png',
  'gt/01/traits/survivor/Carnivore.png',
  'gt/01/traits/survivor/Chemist.png',
  'gt/01/traits/survivor/Commercial Pilot Licence.png',
  'gt/01/traits/survivor/Deep Sleeper.png',
  'gt/01/traits/survivor/Depleted.png',
  'gt/01/traits/survivor/Determined.png',
  'gt/01/traits/survivor/Evasive.png',
  'gt/01/traits/survivor/Feather-Fist.png',
  'gt/01/traits/survivor/First Aid Training.png',
  'gt/01/traits/survivor/Gearhead.png',
  'gt/01/traits/survivor/Good Cook.png',
  'gt/01/traits/survivor/Gunsmith.png',
  'gt/01/traits/survivor/Insomniac.png',
  'gt/01/traits/survivor/Jaded.png',
  'gt/01/traits/survivor/Keyring.png',
  'gt/01/traits/survivor/Organized.png',
  'gt/01/traits/survivor/Poor Craftsperson.png',
  'gt/01/traits/survivor/Refined Taste.png',
  'gt/01/traits/survivor/Restless.png',
  'gt/01/traits/survivor/Scrapper.png',
  'gt/01/traits/survivor/Sensitive Stomach.png',
  'gt/01/traits/survivor/Small Stomach.png',
  'gt/01/traits/survivor/Social Drinker.png',
  'gt/01/traits/survivor/Strong Shoulders.png',
  'gt/01/traits/survivor/Tough.png',
  'gt/01/traits/survivor/Unfazed.png',
  'gt/01/traits/survivor/Veterinarian.png',
  'gt/01/traits/survivor/Whittler.png',
  'gt/01/traits/survivor/Will to Live.png',
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Normalize all URLs before caching
      const normalizedUrls = urlsToCache.map(url => normalizeUrl(url));
      return cache.addAll(normalizedUrls);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches that don't match the current CACHE_NAME
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      
      // Try to match with normalized URL if direct match fails
      const url = new URL(event.request.url);
      const normalizedUrl = normalizeUrl(url.pathname.substring(basePath.length));
      
      return caches.match(normalizedUrl).then((normalizedResponse) => {
        if (normalizedResponse) {
          return normalizedResponse;
        }
        return fetch(event.request);
      });
    })
  );
});
