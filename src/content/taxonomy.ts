export type { ServiceTitle, IndustryTitle } from "@/content/excel-taxonomy";
export { SERVICE_TITLES, INDUSTRY_TITLES } from "@/content/excel-taxonomy";

export type ProjectStatus = "Ongoing" | "Completed";

export type Project = {
  id: string;
  name: string;
  city: string;
  state: string;
  location: string;
  value: string;
  valueM: number;
  epcPartner?: string;
  startYear?: string;
  endYear?: string;
  status: ProjectStatus;
  services: string[];
  industries: string[];
  scopeServices: string[];
  image: string;
  featured?: boolean;
};

const STATE_ALIASES: Record<string, string> = {
  up: "Uttar Pradesh",
  "andhra pradesh": "Andhra Pradesh",
  "tamil nadu": "Tamil Nadu",
  gujarat: "Gujarat",
  haryana: "Haryana",
  karnataka: "Karnataka",
  maharashtra: "Maharashtra",
  rajasthan: "Rajasthan",
  telangana: "Telangana",
};

const CITY_ALIASES: Record<string, string> = {
  "sri city": "Sri City",
  gurgugram: "Gurugram",
  "kosi kala": "Kosi Kala",
  "sambhaji nagar": "Sambhaji Nagar",
  locarion: "",
};

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function normalizeState(state: string) {
  const trimmed = state.trim();
  if (!trimmed || trimmed.toLowerCase() === "state") return "";
  return STATE_ALIASES[trimmed.toLowerCase()] ?? titleCase(trimmed);
}

export function normalizeCity(city: string) {
  const trimmed = city.trim();
  if (!trimmed) return "";
  const alias = CITY_ALIASES[trimmed.toLowerCase()];
  if (alias !== undefined) return alias;
  return titleCase(trimmed);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatProjectValue(valueM: number) {
  return `${valueM} M INR`;
}

export function buildLocation(city: string, state: string) {
  if (city && state) return `${city}, ${state}`;
  return city || state;
}
