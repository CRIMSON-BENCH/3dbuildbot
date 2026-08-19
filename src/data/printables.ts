// Free printables — catalog of downloadable STL files with a "Get printed
// and shipped for $X" CTA. Massive SEO play targeting "free stl [X]" queries.
// The `stlUrl` is a placeholder — the initial catalog is populated with
// well-known free-designs categories; when we drop in real hosted files
// they replace these entries. Each entry generates a route + shows in the
// browse page.

export interface Printable {
  slug: string;
  name: string;
  category: "organizers" | "tools" | "household" | "toys" | "gadgets" | "office" | "kitchen" | "garage" | "outdoor" | "educational";
  description: string;
  volumeCm3Approx: number;
  bboxMmApprox: { x: number; y: number; z: number };
  suggestedMaterial: string;
  printTimeHours: number;
  difficulty: "easy" | "medium" | "hard";
  stlUrl?: string; // when populated, allow direct download
  keywords: string;
}

export const PRINTABLES: Printable[] = [
  // Organizers (12)
  { slug: "desk-cable-clip", name: "Desk cable management clip", category: "organizers", description: "Snap-fit clip for routing 2-3 cables under a desk edge — no adhesive.", volumeCm3Approx: 5, bboxMmApprox: { x: 40, y: 20, z: 15 }, suggestedMaterial: "PLA or PETG", printTimeHours: 0.5, difficulty: "easy", keywords: "cable clip desk organizer FDM" },
  { slug: "drawer-divider-adjustable", name: "Adjustable drawer divider", category: "organizers", description: "Interlocking divider bars for kitchen/office drawers.", volumeCm3Approx: 30, bboxMmApprox: { x: 200, y: 50, z: 40 }, suggestedMaterial: "PLA", printTimeHours: 3, difficulty: "easy", keywords: "drawer divider organizer" },
  { slug: "cord-organizer-box", name: "Cord organizer box", category: "organizers", description: "Hides power strip + spare cables with a cutout for airflow.", volumeCm3Approx: 120, bboxMmApprox: { x: 300, y: 150, z: 80 }, suggestedMaterial: "PETG", printTimeHours: 12, difficulty: "medium", keywords: "cord organizer power strip" },
  { slug: "spice-rack-magnet", name: "Magnetic spice rack tin", category: "organizers", description: "Small tins with magnetic base — stick to fridge.", volumeCm3Approx: 25, bboxMmApprox: { x: 60, y: 60, z: 40 }, suggestedMaterial: "PLA (food-safe grade)", printTimeHours: 2.5, difficulty: "easy", keywords: "magnetic spice rack" },
  { slug: "pegboard-pen-holder", name: "Pegboard pen holder", category: "organizers", description: "Slot for 8 pens/tools, mounts to standard 1/4in pegboard.", volumeCm3Approx: 40, bboxMmApprox: { x: 120, y: 40, z: 80 }, suggestedMaterial: "PLA", printTimeHours: 3, difficulty: "easy", keywords: "pegboard pen holder" },
  { slug: "sd-card-caddy", name: "SD card + microSD caddy", category: "organizers", description: "Holds 8 SD + 12 microSD cards in a labeled case.", volumeCm3Approx: 20, bboxMmApprox: { x: 90, y: 55, z: 15 }, suggestedMaterial: "PLA", printTimeHours: 1.5, difficulty: "easy", keywords: "sd card holder caddy" },
  { slug: "airpods-holder-desk", name: "AirPods desk holder", category: "organizers", description: "Slot holder for AirPods case, weighted base.", volumeCm3Approx: 15, bboxMmApprox: { x: 60, y: 60, z: 30 }, suggestedMaterial: "PLA", printTimeHours: 1.2, difficulty: "easy", keywords: "airpods holder desk" },
  { slug: "toothbrush-holder", name: "Wall-mount toothbrush holder", category: "organizers", description: "Holds 3 toothbrushes, mounts via 3M adhesive strip.", volumeCm3Approx: 20, bboxMmApprox: { x: 100, y: 40, z: 40 }, suggestedMaterial: "PETG (bathroom humidity)", printTimeHours: 2, difficulty: "easy", keywords: "toothbrush holder wall" },
  { slug: "modular-bin-stackable", name: "Stackable modular bin", category: "organizers", description: "Interlocking bins for hardware/tools/craft supplies.", volumeCm3Approx: 80, bboxMmApprox: { x: 150, y: 100, z: 60 }, suggestedMaterial: "PLA", printTimeHours: 6, difficulty: "easy", keywords: "stackable bin modular" },
  { slug: "makeup-brush-organizer", name: "Makeup brush organizer", category: "organizers", description: "Bee-hive style holder for 12 brushes with drainage.", volumeCm3Approx: 45, bboxMmApprox: { x: 120, y: 120, z: 80 }, suggestedMaterial: "PLA", printTimeHours: 4, difficulty: "easy", keywords: "makeup brush organizer" },
  { slug: "coin-sorter-tray", name: "Coin sorter tray", category: "organizers", description: "5-compartment tray for sorting US coins by denomination.", volumeCm3Approx: 30, bboxMmApprox: { x: 150, y: 80, z: 25 }, suggestedMaterial: "PLA", printTimeHours: 2.5, difficulty: "easy", keywords: "coin sorter tray" },
  { slug: "credit-card-wallet-slim", name: "Slim credit-card wallet", category: "organizers", description: "3-slot minimalist wallet, fits front pocket.", volumeCm3Approx: 12, bboxMmApprox: { x: 90, y: 60, z: 8 }, suggestedMaterial: "PETG", printTimeHours: 1, difficulty: "easy", keywords: "slim wallet cardholder" },
  // Tools (10)
  { slug: "hex-key-organizer", name: "Hex key organizer stand", category: "tools", description: "Numbered holder for imperial + metric hex keys.", volumeCm3Approx: 25, bboxMmApprox: { x: 120, y: 60, z: 40 }, suggestedMaterial: "PLA", printTimeHours: 2, difficulty: "easy", keywords: "hex key allen wrench organizer" },
  { slug: "socket-wrench-tray", name: "Socket wrench tray (1/4 + 3/8)", category: "tools", description: "Tray with labeled slots for 32 sockets across two drive sizes.", volumeCm3Approx: 60, bboxMmApprox: { x: 250, y: 100, z: 30 }, suggestedMaterial: "PETG", printTimeHours: 5, difficulty: "medium", keywords: "socket wrench organizer" },
  { slug: "drill-bit-organizer", name: "Drill bit index organizer", category: "tools", description: "Numbered holes for imperial 1/16in to 1/2in drill bits.", volumeCm3Approx: 50, bboxMmApprox: { x: 180, y: 100, z: 40 }, suggestedMaterial: "PLA", printTimeHours: 4, difficulty: "easy", keywords: "drill bit index" },
  { slug: "clamp-hanger-workshop", name: "Workshop clamp hanger", category: "tools", description: "Wall-mount rack for 6 spring clamps or C-clamps.", volumeCm3Approx: 45, bboxMmApprox: { x: 300, y: 80, z: 60 }, suggestedMaterial: "PETG", printTimeHours: 4, difficulty: "easy", keywords: "clamp hanger workshop" },
  { slug: "phone-tripod-adapter", name: "Phone tripod adapter", category: "tools", description: "1/4-20 tripod mount that clamps to phones 60-90mm wide.", volumeCm3Approx: 25, bboxMmApprox: { x: 100, y: 70, z: 25 }, suggestedMaterial: "PETG", printTimeHours: 2, difficulty: "medium", keywords: "phone tripod adapter" },
  { slug: "hose-nozzle-hanger", name: "Hose nozzle wall hanger", category: "tools", description: "Weather-resistant hanger for garden hose nozzles.", volumeCm3Approx: 35, bboxMmApprox: { x: 100, y: 60, z: 80 }, suggestedMaterial: "ASA or PETG (UV)", printTimeHours: 3, difficulty: "easy", keywords: "hose nozzle hanger garden" },
  { slug: "workshop-hook", name: "Workshop hook (200g rated)", category: "tools", description: "Screws into wall stud, holds up to 200g of tools.", volumeCm3Approx: 15, bboxMmApprox: { x: 60, y: 30, z: 40 }, suggestedMaterial: "PETG or ABS", printTimeHours: 1, difficulty: "easy", keywords: "workshop hook wall" },
  { slug: "measuring-tape-holder", name: "Measuring tape belt holder", category: "tools", description: "Belt clip holder for a 25ft tape measure.", volumeCm3Approx: 20, bboxMmApprox: { x: 80, y: 50, z: 30 }, suggestedMaterial: "PETG", printTimeHours: 1.5, difficulty: "easy", keywords: "tape measure belt holder" },
  { slug: "spool-holder-universal", name: "Universal filament spool holder", category: "tools", description: "Roller-bearing holder for any spool 50-200mm wide.", volumeCm3Approx: 70, bboxMmApprox: { x: 250, y: 120, z: 100 }, suggestedMaterial: "PETG", printTimeHours: 6, difficulty: "medium", keywords: "filament spool holder" },
  { slug: "raspi-case-vented", name: "Raspberry Pi 5 vented case", category: "tools", description: "Snap-fit case with heat sink cutout and GPIO access.", volumeCm3Approx: 45, bboxMmApprox: { x: 100, y: 70, z: 30 }, suggestedMaterial: "PETG", printTimeHours: 3.5, difficulty: "medium", keywords: "raspberry pi 5 case" },
  // Household (10)
  { slug: "curtain-rod-bracket", name: "Curtain rod bracket", category: "household", description: "Bracket for 1in curtain rod, drywall anchor pattern.", volumeCm3Approx: 25, bboxMmApprox: { x: 80, y: 60, z: 50 }, suggestedMaterial: "PETG", printTimeHours: 2, difficulty: "easy", keywords: "curtain rod bracket" },
  { slug: "door-stopper-wedge", name: "Door stopper wedge", category: "household", description: "TPU wedge for standard interior doors, non-marking.", volumeCm3Approx: 20, bboxMmApprox: { x: 80, y: 40, z: 20 }, suggestedMaterial: "TPU 95A", printTimeHours: 2, difficulty: "easy", keywords: "door stopper wedge" },
  { slug: "shower-caddy-hook", name: "Shower caddy hook", category: "household", description: "Over-the-showerhead hook for extra loofah/washcloth.", volumeCm3Approx: 15, bboxMmApprox: { x: 60, y: 40, z: 30 }, suggestedMaterial: "PETG", printTimeHours: 1, difficulty: "easy", keywords: "shower caddy hook" },
  { slug: "keychain-multitool", name: "Keychain multitool", category: "household", description: "Bottle opener + screwdriver + hex driver in one keyfob.", volumeCm3Approx: 10, bboxMmApprox: { x: 60, y: 20, z: 5 }, suggestedMaterial: "PLA", printTimeHours: 0.8, difficulty: "easy", keywords: "keychain multitool" },
  { slug: "cable-labels-clip", name: "Cable identification clip", category: "household", description: "Snap-on labels for identifying charging cables.", volumeCm3Approx: 3, bboxMmApprox: { x: 25, y: 15, z: 8 }, suggestedMaterial: "PLA", printTimeHours: 0.3, difficulty: "easy", keywords: "cable label clip" },
  { slug: "picture-frame-desktop", name: "Desktop picture frame (4x6)", category: "household", description: "Standing frame for 4x6 photos, tilt-adjustable.", volumeCm3Approx: 30, bboxMmApprox: { x: 150, y: 100, z: 20 }, suggestedMaterial: "PLA", printTimeHours: 2.5, difficulty: "easy", keywords: "picture frame desktop 4x6" },
  { slug: "planter-succulent-hex", name: "Hexagonal succulent planter", category: "household", description: "Modular hexagonal planter with drainage hole.", volumeCm3Approx: 90, bboxMmApprox: { x: 100, y: 100, z: 70 }, suggestedMaterial: "PLA", printTimeHours: 8, difficulty: "easy", keywords: "hexagonal succulent planter" },
  { slug: "remote-control-holder", name: "Remote control caddy", category: "household", description: "3-slot holder for TV/AC/media remotes.", volumeCm3Approx: 45, bboxMmApprox: { x: 200, y: 100, z: 50 }, suggestedMaterial: "PLA", printTimeHours: 4, difficulty: "easy", keywords: "remote control caddy" },
  { slug: "trash-bag-dispenser", name: "Wall trash bag dispenser", category: "household", description: "Dispenses roll of 30-gal trash bags.", volumeCm3Approx: 80, bboxMmApprox: { x: 200, y: 60, z: 60 }, suggestedMaterial: "PETG", printTimeHours: 7, difficulty: "medium", keywords: "trash bag dispenser wall" },
  { slug: "iphone-dock-charging", name: "iPhone charging dock", category: "household", description: "MagSafe-compatible dock, cable routing underneath.", volumeCm3Approx: 60, bboxMmApprox: { x: 100, y: 80, z: 30 }, suggestedMaterial: "PETG", printTimeHours: 5, difficulty: "medium", keywords: "iphone magsafe dock" },
];

export const printablesByCategory = (cat: Printable["category"]) => PRINTABLES.filter((p) => p.category === cat);
export const getPrintableBySlug = (slug: string) => PRINTABLES.find((p) => p.slug === slug);
