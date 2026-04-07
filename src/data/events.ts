import type { Continent } from "./ambassadors";

export type EventType = "meetup" | "hackathon";

export interface CodexEvent {
  name: string;
  city: string;
  country: string;
  continent: Continent;
  timezone: string;
  lat: number;
  lng: number;
  date: string;
  type: EventType;
  organizer: string;
  url: string;
}

export const events: CodexEvent[] = [
  { name: "Cerebras Cafe Compute", city: "London", country: "GB", continent: "Europe", timezone: "UTC+0", lat: 51.5074, lng: -0.1278, date: "Apr 7", type: "meetup", organizer: "Cerebras & OpenAI", url: "https://luma.com/cclondon26" },
  { name: "Community Meetup", city: "Taichung", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 24.1477, lng: 120.6736, date: "Apr 7", type: "meetup", organizer: "Harry Ng", url: "https://luma.com/ub3r326p?utm_source=oaidevs" },
  { name: "Community Meetup", city: "Mexico City", country: "MX", continent: "North America", timezone: "UTC-6", lat: 19.4326, lng: -99.1332, date: "Apr 8", type: "meetup", organizer: "Ben Kim & Javier Rivero", url: "https://luma.com/suipk589?utm_source=oaidevs" },
  { name: "Community Meetup", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978, date: "Apr 9", type: "meetup", organizer: "Junho Kong & Woojun Jung", url: "https://luma.com/64ztqype" },
  { name: "Community Meetup", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207, date: "Apr 10", type: "meetup", organizer: "Shawn Esquivel & Sigrid Jin", url: "https://luma.com/q6zzjebm?utm_source=oaidevs" },
  { name: "Community Meetup", city: "West Lafayette", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.4259, lng: -86.9081, date: "Apr 11", type: "meetup", organizer: "Sriram Kiron", url: "https://bento.purduehackers.com/" },
  { name: "Community Meetup", city: "Krakow", country: "PL", continent: "Europe", timezone: "UTC+1", lat: 50.0647, lng: 19.945, date: "Apr 14", type: "meetup", organizer: "Mike Grabowski", url: "https://luma.com/rxayfkyp?utm_source=oaidevs" },
  { name: "Codex Hackathon", city: "Bengaluru", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 12.9716, lng: 77.5946, date: "Apr 16", type: "hackathon", organizer: "OpenAI", url: "https://luma.com/x495vdw1?utm_source=oaidevs" },
  { name: "Community Meetup", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194, date: "Apr 16", type: "meetup", organizer: "Tatiana", url: "https://luma.com/x4zr22kb?utm_source=oaidevs" },
  { name: "Community Hackathon", city: "Munich", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.1351, lng: 11.582, date: "Apr 18", type: "hackathon", organizer: "Jan", url: "https://luma.com/pvtcprxu?utm_source=oaidevs" },
  { name: "Community Hackathon", city: "New Delhi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 28.6139, lng: 77.209, date: "Apr 18", type: "hackathon", organizer: "Shivay Lamba", url: "https://luma.com/rjsbm9qw?utm_source=oaidevs" },
  { name: "Community Hackathon", city: "Vienna", country: "AT", continent: "Europe", timezone: "UTC+1", lat: 48.2082, lng: 16.3738, date: "Apr 18", type: "hackathon", organizer: "Alex Gavrilescu", url: "https://luma.com/18ivobmb?utm_source=oaidevs" },
  { name: "Community Meetup", city: "Ho Chi Minh City", country: "VN", continent: "Asia", timezone: "UTC+7", lat: 10.8231, lng: 106.6297, date: "Apr 18", type: "meetup", organizer: "Son Le", url: "https://ho-chi-minh-city.aitinkerers.org/p/ai-tinkerers-ho-chi-minh-city-ai-coding-agents-orchestrators" },
  { name: "Community Hackathon", city: "Tokyo", country: "JP", continent: "Asia", timezone: "UTC+9", lat: 35.6762, lng: 139.6503, date: "Apr 24", type: "hackathon", organizer: "Thomas Jeng & DEEPCORE", url: "https://luma.com/8pcnel6z?utm_source=oaidevs" },
  { name: "Community Meetup", city: "Vienna", country: "AT", continent: "Europe", timezone: "UTC+1", lat: 48.2082, lng: 16.3738, date: "Apr 27", type: "meetup", organizer: "Alex Gavrilescu", url: "https://luma.com/dodmnb0n?utm_source=oaidevs" },
  { name: "Codex Hackathon", city: "Sydney", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -33.8688, lng: 151.2093, date: "Apr 29", type: "hackathon", organizer: "OpenAI", url: "https://luma.com/or8icykr?utm_source=oaidevs" },
  { name: "Community Meetup", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631, date: "Apr 30", type: "meetup", organizer: "Sam Donegan", url: "https://luma.com/yhc5wr8h?utm_source=oaidevs" },
  { name: "Community Hackathon", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198, date: "May 8", type: "hackathon", organizer: "GoodHub", url: "https://hack.goodhubsea.org/" },
  { name: "Community Meetup", city: "Munich", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.1351, lng: 11.582, date: "May 18", type: "meetup", organizer: "Muhtasham Oblokulov", url: "https://luma.com/mlwz2l3r?utm_source=oaidevs" },
];

export const eventTypes: EventType[] = ["meetup", "hackathon"];

export const eventStats = {
  total: events.length,
  meetups: events.filter((e) => e.type === "meetup").length,
  hackathons: events.filter((e) => e.type === "hackathon").length,
  countries: [...new Set(events.map((e) => e.country))].length,
  cities: [...new Set(events.map((e) => e.city))].length,
};
