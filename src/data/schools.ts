// Top US universities with engineering programs — starter set for /education/university/[slug] SEO tier.
// We'll expand to 500+ ABET-accredited programs + top 200 high schools later.

export interface School {
  slug: string;
  name: string;
  city: string;
  stateAbbr: string;
  type: "university" | "college" | "high-school" | "research-lab";
  hasEngineering: boolean;
  engineeringRankTop50?: boolean;
  makerspace?: string;
  notableTeams?: string[];
  hasITAR?: boolean;
  hasPhD?: boolean;
  founded?: number;
  studentCount?: number;
}

export const SCHOOLS: School[] = [
  { slug: "mit", name: "Massachusetts Institute of Technology", city: "Cambridge", stateAbbr: "MA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "MIT.nano + Metropolis + Hobby Shop", notableTeams: ["MIT Solar Electric Vehicle Team", "MIT Rocket Team", "MIT Formula SAE"], hasITAR: true, hasPhD: true, founded: 1861, studentCount: 11858 },
  { slug: "stanford-university", name: "Stanford University", city: "Stanford", stateAbbr: "CA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Product Realization Lab", notableTeams: ["Stanford Solar Car", "Stanford Racing"], hasITAR: true, hasPhD: true, founded: 1885, studentCount: 17381 },
  { slug: "caltech", name: "California Institute of Technology (Caltech)", city: "Pasadena", stateAbbr: "CA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Jim Hall Design & Prototyping Lab", notableTeams: ["Caltech Formula Racing"], hasITAR: true, hasPhD: true, founded: 1891, studentCount: 2237 },
  { slug: "carnegie-mellon-university", name: "Carnegie Mellon University", city: "Pittsburgh", stateAbbr: "PA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "IDeATe + Robotics Institute makerspaces", notableTeams: ["CMU Racing", "Team Tartan Racing"], hasITAR: true, hasPhD: true, founded: 1900, studentCount: 15818 },
  { slug: "georgia-tech", name: "Georgia Institute of Technology", city: "Atlanta", stateAbbr: "GA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Invention Studio + Flowers Innovation Studio", notableTeams: ["Wreck Racing", "Yellow Jacket Space Program"], hasITAR: true, hasPhD: true, founded: 1885, studentCount: 45296 },
  { slug: "university-of-michigan", name: "University of Michigan — Ann Arbor", city: "Ann Arbor", stateAbbr: "MI", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Wilson Student Team Project Center", notableTeams: ["Michigan Solar Car", "MRacing", "Michigan Autonomous Aerial Vehicles"], hasITAR: true, hasPhD: true, founded: 1817, studentCount: 51225 },
  { slug: "uc-berkeley", name: "University of California, Berkeley", city: "Berkeley", stateAbbr: "CA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Jacobs Institute for Design Innovation", notableTeams: ["Berkeley Solar Vehicle Team", "Cal Formula Electric"], hasITAR: true, hasPhD: true, founded: 1868, studentCount: 45307 },
  { slug: "illinois-urbana-champaign", name: "University of Illinois Urbana-Champaign", city: "Urbana", stateAbbr: "IL", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "The MakerLab + Innovation Studio", notableTeams: ["Illini Solar Car", "Illini Formula Electric"], hasITAR: true, hasPhD: true, founded: 1867, studentCount: 56916 },
  { slug: "purdue-university", name: "Purdue University", city: "West Lafayette", stateAbbr: "IN", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Bechtel Innovation Design Center", notableTeams: ["Purdue Solar Racing", "Purdue Aerospace Racing Team"], hasITAR: true, hasPhD: true, founded: 1869, studentCount: 51528 },
  { slug: "cornell-university", name: "Cornell University", city: "Ithaca", stateAbbr: "NY", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Rapid Prototyping Lab", notableTeams: ["Cornell Racing", "Cornell Rocketry Team"], hasITAR: true, hasPhD: true, founded: 1865, studentCount: 25582 },
  { slug: "texas-am", name: "Texas A&M University", city: "College Station", stateAbbr: "TX", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Zachry Engineering Education Complex Makerspace", notableTeams: ["Aggie Rocketry", "Aggie Formula SAE"], hasITAR: true, hasPhD: true, founded: 1876, studentCount: 74014 },
  { slug: "ut-austin", name: "University of Texas at Austin", city: "Austin", stateAbbr: "TX", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "TXRX Makerspace + Cockrell School fab labs", notableTeams: ["Longhorn Racing", "UT Austin Rocket Association"], hasITAR: true, hasPhD: true, founded: 1883, studentCount: 51832 },
  { slug: "virginia-tech", name: "Virginia Tech", city: "Blacksburg", stateAbbr: "VA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Ware Lab", notableTeams: ["Hybrid Electric Vehicle Team", "VT AutoDrive"], hasITAR: true, hasPhD: true, founded: 1872, studentCount: 38170 },
  { slug: "penn-state", name: "Pennsylvania State University", city: "University Park", stateAbbr: "PA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Learning Factory", notableTeams: ["Penn State Racing", "Penn State Lunar Lion"], hasITAR: true, hasPhD: true, founded: 1855, studentCount: 88914 },
  { slug: "harvey-mudd-college", name: "Harvey Mudd College", city: "Claremont", stateAbbr: "CA", type: "college", hasEngineering: true, engineeringRankTop50: true, makerspace: "Machine Shop + Design Studio", hasPhD: false, founded: 1955, studentCount: 902 },
  { slug: "olin-college", name: "Olin College of Engineering", city: "Needham", stateAbbr: "MA", type: "college", hasEngineering: true, makerspace: "Olin Shop + Innovation Lab", hasPhD: false, founded: 1997, studentCount: 400 },
  { slug: "worcester-polytechnic", name: "Worcester Polytechnic Institute", city: "Worcester", stateAbbr: "MA", type: "university", hasEngineering: true, makerspace: "Foisie Innovation Studio", notableTeams: ["WPI Formula SAE", "WPI High-Power Rocketry"], hasITAR: true, hasPhD: true, founded: 1865, studentCount: 7284 },
  { slug: "rensselaer-polytechnic", name: "Rensselaer Polytechnic Institute", city: "Troy", stateAbbr: "NY", type: "university", hasEngineering: true, makerspace: "The Manufacturing Innovation Learning Lab (MILL)", hasITAR: true, hasPhD: true, founded: 1824, studentCount: 7423 },
  { slug: "colorado-school-of-mines", name: "Colorado School of Mines", city: "Golden", stateAbbr: "CO", type: "university", hasEngineering: true, makerspace: "Blaster Design Factory", notableTeams: ["Mines Formula SAE", "Mines Human-Powered Vehicle"], hasITAR: true, hasPhD: true, founded: 1874, studentCount: 6820 },
  { slug: "us-air-force-academy", name: "United States Air Force Academy", city: "Colorado Springs", stateAbbr: "CO", type: "university", hasEngineering: true, makerspace: "USAFA Center for Engineering", hasITAR: true, hasPhD: false, founded: 1954, studentCount: 4300 },
  { slug: "us-military-academy", name: "United States Military Academy (West Point)", city: "West Point", stateAbbr: "NY", type: "university", hasEngineering: true, hasITAR: true, hasPhD: false, founded: 1802, studentCount: 4400 },
  { slug: "us-naval-academy", name: "United States Naval Academy", city: "Annapolis", stateAbbr: "MD", type: "university", hasEngineering: true, hasITAR: true, hasPhD: false, founded: 1845, studentCount: 4400 },
  { slug: "johns-hopkins", name: "Johns Hopkins University", city: "Baltimore", stateAbbr: "MD", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "WSE Manufacturing Space", hasITAR: true, hasPhD: true, founded: 1876, studentCount: 30089 },
  { slug: "duke-university", name: "Duke University", city: "Durham", stateAbbr: "NC", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Foundry + Innovation Co-Lab", hasITAR: true, hasPhD: true, founded: 1838, studentCount: 16780 },
  { slug: "northwestern-university", name: "Northwestern University", city: "Evanston", stateAbbr: "IL", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Segal Design Institute + Ford Motor Company Engineering Design Center", hasITAR: true, hasPhD: true, founded: 1851, studentCount: 22127 },
  { slug: "columbia-university", name: "Columbia University", city: "New York", stateAbbr: "NY", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Columbia Makerspace", hasITAR: true, hasPhD: true, founded: 1754, studentCount: 34782 },
  { slug: "princeton-university", name: "Princeton University", city: "Princeton", stateAbbr: "NJ", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Cannon Green Design Studio", hasITAR: true, hasPhD: true, founded: 1746, studentCount: 8419 },
  { slug: "usc", name: "University of Southern California", city: "Los Angeles", stateAbbr: "CA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "USC Makers + Baum Family Maker Space", hasITAR: true, hasPhD: true, founded: 1880, studentCount: 47500 },
  { slug: "ucla", name: "University of California, Los Angeles", city: "Los Angeles", stateAbbr: "CA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "UCLA Makerspace", hasITAR: true, hasPhD: true, founded: 1919, studentCount: 46430 },
  { slug: "uc-san-diego", name: "University of California, San Diego", city: "La Jolla", stateAbbr: "CA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "EnVision Arts & Engineering Maker Studio", hasITAR: true, hasPhD: true, founded: 1960, studentCount: 42875 },
  { slug: "asu", name: "Arizona State University", city: "Tempe", stateAbbr: "AZ", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "MakerLab + Peralta Makerspace", hasITAR: true, hasPhD: true, founded: 1885, studentCount: 74795 },
  { slug: "u-washington", name: "University of Washington", city: "Seattle", stateAbbr: "WA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "CoMotion MakerSpace", hasITAR: true, hasPhD: true, founded: 1861, studentCount: 47576 },
  { slug: "u-wisconsin-madison", name: "University of Wisconsin-Madison", city: "Madison", stateAbbr: "WI", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Grainger Engineering Design Innovation Lab", hasITAR: true, hasPhD: true, founded: 1848, studentCount: 47932 },
  { slug: "u-minnesota", name: "University of Minnesota", city: "Minneapolis", stateAbbr: "MN", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Anderson Student Innovation Labs", hasITAR: true, hasPhD: true, founded: 1851, studentCount: 54890 },
  { slug: "ohio-state", name: "Ohio State University", city: "Columbus", stateAbbr: "OH", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Innovation Studio + Buckeye Space Launch Initiative", hasITAR: true, hasPhD: true, founded: 1870, studentCount: 60540 },
  { slug: "u-florida", name: "University of Florida", city: "Gainesville", stateAbbr: "FL", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Infinity Fab Lab", hasITAR: true, hasPhD: true, founded: 1853, studentCount: 55211 },
  { slug: "u-maryland", name: "University of Maryland, College Park", city: "College Park", stateAbbr: "MD", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Terrapin Works", hasITAR: true, hasPhD: true, founded: 1856, studentCount: 40709 },
  { slug: "north-carolina-state", name: "North Carolina State University", city: "Raleigh", stateAbbr: "NC", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "D.H. Hill Library Makerspace + Entrepreneurship Garage", hasITAR: true, hasPhD: true, founded: 1887, studentCount: 37000 },
  { slug: "u-colorado-boulder", name: "University of Colorado Boulder", city: "Boulder", stateAbbr: "CO", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Idea Forge", hasITAR: true, hasPhD: true, founded: 1876, studentCount: 39191 },
  { slug: "boston-university", name: "Boston University", city: "Boston", stateAbbr: "MA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "BU Engineering Product Innovation Center (EPIC)", hasITAR: true, hasPhD: true, founded: 1839, studentCount: 37557 },
  { slug: "case-western-reserve", name: "Case Western Reserve University", city: "Cleveland", stateAbbr: "OH", type: "university", hasEngineering: true, makerspace: "Sears think[box]", hasITAR: true, hasPhD: true, founded: 1826, studentCount: 12201 },
  { slug: "drexel-university", name: "Drexel University", city: "Philadelphia", stateAbbr: "PA", type: "university", hasEngineering: true, makerspace: "ExCITe Center + IDEAS Studio", hasITAR: true, hasPhD: true, founded: 1891, studentCount: 22587 },
  { slug: "vanderbilt-university", name: "Vanderbilt University", city: "Nashville", stateAbbr: "TN", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Wond'ry", hasITAR: true, hasPhD: true, founded: 1873, studentCount: 13710 },
  { slug: "rice-university", name: "Rice University", city: "Houston", stateAbbr: "TX", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Oshman Engineering Design Kitchen (OEDK)", hasITAR: true, hasPhD: true, founded: 1912, studentCount: 8620 },
  { slug: "brown-university", name: "Brown University", city: "Providence", stateAbbr: "RI", type: "university", hasEngineering: true, makerspace: "BDW Design Workshop", hasITAR: true, hasPhD: true, founded: 1764, studentCount: 10696 },
  { slug: "yale-university", name: "Yale University", city: "New Haven", stateAbbr: "CT", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "Yale CEID Center for Engineering Innovation & Design", hasITAR: true, hasPhD: true, founded: 1701, studentCount: 14776 },
  { slug: "harvard-university", name: "Harvard University", city: "Cambridge", stateAbbr: "MA", type: "university", hasEngineering: true, engineeringRankTop50: true, makerspace: "SEAS Active Learning Labs", hasITAR: true, hasPhD: true, founded: 1636, studentCount: 23731 },
  { slug: "u-notre-dame", name: "University of Notre Dame", city: "Notre Dame", stateAbbr: "IN", type: "university", hasEngineering: true, makerspace: "Innovation Park + Wilson Sheehan Lab", hasITAR: true, hasPhD: true, founded: 1842, studentCount: 12683 },
  { slug: "u-pittsburgh", name: "University of Pittsburgh", city: "Pittsburgh", stateAbbr: "PA", type: "university", hasEngineering: true, makerspace: "Swanson School Makerspace", hasITAR: true, hasPhD: true, founded: 1787, studentCount: 34934 },
  { slug: "u-massachusetts-amherst", name: "University of Massachusetts Amherst", city: "Amherst", stateAbbr: "MA", type: "university", hasEngineering: true, makerspace: "M5 Makerspace + IALS", hasITAR: true, hasPhD: true, founded: 1863, studentCount: 32229 },
];

// Research labs / national labs — for /education/research-lab/[slug]
export const RESEARCH_LABS: School[] = [
  { slug: "nasa-jpl", name: "NASA Jet Propulsion Laboratory (JPL)", city: "Pasadena", stateAbbr: "CA", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "nasa-ames", name: "NASA Ames Research Center", city: "Mountain View", stateAbbr: "CA", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "nasa-glenn", name: "NASA Glenn Research Center", city: "Cleveland", stateAbbr: "OH", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "nasa-goddard", name: "NASA Goddard Space Flight Center", city: "Greenbelt", stateAbbr: "MD", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "nasa-marshall", name: "NASA Marshall Space Flight Center", city: "Huntsville", stateAbbr: "AL", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "sandia-national-labs", name: "Sandia National Laboratories", city: "Albuquerque", stateAbbr: "NM", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "los-alamos", name: "Los Alamos National Laboratory", city: "Los Alamos", stateAbbr: "NM", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "lawrence-livermore", name: "Lawrence Livermore National Laboratory", city: "Livermore", stateAbbr: "CA", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "oak-ridge", name: "Oak Ridge National Laboratory", city: "Oak Ridge", stateAbbr: "TN", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "argonne-national-lab", name: "Argonne National Laboratory", city: "Lemont", stateAbbr: "IL", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "idaho-national-lab", name: "Idaho National Laboratory", city: "Idaho Falls", stateAbbr: "ID", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "pacific-northwest", name: "Pacific Northwest National Laboratory (PNNL)", city: "Richland", stateAbbr: "WA", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "afrl-wright-patterson", name: "Air Force Research Laboratory (AFRL) — Wright-Patterson AFB", city: "Dayton", stateAbbr: "OH", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "naval-research-lab", name: "US Naval Research Laboratory", city: "Washington", stateAbbr: "DC", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "army-research-lab", name: "US Army Research Laboratory (ARL)", city: "Adelphi", stateAbbr: "MD", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "mit-lincoln-lab", name: "MIT Lincoln Laboratory", city: "Lexington", stateAbbr: "MA", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "jhu-apl", name: "Johns Hopkins Applied Physics Laboratory", city: "Laurel", stateAbbr: "MD", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
  { slug: "aerospace-corporation", name: "The Aerospace Corporation", city: "El Segundo", stateAbbr: "CA", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "mitre", name: "MITRE Corporation", city: "McLean", stateAbbr: "VA", type: "research-lab", hasEngineering: true, hasITAR: true },
  { slug: "rand-corporation", name: "RAND Corporation", city: "Santa Monica", stateAbbr: "CA", type: "research-lab", hasEngineering: true, hasITAR: true, hasPhD: true },
];

export const ALL_SCHOOLS: School[] = [...SCHOOLS, ...RESEARCH_LABS];

export const getSchoolBySlug = (slug: string) => ALL_SCHOOLS.find((s) => s.slug === slug);
export const getSchoolsByType = (type: School["type"]) => ALL_SCHOOLS.filter((s) => s.type === type);
export const getAllSchoolPaths = () => ALL_SCHOOLS.map((s) => ({ type: s.type, school: s.slug }));
