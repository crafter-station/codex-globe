export type Continent =
  | "North America"
  | "South America"
  | "Europe"
  | "Asia"
  | "Oceania"
  | "Africa";

export interface Ambassador {
  name: string;
  city: string;
  country: string;
  continent: Continent;
  timezone: string;
  lat: number;
  lng: number;
}

export const ambassadors: Ambassador[] = [
  { name: "Adam Chan", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194 },
  { name: "Agrim Singh", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198 },
  { name: "Aileen Villanueva", city: "Monterrey", country: "MX", continent: "North America", timezone: "UTC-6", lat: 25.6866, lng: -100.3161 },
  { name: "Alex Gavrilescu", city: "Vienna", country: "AT", continent: "Europe", timezone: "UTC+1", lat: 48.2082, lng: 16.3738 },
  { name: "Anirudh Kuchibhatla", city: "New York", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.7128, lng: -74.006 },
  { name: "Anish Navalgund", city: "Heilbronn", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 49.1427, lng: 9.2109 },
  { name: "Arafat Tehsin", city: "Sydney", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -33.8688, lng: 151.2093 },
  { name: "Ben Kim", city: "Mexico City", country: "MX", continent: "North America", timezone: "UTC-6", lat: 19.4326, lng: -99.1332 },
  { name: "Brian Chew", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198 },
  { name: "Carlos Catala", city: "Orlando", country: "US", continent: "North America", timezone: "UTC-5", lat: 28.5383, lng: -81.3792 },
  { name: "CHOI", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978 },
  { name: "Daniel Green", city: "Kansas City", country: "US", continent: "North America", timezone: "UTC-6", lat: 39.0997, lng: -94.5786 },
  { name: "David Marquez", city: "Manila", country: "PH", continent: "Asia", timezone: "UTC+8", lat: 14.5995, lng: 120.9842 },
  { name: "Dr Sam Donegan", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631 },
  { name: "Guilherme Tavares Monteiro", city: "Goiania", country: "BR", continent: "South America", timezone: "UTC-3", lat: -16.6869, lng: -49.2648 },
  { name: "Hetarth Parikh", city: "Toronto", country: "CA", continent: "North America", timezone: "UTC-5", lat: 43.6532, lng: -79.3832 },
  { name: "Israel J. Gomez", city: "Manta", country: "EC", continent: "South America", timezone: "UTC-5", lat: -0.9498, lng: -80.7089 },
  { name: "Iz Tecum", city: "New York", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.7128, lng: -74.006 },
  { name: "Jan Chen", city: "Munich", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.1351, lng: 11.582 },
  { name: "Jhin Lee", city: "Montreal", country: "CA", continent: "North America", timezone: "UTC-5", lat: 45.5017, lng: -73.5673 },
  { name: "Joseph Paul Caparas", city: "Auckland", country: "NZ", continent: "Oceania", timezone: "UTC+13", lat: -36.8485, lng: 174.7633 },
  { name: "Junho Kong", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978 },
  { name: "Justus Huneke", city: "Christchurch", country: "NZ", continent: "Oceania", timezone: "UTC+13", lat: -43.532, lng: 172.6306 },
  { name: "Kai Simpson-Sigurdson", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207 },
  { name: "Kasey Robinson", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631 },
  { name: "Kushal Vijay", city: "Hyderabad", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 17.385, lng: 78.4867 },
  { name: "Lee Mager", city: "London", country: "GB", continent: "Europe", timezone: "UTC+0", lat: 51.5074, lng: -0.1278 },
  { name: "Leonard Gofman", city: "Orlando", country: "US", continent: "North America", timezone: "UTC-5", lat: 28.5383, lng: -81.3792 },
  { name: "Leonardo Vida", city: "Amsterdam", country: "NL", continent: "Europe", timezone: "UTC+1", lat: 52.3676, lng: 4.9041 },
  { name: "Matteo Giorgetti", city: "Madrid", country: "ES", continent: "Europe", timezone: "UTC+1", lat: 40.4168, lng: -3.7038 },
  { name: "Matthew Blode", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631 },
  { name: "Maximiliano Firtman", city: "Buenos Aires", country: "AR", continent: "South America", timezone: "UTC-3", lat: -34.6037, lng: -58.3816 },
  { name: "Mayank Raj", city: "Bangalore", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 12.9716, lng: 77.5946 },
  { name: "Michael Gritzbach", city: "Cambridge", country: "US", continent: "North America", timezone: "UTC-5", lat: 42.3736, lng: -71.1097 },
  { name: "Michael Rusu", city: "Orlando", country: "US", continent: "North America", timezone: "UTC-5", lat: 28.5383, lng: -81.3792 },
  { name: "Miguel", city: "Barcelona", country: "ES", continent: "Europe", timezone: "UTC+1", lat: 41.3874, lng: 2.1686 },
  { name: "Mike Grabowski", city: "Berlin", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 52.52, lng: 13.405 },
  { name: "Muhtasham Oblokulov", city: "Munich", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.1351, lng: 11.582 },
  { name: "Parampreet Singh", city: "New Delhi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 28.6139, lng: 77.209 },
  { name: "Piyalitt Ittichaiwong", city: "Bangkok", country: "TH", continent: "Asia", timezone: "UTC+7", lat: 13.7563, lng: 100.5018 },
  { name: "Raghu Subramanian", city: "Austin", country: "US", continent: "North America", timezone: "UTC-6", lat: 30.2672, lng: -97.7431 },
  { name: "Railly Hugo", city: "Lima", country: "PE", continent: "South America", timezone: "UTC-5", lat: -12.0464, lng: -77.0428 },
  { name: "Raiyan Yahya", city: "Gothenburg", country: "SE", continent: "Europe", timezone: "UTC+1", lat: 57.7089, lng: 11.9746 },
  { name: "Rogier Muller", city: "Amsterdam", country: "NL", continent: "Europe", timezone: "UTC+1", lat: 52.3676, lng: 4.9041 },
  { name: "Seowoo Han", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978 },
  { name: "Shawn", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207 },
  { name: "Shivay Lamba", city: "New Delhi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 28.6139, lng: 77.209 },
  { name: "Sigrid Jin", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978 },
  { name: "Siow Yen Chong", city: "Kuala Lumpur", country: "MY", continent: "Asia", timezone: "UTC+8", lat: 3.139, lng: 101.6869 },
  { name: "Sriram Kiron", city: "West Lafayette", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.4259, lng: -86.9081 },
  { name: "TatianaSF.com", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194 },
  { name: "Tyler Xiao", city: "Los Angeles", country: "US", continent: "North America", timezone: "UTC-8", lat: 34.0522, lng: -118.2437 },
  { name: "Vaishakh Suresh", city: "Kochi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 9.9312, lng: 76.2673 },
  { name: "Wenceslao", city: "Las Palmas", country: "ES", continent: "Europe", timezone: "UTC+0", lat: 28.1235, lng: -15.4363 },
  { name: "Woojun Jung", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978 },
  { name: "Yashraj Nayak", city: "Bengaluru", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 12.9716, lng: 77.5946 },
  { name: "Yogesh Singh", city: "Mumbai", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 19.076, lng: 72.8777 },
  { name: "Yuta Hayashi", city: "Tokyo", country: "JP", continent: "Asia", timezone: "UTC+9", lat: 35.6762, lng: 139.6503 },
  { name: "Jeffrey Zhou", city: "Cambridge", country: "US", continent: "North America", timezone: "UTC-5", lat: 42.3736, lng: -71.1097 },
  { name: "Mahesh Karthikeyan", city: "Fremont", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.5485, lng: -121.9886 },
  { name: "Mert Gulsun", city: "Berkeley", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.8715, lng: -122.2730 },
  { name: "Jane Chao", city: "New Taipei City", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 25.0120, lng: 121.4654 },
  { name: "Kuu (Kume Fumiya)", city: "Tokyo", country: "JP", continent: "Asia", timezone: "UTC+9", lat: 35.6762, lng: 139.6503 },
  { name: "Saurabh Suri", city: "Toronto", country: "CA", continent: "North America", timezone: "UTC-5", lat: 43.6532, lng: -79.3832 },
  { name: "Artur Wala", city: "Warsaw", country: "PL", continent: "Europe", timezone: "UTC+1", lat: 52.2297, lng: 21.0122 },
  { name: "David Finsterwalder", city: "Goeppingen", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.7025, lng: 9.6528 },
  { name: "Ayush Srivastava", city: "Ahmedabad", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 23.0225, lng: 72.5714 },
  { name: "Andrew Qu", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194 },
  { name: "Liudmila Joukovskaya", city: "Cambridge", country: "GB", continent: "Europe", timezone: "UTC+0", lat: 52.2053, lng: 0.1218 },
  { name: "Kaspar Hidayat", city: "Jakarta", country: "ID", continent: "Asia", timezone: "UTC+7", lat: -6.2088, lng: 106.8456 },
  { name: "Rebecca Hu", city: "New York", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.7128, lng: -74.006 },
  { name: "Jay Park", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207 },
  { name: "Ramona", city: "Toronto", country: "CA", continent: "North America", timezone: "UTC-5", lat: 43.6532, lng: -79.3832 },
  { name: "Brendan Beh", city: "Kuala Lumpur", country: "MY", continent: "Asia", timezone: "UTC+8", lat: 3.139, lng: 101.6869 },
  { name: "Tom Yang", city: "Taipei", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 25.0330, lng: 121.5654 },
  { name: "Mateo Kruk", city: "Montevideo", country: "UY", continent: "South America", timezone: "UTC-3", lat: -34.9011, lng: -56.1645 },
  { name: "An Nguyen", city: "Ho Chi Minh City", country: "VN", continent: "Asia", timezone: "UTC+7", lat: 10.8231, lng: 106.6297 },
  { name: "Harry Ng", city: "Taichung City", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 24.1477, lng: 120.6736 },
  { name: "Son Le Thanh", city: "Ho Chi Minh City", country: "VN", continent: "Asia", timezone: "UTC+7", lat: 10.8231, lng: 106.6297 },
  { name: "Zane Chee", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198 },
  { name: "Glaucia Lemos", city: "Rio de Janeiro", country: "BR", continent: "South America", timezone: "UTC-3", lat: -22.9068, lng: -43.1729 },
];

export const continents: Continent[] = [
  "North America",
  "South America",
  "Europe",
  "Asia",
  "Oceania",
];

export const stats = {
  totalMembers: 104,
  ambassadorsWithCity: ambassadors.length,
  countries: [...new Set(ambassadors.map((a) => a.country))].length,
  cities: [...new Set(ambassadors.map((a) => a.city))].length,
};
