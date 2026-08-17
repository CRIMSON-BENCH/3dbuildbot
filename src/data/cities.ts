// Top 100 US metros, keyed to state slug. Used to generate ~400 pages: cities × 4 processes.
// Population is an SEO signal / display; not authoritative to the person.

import { STATES } from "./states";

export interface City {
  slug: string;
  name: string;
  stateSlug: string;
  stateAbbr: string;
  pop: number;
  county: string;
  nearbyIndustries: string[];
}

export const CITIES: City[] = [
  { slug: "new-york", name: "New York", stateSlug: "new-york", stateAbbr: "NY", pop: 8336817, county: "New York", nearbyIndustries: ["Aerospace", "Medical", "Consumer Electronics"] },
  { slug: "los-angeles", name: "Los Angeles", stateSlug: "california", stateAbbr: "CA", pop: 3898747, county: "Los Angeles", nearbyIndustries: ["Aerospace", "Entertainment Tech", "EV"] },
  { slug: "chicago", name: "Chicago", stateSlug: "illinois", stateAbbr: "IL", pop: 2746388, county: "Cook", nearbyIndustries: ["Aerospace", "Heavy Industry", "Medical"] },
  { slug: "houston", name: "Houston", stateSlug: "texas", stateAbbr: "TX", pop: 2304580, county: "Harris", nearbyIndustries: ["Aerospace (NASA JSC)", "Energy", "Medical"] },
  { slug: "phoenix", name: "Phoenix", stateSlug: "arizona", stateAbbr: "AZ", pop: 1608139, county: "Maricopa", nearbyIndustries: ["Semiconductor", "Aerospace"] },
  { slug: "philadelphia", name: "Philadelphia", stateSlug: "pennsylvania", stateAbbr: "PA", pop: 1603797, county: "Philadelphia", nearbyIndustries: ["Medical", "Aerospace"] },
  { slug: "san-antonio", name: "San Antonio", stateSlug: "texas", stateAbbr: "TX", pop: 1434625, county: "Bexar", nearbyIndustries: ["Aerospace", "Defense", "Medical"] },
  { slug: "san-diego", name: "San Diego", stateSlug: "california", stateAbbr: "CA", pop: 1386932, county: "San Diego", nearbyIndustries: ["Defense", "Biotech", "Robotics"] },
  { slug: "dallas", name: "Dallas", stateSlug: "texas", stateAbbr: "TX", pop: 1304379, county: "Dallas", nearbyIndustries: ["Aerospace", "Semiconductor", "Defense"] },
  { slug: "san-jose", name: "San Jose", stateSlug: "california", stateAbbr: "CA", pop: 1013240, county: "Santa Clara", nearbyIndustries: ["Semiconductor", "Robotics", "EV"] },
  { slug: "austin", name: "Austin", stateSlug: "texas", stateAbbr: "TX", pop: 961855, county: "Travis", nearbyIndustries: ["EV (Tesla)", "Semiconductor (Samsung)", "Robotics"] },
  { slug: "jacksonville", name: "Jacksonville", stateSlug: "florida", stateAbbr: "FL", pop: 949611, county: "Duval", nearbyIndustries: ["Defense", "Aerospace", "Marine"] },
  { slug: "fort-worth", name: "Fort Worth", stateSlug: "texas", stateAbbr: "TX", pop: 918915, county: "Tarrant", nearbyIndustries: ["Aerospace (Lockheed)", "Defense"] },
  { slug: "columbus", name: "Columbus", stateSlug: "ohio", stateAbbr: "OH", pop: 905748, county: "Franklin", nearbyIndustries: ["Aerospace", "Automotive"] },
  { slug: "charlotte", name: "Charlotte", stateSlug: "north-carolina", stateAbbr: "NC", pop: 874579, county: "Mecklenburg", nearbyIndustries: ["Aerospace", "Energy"] },
  { slug: "indianapolis", name: "Indianapolis", stateSlug: "indiana", stateAbbr: "IN", pop: 887642, county: "Marion", nearbyIndustries: ["Aerospace (Rolls-Royce)", "Medical Devices"] },
  { slug: "seattle", name: "Seattle", stateSlug: "washington", stateAbbr: "WA", pop: 737015, county: "King", nearbyIndustries: ["Aerospace (Boeing)", "Cloud", "Defense"] },
  { slug: "denver", name: "Denver", stateSlug: "colorado", stateAbbr: "CO", pop: 715522, county: "Denver", nearbyIndustries: ["Aerospace", "Cleantech", "Defense"] },
  { slug: "washington", name: "Washington", stateSlug: "district-of-columbia", stateAbbr: "DC", pop: 689545, county: "District of Columbia", nearbyIndustries: ["Government", "Defense", "Aerospace"] },
  { slug: "boston", name: "Boston", stateSlug: "massachusetts", stateAbbr: "MA", pop: 675647, county: "Suffolk", nearbyIndustries: ["Biotech", "Robotics", "Medical"] },
  { slug: "el-paso", name: "El Paso", stateSlug: "texas", stateAbbr: "TX", pop: 678815, county: "El Paso", nearbyIndustries: ["Defense", "Aerospace"] },
  { slug: "nashville", name: "Nashville", stateSlug: "tennessee", stateAbbr: "TN", pop: 689447, county: "Davidson", nearbyIndustries: ["Automotive", "Medical"] },
  { slug: "detroit", name: "Detroit", stateSlug: "michigan", stateAbbr: "MI", pop: 639111, county: "Wayne", nearbyIndustries: ["Automotive", "Defense (Warren)"] },
  { slug: "oklahoma-city", name: "Oklahoma City", stateSlug: "oklahoma", stateAbbr: "OK", pop: 655057, county: "Oklahoma", nearbyIndustries: ["Aerospace (Tinker AFB)", "Energy"] },
  { slug: "portland", name: "Portland", stateSlug: "oregon", stateAbbr: "OR", pop: 652503, county: "Multnomah", nearbyIndustries: ["Semiconductor (Intel)", "Athletic", "Outdoor Gear"] },
  { slug: "las-vegas", name: "Las Vegas", stateSlug: "nevada", stateAbbr: "NV", pop: 641903, county: "Clark", nearbyIndustries: ["Defense", "Aerospace"] },
  { slug: "memphis", name: "Memphis", stateSlug: "tennessee", stateAbbr: "TN", pop: 633104, county: "Shelby", nearbyIndustries: ["Logistics", "Medical"] },
  { slug: "louisville", name: "Louisville", stateSlug: "kentucky", stateAbbr: "KY", pop: 617638, county: "Jefferson", nearbyIndustries: ["Automotive", "Aerospace"] },
  { slug: "baltimore", name: "Baltimore", stateSlug: "maryland", stateAbbr: "MD", pop: 585708, county: "Baltimore", nearbyIndustries: ["Defense", "Biotech", "Aerospace"] },
  { slug: "milwaukee", name: "Milwaukee", stateSlug: "wisconsin", stateAbbr: "WI", pop: 577222, county: "Milwaukee", nearbyIndustries: ["Heavy Industry", "Medical (GE)"] },
  { slug: "albuquerque", name: "Albuquerque", stateSlug: "new-mexico", stateAbbr: "NM", pop: 564559, county: "Bernalillo", nearbyIndustries: ["Defense (Sandia)", "Aerospace"] },
  { slug: "tucson", name: "Tucson", stateSlug: "arizona", stateAbbr: "AZ", pop: 542629, county: "Pima", nearbyIndustries: ["Defense (Raytheon)", "Optics"] },
  { slug: "fresno", name: "Fresno", stateSlug: "california", stateAbbr: "CA", pop: 542107, county: "Fresno", nearbyIndustries: ["Agriculture-Tech", "Aerospace"] },
  { slug: "sacramento", name: "Sacramento", stateSlug: "california", stateAbbr: "CA", pop: 524943, county: "Sacramento", nearbyIndustries: ["Aerospace", "Cleantech"] },
  { slug: "mesa", name: "Mesa", stateSlug: "arizona", stateAbbr: "AZ", pop: 504258, county: "Maricopa", nearbyIndustries: ["Aerospace (Boeing Mesa)", "Semiconductor"] },
  { slug: "kansas-city", name: "Kansas City", stateSlug: "missouri", stateAbbr: "MO", pop: 508090, county: "Jackson", nearbyIndustries: ["Aerospace", "Defense"] },
  { slug: "atlanta", name: "Atlanta", stateSlug: "georgia", stateAbbr: "GA", pop: 498715, county: "Fulton", nearbyIndustries: ["Aerospace (Delta)", "Film Tech", "Logistics"] },
  { slug: "long-beach", name: "Long Beach", stateSlug: "california", stateAbbr: "CA", pop: 466742, county: "Los Angeles", nearbyIndustries: ["Aerospace", "Marine"] },
  { slug: "colorado-springs", name: "Colorado Springs", stateSlug: "colorado", stateAbbr: "CO", pop: 478961, county: "El Paso", nearbyIndustries: ["Aerospace", "Defense"] },
  { slug: "raleigh", name: "Raleigh", stateSlug: "north-carolina", stateAbbr: "NC", pop: 467665, county: "Wake", nearbyIndustries: ["Biotech", "Defense"] },
  { slug: "miami", name: "Miami", stateSlug: "florida", stateAbbr: "FL", pop: 442241, county: "Miami-Dade", nearbyIndustries: ["Aerospace", "Marine", "Medical"] },
  { slug: "virginia-beach", name: "Virginia Beach", stateSlug: "virginia", stateAbbr: "VA", pop: 459470, county: "Virginia Beach", nearbyIndustries: ["Defense (Navy)"] },
  { slug: "omaha", name: "Omaha", stateSlug: "nebraska", stateAbbr: "NE", pop: 486051, county: "Douglas", nearbyIndustries: ["Defense (STRATCOM)", "Agriculture-Tech"] },
  { slug: "oakland", name: "Oakland", stateSlug: "california", stateAbbr: "CA", pop: 440646, county: "Alameda", nearbyIndustries: ["Robotics", "Cleantech"] },
  { slug: "minneapolis", name: "Minneapolis", stateSlug: "minnesota", stateAbbr: "MN", pop: 429954, county: "Hennepin", nearbyIndustries: ["Medical Devices (Medtronic)"] },
  { slug: "tulsa", name: "Tulsa", stateSlug: "oklahoma", stateAbbr: "OK", pop: 413066, county: "Tulsa", nearbyIndustries: ["Aerospace", "Energy"] },
  { slug: "arlington-tx", name: "Arlington", stateSlug: "texas", stateAbbr: "TX", pop: 394266, county: "Tarrant", nearbyIndustries: ["Aerospace", "Automotive"] },
  { slug: "new-orleans", name: "New Orleans", stateSlug: "louisiana", stateAbbr: "LA", pop: 383997, county: "Orleans", nearbyIndustries: ["Aerospace (NASA Michoud)", "Marine"] },
  { slug: "wichita", name: "Wichita", stateSlug: "kansas", stateAbbr: "KS", pop: 397532, county: "Sedgwick", nearbyIndustries: ["Aerospace ('Air Capital')"] },
  { slug: "bakersfield", name: "Bakersfield", stateSlug: "california", stateAbbr: "CA", pop: 403455, county: "Kern", nearbyIndustries: ["Energy", "Aerospace"] },
  { slug: "cleveland", name: "Cleveland", stateSlug: "ohio", stateAbbr: "OH", pop: 372624, county: "Cuyahoga", nearbyIndustries: ["Aerospace (NASA Glenn)", "Medical (Cleveland Clinic)"] },
  { slug: "aurora", name: "Aurora", stateSlug: "colorado", stateAbbr: "CO", pop: 379434, county: "Arapahoe", nearbyIndustries: ["Aerospace", "Defense"] },
  { slug: "anaheim", name: "Anaheim", stateSlug: "california", stateAbbr: "CA", pop: 346824, county: "Orange", nearbyIndustries: ["Aerospace", "Consumer Electronics"] },
  { slug: "honolulu", name: "Honolulu", stateSlug: "hawaii", stateAbbr: "HI", pop: 350964, county: "Honolulu", nearbyIndustries: ["Defense (Pearl Harbor)"] },
  { slug: "santa-ana", name: "Santa Ana", stateSlug: "california", stateAbbr: "CA", pop: 310227, county: "Orange", nearbyIndustries: ["Consumer Electronics", "Aerospace"] },
  { slug: "riverside", name: "Riverside", stateSlug: "california", stateAbbr: "CA", pop: 314998, county: "Riverside", nearbyIndustries: ["Aerospace", "Logistics"] },
  { slug: "corpus-christi", name: "Corpus Christi", stateSlug: "texas", stateAbbr: "TX", pop: 317863, county: "Nueces", nearbyIndustries: ["Aerospace", "Defense (NAS)"] },
  { slug: "lexington", name: "Lexington", stateSlug: "kentucky", stateAbbr: "KY", pop: 322570, county: "Fayette", nearbyIndustries: ["Automotive (Toyota)"] },
  { slug: "stockton", name: "Stockton", stateSlug: "california", stateAbbr: "CA", pop: 320804, county: "San Joaquin", nearbyIndustries: ["Logistics", "Aerospace"] },
  { slug: "henderson", name: "Henderson", stateSlug: "nevada", stateAbbr: "NV", pop: 302539, county: "Clark", nearbyIndustries: ["Defense", "Aerospace"] },
  { slug: "saint-paul", name: "Saint Paul", stateSlug: "minnesota", stateAbbr: "MN", pop: 311527, county: "Ramsey", nearbyIndustries: ["Medical Devices", "Aerospace"] },
  { slug: "cincinnati", name: "Cincinnati", stateSlug: "ohio", stateAbbr: "OH", pop: 309317, county: "Hamilton", nearbyIndustries: ["Aerospace (GE)"] },
  { slug: "pittsburgh", name: "Pittsburgh", stateSlug: "pennsylvania", stateAbbr: "PA", pop: 302971, county: "Allegheny", nearbyIndustries: ["Robotics (CMU)", "Medical"] },
  { slug: "greensboro", name: "Greensboro", stateSlug: "north-carolina", stateAbbr: "NC", pop: 296710, county: "Guilford", nearbyIndustries: ["Aerospace (HondaJet)"] },
  { slug: "anchorage", name: "Anchorage", stateSlug: "alaska", stateAbbr: "AK", pop: 291247, county: "Anchorage", nearbyIndustries: ["Defense", "Energy"] },
  { slug: "plano", name: "Plano", stateSlug: "texas", stateAbbr: "TX", pop: 285494, county: "Collin", nearbyIndustries: ["Semiconductor", "Aerospace"] },
  { slug: "lincoln", name: "Lincoln", stateSlug: "nebraska", stateAbbr: "NE", pop: 291082, county: "Lancaster", nearbyIndustries: ["Aerospace", "Agriculture-Tech"] },
  { slug: "orlando", name: "Orlando", stateSlug: "florida", stateAbbr: "FL", pop: 307573, county: "Orange", nearbyIndustries: ["Aerospace", "Simulation"] },
  { slug: "irvine", name: "Irvine", stateSlug: "california", stateAbbr: "CA", pop: 307670, county: "Orange", nearbyIndustries: ["Aerospace", "Semiconductor"] },
  { slug: "newark", name: "Newark", stateSlug: "new-jersey", stateAbbr: "NJ", pop: 311549, county: "Essex", nearbyIndustries: ["Pharma", "Aerospace"] },
  { slug: "toledo", name: "Toledo", stateSlug: "ohio", stateAbbr: "OH", pop: 270871, county: "Lucas", nearbyIndustries: ["Automotive", "Glass"] },
  { slug: "durham", name: "Durham", stateSlug: "north-carolina", stateAbbr: "NC", pop: 283506, county: "Durham", nearbyIndustries: ["Biotech (RTP)", "Medical"] },
  { slug: "chula-vista", name: "Chula Vista", stateSlug: "california", stateAbbr: "CA", pop: 275487, county: "San Diego", nearbyIndustries: ["Defense", "Aerospace"] },
  { slug: "fort-wayne", name: "Fort Wayne", stateSlug: "indiana", stateAbbr: "IN", pop: 263886, county: "Allen", nearbyIndustries: ["Automotive", "Defense"] },
  { slug: "jersey-city", name: "Jersey City", stateSlug: "new-jersey", stateAbbr: "NJ", pop: 292449, county: "Hudson", nearbyIndustries: ["Consumer Electronics", "Pharma"] },
  { slug: "saint-petersburg", name: "St. Petersburg", stateSlug: "florida", stateAbbr: "FL", pop: 258308, county: "Pinellas", nearbyIndustries: ["Medical", "Marine"] },
  { slug: "laredo", name: "Laredo", stateSlug: "texas", stateAbbr: "TX", pop: 255205, county: "Webb", nearbyIndustries: ["Logistics", "Aerospace"] },
  { slug: "madison", name: "Madison", stateSlug: "wisconsin", stateAbbr: "WI", pop: 269840, county: "Dane", nearbyIndustries: ["Medical", "Agriculture-Tech"] },
  { slug: "chandler", name: "Chandler", stateSlug: "arizona", stateAbbr: "AZ", pop: 275987, county: "Maricopa", nearbyIndustries: ["Semiconductor (Intel)"] },
  { slug: "buffalo", name: "Buffalo", stateSlug: "new-york", stateAbbr: "NY", pop: 278349, county: "Erie", nearbyIndustries: ["Aerospace", "Solar"] },
  { slug: "lubbock", name: "Lubbock", stateSlug: "texas", stateAbbr: "TX", pop: 258862, county: "Lubbock", nearbyIndustries: ["Aerospace", "Agriculture-Tech"] },
  { slug: "scottsdale", name: "Scottsdale", stateSlug: "arizona", stateAbbr: "AZ", pop: 241361, county: "Maricopa", nearbyIndustries: ["Semiconductor", "Aerospace"] },
  { slug: "reno", name: "Reno", stateSlug: "nevada", stateAbbr: "NV", pop: 264165, county: "Washoe", nearbyIndustries: ["EV (Tesla Gigafactory)"] },
  { slug: "glendale", name: "Glendale", stateSlug: "arizona", stateAbbr: "AZ", pop: 248325, county: "Maricopa", nearbyIndustries: ["Aerospace", "Manufacturing"] },
  { slug: "gilbert", name: "Gilbert", stateSlug: "arizona", stateAbbr: "AZ", pop: 275411, county: "Maricopa", nearbyIndustries: ["Semiconductor", "Aerospace"] },
  { slug: "winston-salem", name: "Winston-Salem", stateSlug: "north-carolina", stateAbbr: "NC", pop: 249545, county: "Forsyth", nearbyIndustries: ["Medical", "Aerospace"] },
  { slug: "chesapeake", name: "Chesapeake", stateSlug: "virginia", stateAbbr: "VA", pop: 249422, county: "Chesapeake", nearbyIndustries: ["Defense (Navy)"] },
  { slug: "norfolk", name: "Norfolk", stateSlug: "virginia", stateAbbr: "VA", pop: 238005, county: "Norfolk", nearbyIndustries: ["Defense (Naval Station)"] },
  { slug: "north-las-vegas", name: "North Las Vegas", stateSlug: "nevada", stateAbbr: "NV", pop: 251974, county: "Clark", nearbyIndustries: ["Defense", "Aerospace"] },
  { slug: "fremont", name: "Fremont", stateSlug: "california", stateAbbr: "CA", pop: 230504, county: "Alameda", nearbyIndustries: ["EV (Tesla)", "Semiconductor"] },
  { slug: "garland", name: "Garland", stateSlug: "texas", stateAbbr: "TX", pop: 246018, county: "Dallas", nearbyIndustries: ["Aerospace", "Electronics"] },
  { slug: "irving", name: "Irving", stateSlug: "texas", stateAbbr: "TX", pop: 239798, county: "Dallas", nearbyIndustries: ["Aerospace", "Semiconductor"] },
  { slug: "hialeah", name: "Hialeah", stateSlug: "florida", stateAbbr: "FL", pop: 223109, county: "Miami-Dade", nearbyIndustries: ["Aerospace", "Manufacturing"] },
  { slug: "richmond", name: "Richmond", stateSlug: "virginia", stateAbbr: "VA", pop: 226610, county: "Richmond", nearbyIndustries: ["Defense", "Government"] },
  { slug: "boise", name: "Boise", stateSlug: "idaho", stateAbbr: "ID", pop: 235684, county: "Ada", nearbyIndustries: ["Semiconductor (Micron)"] },
  { slug: "spokane", name: "Spokane", stateSlug: "washington", stateAbbr: "WA", pop: 228989, county: "Spokane", nearbyIndustries: ["Aerospace", "Defense"] },
  { slug: "baton-rouge", name: "Baton Rouge", stateSlug: "louisiana", stateAbbr: "LA", pop: 227470, county: "East Baton Rouge", nearbyIndustries: ["Petrochemical", "Defense"] },
  { slug: "tacoma", name: "Tacoma", stateSlug: "washington", stateAbbr: "WA", pop: 219205, county: "Pierce", nearbyIndustries: ["Aerospace (Boeing)", "Defense (JBLM)"] },
  { slug: "san-bernardino", name: "San Bernardino", stateSlug: "california", stateAbbr: "CA", pop: 222101, county: "San Bernardino", nearbyIndustries: ["Aerospace", "Logistics"] },
  { slug: "modesto", name: "Modesto", stateSlug: "california", stateAbbr: "CA", pop: 218464, county: "Stanislaus", nearbyIndustries: ["Agriculture-Tech"] },
  { slug: "fontana", name: "Fontana", stateSlug: "california", stateAbbr: "CA", pop: 210320, county: "San Bernardino", nearbyIndustries: ["Logistics", "Manufacturing"] },
  { slug: "des-moines", name: "Des Moines", stateSlug: "iowa", stateAbbr: "IA", pop: 214237, county: "Polk", nearbyIndustries: ["Agriculture-Tech", "Aerospace"] },
  { slug: "moreno-valley", name: "Moreno Valley", stateSlug: "california", stateAbbr: "CA", pop: 208634, county: "Riverside", nearbyIndustries: ["Aerospace", "Logistics"] },
  { slug: "santa-clarita", name: "Santa Clarita", stateSlug: "california", stateAbbr: "CA", pop: 228673, county: "Los Angeles", nearbyIndustries: ["Aerospace", "Entertainment Tech"] },
];

export const getCityBySlugAndState = (state: string, city: string) =>
  CITIES.find((c) => c.stateSlug === state && c.slug === city);
export const getCitiesForState = (stateSlug: string) => CITIES.filter((c) => c.stateSlug === stateSlug);
export const getAllCityPaths = () => CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }));
export const getStateForCity = (citySlug: string) => {
  const city = CITIES.find((c) => c.slug === citySlug);
  return city ? STATES.find((s) => s.slug === city.stateSlug) : undefined;
};
