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
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  threads?: string;
}

export const ambassadors: Ambassador[] = [
  { name: "Adam Chan", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194, github: "itsajchan", twitter: "itsajchan", linkedin: "https://www.linkedin.com/in/itsajchan", website: "https://ajchan.io/" },
  { name: "Agrim Singh", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198, github: "agrimsingh", twitter: "agrimsingh", linkedin: "https://sg.linkedin.com/in/agrims", website: "https://www.codewithai.xyz/" },
  { name: "Aileen Villanueva", city: "Monterrey", country: "MX", continent: "North America", timezone: "UTC-6", lat: 25.6866, lng: -100.3161, github: "aileenvl", twitter: "aileenvl", linkedin: "https://www.linkedin.com/in/aileen-villanueva-31155666/", website: "https://www.aileenvl.com/" },
  { name: "Alex Gavrilescu", city: "Vienna", country: "AT", continent: "Europe", timezone: "UTC+1", lat: 48.2082, lng: 16.3738, github: "MrLesk", twitter: "mrlesk", linkedin: "https://at.linkedin.com/in/alexandrugavrilescu", website: "https://mrlesk.com" },
  { name: "Anirudh Kuchibhatla", city: "New York", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.7128, lng: -74.006, github: "anirudhkuchibhatla", linkedin: "https://www.linkedin.com/in/anirudh-kuchibhatla", website: "https://anirudhkuchibhatla.com/" },
  { name: "Anish Navalgund", city: "Heilbronn", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 49.1427, lng: 9.2109, github: "AnishNavalgund", twitter: "NavalgundAnish", linkedin: "https://www.linkedin.com/in/anish-k-navalgund" },
  { name: "Arafat Tehsin", city: "Sydney", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -33.8688, lng: 151.2093, github: "arafattehsin", twitter: "arafattehsin", linkedin: "https://www.linkedin.com/in/arafattehsin/", website: "https://arafattehsin.com" },
  { name: "Ben Kim", city: "Mexico City", country: "MX", continent: "North America", timezone: "UTC-6", lat: 19.4326, lng: -99.1332, github: "benkimbuilds", twitter: "benkimbuilds", linkedin: "https://www.linkedin.com/in/benkimbuilds/", website: "http://ben-k.im/" },
  { name: "Brian Chew", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198, github: "bchewy", twitter: "brianchew", linkedin: "https://sg.linkedin.com/in/brian-chew", website: "https://bchewy.com" },
  { name: "Carlos Catala", city: "Orlando", country: "US", continent: "North America", timezone: "UTC-5", lat: 28.5383, lng: -81.3792, github: "cataladev", twitter: "cataladev", linkedin: "https://www.linkedin.com/in/cataladev", website: "https://catala.dev/" },
  { name: "CHOI", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978, twitter: "arrakis_ai", website: "https://www.genexisai.com" },
  { name: "Daniel Green", city: "Kansas City", country: "US", continent: "North America", timezone: "UTC-6", lat: 39.0997, lng: -94.5786, twitter: "dgrreen", linkedin: "https://linkedin.com/in/danielpgreen" },
  { name: "David Marquez", city: "Manila", country: "PH", continent: "Asia", timezone: "UTC+8", lat: 14.5995, lng: 120.9842, github: "dayvough", twitter: "dayvough", linkedin: "https://linkedin.com/in/dayvough", website: "http://dayvough.com" },
  { name: "Dr Sam Donegan", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631, twitter: "Sam_Donegan", linkedin: "https://www.linkedin.com/in/samueldonegan/" },
  { name: "Guilherme Tavares Monteiro", city: "Goiania", country: "BR", continent: "South America", timezone: "UTC-3", lat: -16.6869, lng: -49.2648, github: "tavaresgmg" },
  { name: "Hetarth Parikh", city: "Toronto", country: "CA", continent: "North America", timezone: "UTC-5", lat: 43.6532, lng: -79.3832, github: "HetarthP", linkedin: "https://ca.linkedin.com/in/hetarthparikh", website: "https://hetarthparikh.com/" },
  { name: "Israel J. Gomez", city: "Manta", country: "EC", continent: "South America", timezone: "UTC-5", lat: -0.9498, lng: -80.7089, github: "israelgo93", twitter: "Israelgo93", linkedin: "https://ec.linkedin.com/in/israelgo93" },
  { name: "Iz Tecum", city: "New York", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.7128, lng: -74.006, github: "iz-tecum", linkedin: "https://www.linkedin.com/in/israel-tramos", website: "https://iz-tecum.github.io/" },
  { name: "Jan Chen", city: "Munich", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.1351, lng: 11.582, linkedin: "https://www.linkedin.com/in/chen-jan" },
  { name: "Jhin Lee", city: "Montreal", country: "CA", continent: "North America", timezone: "UTC-5", lat: 45.5017, lng: -73.5673, github: "leehack", twitter: "leehack", linkedin: "https://www.linkedin.com/in/leehack", website: "https://leehack.com" },
  { name: "Joseph Paul Caparas", city: "Auckland", country: "NZ", continent: "Oceania", timezone: "UTC+13", lat: -36.8485, lng: 174.7633, github: "jpcaparas", twitter: "zenoware", linkedin: "https://nz.linkedin.com/in/jpcaparas", website: "https://jpcaparas.com" },
  { name: "Junho Kong", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978, linkedin: "https://kr.linkedin.com/in/junho-kong" },
  { name: "Justus Huneke", city: "Christchurch", country: "NZ", continent: "Oceania", timezone: "UTC+13", lat: -43.532, lng: 172.6306, github: "jsteagle", twitter: "jsteagle", linkedin: "https://nz.linkedin.com/in/justus-huneke", website: "https://www.jsteagle.dev/" },
  { name: "Kai Simpson-Sigurdson", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207 },
  { name: "Kasey Robinson", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631, github: "bitpixi", twitter: "bitpixi", linkedin: "https://www.linkedin.com/in/bitpixi/", website: "https://kasey.design" },
  { name: "Kushal Vijay", city: "Hyderabad", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 17.385, lng: 78.4867, github: "KushalVijay", twitter: "KushalVijay_", linkedin: "https://in.linkedin.com/in/kushalvijay" },
  { name: "Lee Mager", city: "London", country: "GB", continent: "Europe", timezone: "UTC+0", lat: 51.5074, lng: -0.1278, twitter: "Automager", linkedin: "https://uk.linkedin.com/in/lee-mager" },
  { name: "Leonard Gofman", city: "Orlando", country: "US", continent: "North America", timezone: "UTC-5", lat: 28.5383, lng: -81.3792, github: "gofman", linkedin: "https://www.linkedin.com/in/lgofman", website: "https://gofman.dev" },
  { name: "Leonardo Vida", city: "Amsterdam", country: "NL", continent: "Europe", timezone: "UTC+1", lat: 52.3676, lng: 4.9041, github: "leonardovida", twitter: "leonardojvida", linkedin: "https://nl.linkedin.com/in/leonardovida" },
  { name: "Matteo Giorgetti", city: "Madrid", country: "ES", continent: "Europe", timezone: "UTC+1", lat: 40.4168, lng: -3.7038, linkedin: "https://es.linkedin.com/in/matteo-giorgetti" },
  { name: "Matthew Blode", city: "Melbourne", country: "AU", continent: "Oceania", timezone: "UTC+11", lat: -37.8136, lng: 144.9631, github: "mblode", twitter: "mattblode", linkedin: "https://www.linkedin.com/in/matthewblode/", website: "https://matthewblode.com/" },
  { name: "Maximiliano Firtman", city: "Buenos Aires", country: "AR", continent: "South America", timezone: "UTC-3", lat: -34.6037, lng: -58.3816, github: "firtman", twitter: "firt", linkedin: "https://www.linkedin.com/in/firtman/", website: "https://firt.dev/" },
  { name: "Mayank Raj", city: "Bangalore", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 12.9716, lng: 77.5946, github: "rajmayank", twitter: "Mayank9856", linkedin: "https://in.linkedin.com/in/mayank9856", website: "https://mayankraj.com" },
  { name: "Michael Gritzbach", city: "Cambridge", country: "US", continent: "North America", timezone: "UTC-5", lat: 42.3736, lng: -71.1097, linkedin: "https://www.linkedin.com/in/michael-gritzbach", website: "https://michael-gritzbach.eu/" },
  { name: "Michael Rusu", city: "Orlando", country: "US", continent: "North America", timezone: "UTC-5", lat: 28.5383, lng: -81.3792, github: "Michael-RDev", twitter: "Tech_guyMike", linkedin: "https://www.linkedin.com/in/michael-rusudev", website: "https://www.michaelml.dev" },
  { name: "Miguel", city: "Barcelona", country: "ES", continent: "Europe", timezone: "UTC+1", lat: 41.3874, lng: 2.1686, github: "apolmig", twitter: "apolmig", linkedin: "https://www.linkedin.com/in/miguel-guerrero-prof" },
  { name: "Mike Grabowski", city: "Berlin", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 52.52, lng: 13.405, github: "grabbou", twitter: "grabbou", linkedin: "https://www.linkedin.com/in/grabbou" },
  { name: "Muhtasham Oblokulov", city: "Munich", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.1351, lng: 11.582, github: "Muhtasham", twitter: "Muhtasham9", linkedin: "https://de.linkedin.com/in/muhtasham", website: "https://muhtasham.github.io" },
  { name: "Parampreet Singh", city: "New Delhi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 28.6139, lng: 77.209, github: "Param302", twitter: "Param3021", linkedin: "https://www.linkedin.com/in/param31", website: "https://itsparam.in" },
  { name: "Piyalitt Ittichaiwong", city: "Bangkok", country: "TH", continent: "Asia", timezone: "UTC+7", lat: 13.7563, lng: 100.5018, github: "piyalitt", twitter: "piyalitt_i", linkedin: "https://uk.linkedin.com/in/piyalitt" },
  { name: "Raghu Subramanian", city: "Austin", country: "US", continent: "North America", timezone: "UTC-6", lat: 30.2672, lng: -97.7431 },
  { name: "Railly Hugo", city: "Lima", country: "PE", continent: "South America", timezone: "UTC-5", lat: -12.0464, lng: -77.0428, github: "Railly", twitter: "RaillyHugo", linkedin: "https://www.linkedin.com/in/railly-hugo", website: "https://railly.dev" },
  { name: "Raiyan Yahya", city: "Gothenburg", country: "SE", continent: "Europe", timezone: "UTC+1", lat: 57.7089, lng: 11.9746, github: "raiyanyahya", twitter: "raiyan_yahya", linkedin: "https://linkedin.com/in/raiyanyahya", website: "https://raiyanyahya.com" },
  { name: "Rogier Muller", city: "Amsterdam", country: "NL", continent: "Europe", timezone: "UTC+1", lat: 52.3676, lng: 4.9041 },
  { name: "Seowoo Han", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978, github: "swhan0329", twitter: "swhan0329", linkedin: "https://www.linkedin.com/in/swhan0329", website: "https://swhan0329.github.io/", threads: "impact_engineer" },
  { name: "Shawn", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207, github: "shawnesquivel", twitter: "shawnbuilds", linkedin: "https://www.linkedin.com/in/shawnesquivel/", website: "https://shawn-builds.com/" },
  { name: "Shivay Lamba", city: "New Delhi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 28.6139, lng: 77.209, github: "shivaylamba", twitter: "howdevelop", linkedin: "https://www.linkedin.com/in/shivaylamba", website: "https://shivaylamba.me/" },
  { name: "Sigrid Jin", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978, github: "sigridjineth", twitter: "sigridjineth", linkedin: "https://www.linkedin.com/in/sigridjineth/", website: "https://sigridjin.medium.com/" },
  { name: "Siow Yen Chong", city: "Kuala Lumpur", country: "MY", continent: "Asia", timezone: "UTC+8", lat: 3.139, lng: 101.6869, github: "SiowYenChong", linkedin: "https://www.linkedin.com/in/chongsiowyen/", website: "https://siowyenchong.vercel.app/" },
  { name: "Sriram Kiron", city: "West Lafayette", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.4259, lng: -86.9081 },
  { name: "TatianaSF.com", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194, github: "TatianaSF", linkedin: "https://www.linkedin.com/in/tatianasf/", website: "https://tatianasf.com" },
  { name: "Tyler Xiao", city: "Los Angeles", country: "US", continent: "North America", timezone: "UTC-8", lat: 34.0522, lng: -118.2437, github: "lordboba", twitter: "tylerxdev", linkedin: "https://www.linkedin.com/in/tyler-xiao", website: "https://www.tylerx.dev/" },
  { name: "Vaishakh Suresh", city: "Kochi", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 9.9312, lng: 76.2673, github: "vaishakh3", linkedin: "https://in.linkedin.com/in/vaishakh3" },
  { name: "Wenceslao", city: "Las Palmas", country: "ES", continent: "Europe", timezone: "UTC+0", lat: 28.1235, lng: -15.4363 },
  { name: "Woojun Jung", city: "Seoul", country: "KR", continent: "Asia", timezone: "UTC+9", lat: 37.5665, lng: 126.978, github: "w00jun", linkedin: "https://www.linkedin.com/in/w00jun" },
  { name: "Yashraj Nayak", city: "Bengaluru", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 12.9716, lng: 77.5946, github: "yashrajnayak", twitter: "yashrajnayak", linkedin: "https://www.linkedin.com/in/yashrajnayak/", website: "http://yashrajnayak.dev/" },
  { name: "Yogesh Singh", city: "Mumbai", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 19.076, lng: 72.8777 },
  { name: "Yuta Hayashi", city: "Tokyo", country: "JP", continent: "Asia", timezone: "UTC+9", lat: 35.6762, lng: 139.6503, github: "YutaUtah", linkedin: "https://jp.linkedin.com/in/yutahayashi", website: "https://yutautah.github.io/" },
  { name: "Jeffrey Zhou", city: "Cambridge", country: "US", continent: "North America", timezone: "UTC-5", lat: 42.3736, lng: -71.1097, github: "jsz-05", twitter: "jeffreyszhou", linkedin: "https://www.linkedin.com/in/jeffreyszhou/", website: "https://jeffreyszhou.com/" },
  { name: "Mahesh Karthikeyan", city: "Fremont", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.5485, lng: -121.9886, github: "klmahesh96", linkedin: "https://www.linkedin.com/in/maheshwarran-karthikeyan-668004105" },
  { name: "Mert Gulsun", city: "Berkeley", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.8715, lng: -122.2730, github: "setrf", twitter: "mert_gulsun", linkedin: "https://www.linkedin.com/in/mert-gulsun/", website: "https://mertgulsun.com/" },
  { name: "Jane Chao", city: "New Taipei City", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 25.0120, lng: 121.4654, github: "jane-chao", twitter: "janechao_dev" },
  { name: "Kuu (Kume Fumiya)", city: "Tokyo", country: "JP", continent: "Asia", timezone: "UTC+9", lat: 35.6762, lng: 139.6503, github: "fumiya-kume", twitter: "Fumiya_Kume", linkedin: "https://jp.linkedin.com/in/kuu-sushi", website: "http://kuu.systems/" },
  { name: "Saurabh Suri", city: "Toronto", country: "CA", continent: "North America", timezone: "UTC-5", lat: 43.6532, lng: -79.3832, twitter: "surim0n", linkedin: "https://ca.linkedin.com/in/surisuri" },
  { name: "Artur Wala", city: "Warsaw", country: "PL", continent: "Europe", timezone: "UTC+1", lat: 52.2297, lng: 21.0122, github: "awala", twitter: "artur_wala", linkedin: "https://pl.linkedin.com/in/artur-wala", website: "https://www.modelguide.ai/" },
  { name: "David Finsterwalder", city: "Goeppingen", country: "DE", continent: "Europe", timezone: "UTC+1", lat: 48.7025, lng: 9.6528, github: "DFin", twitter: "DFinsterwalder", linkedin: "https://de.linkedin.com/in/david-finsterwalder-3b8985a4", website: "https://noelith.ai" },
  { name: "Ayush Srivastava", city: "Ahmedabad", country: "IN", continent: "Asia", timezone: "UTC+5:30", lat: 23.0225, lng: 72.5714, github: "ayush-srtv", twitter: "ayushsrtv", linkedin: "https://in.linkedin.com/in/ayushsrtv" },
  { name: "Andrew Qu", city: "San Francisco", country: "US", continent: "North America", timezone: "UTC-8", lat: 37.7749, lng: -122.4194, github: "quuu", twitter: "andrewqu", linkedin: "https://linkedin.com/in/andrew-qu", website: "https://andrewqu.com/" },
  { name: "Liudmila Joukovskaya", city: "Cambridge", country: "GB", continent: "Europe", timezone: "UTC+0", lat: 52.2053, lng: 0.1218, github: "ljoukov", linkedin: "https://uk.linkedin.com/in/liudmila-joukovskaya-bb9b1b42", website: "http://eviworld.com/" },
  { name: "Kaspar Hidayat", city: "Jakarta", country: "ID", continent: "Asia", timezone: "UTC+7", lat: -6.2088, lng: 106.8456, twitter: "kasparhidayat", linkedin: "https://sg.linkedin.com/in/kasparhidayat", website: "https://kaspar.substack.com/" },
  { name: "Rebecca Hu", city: "New York", country: "US", continent: "North America", timezone: "UTC-5", lat: 40.7128, lng: -74.006, twitter: "rebeccayhu", linkedin: "https://www.linkedin.com/in/rebeccayhu", website: "https://www.rebeccayanhu.com" },
  { name: "Jay Park", city: "Vancouver", country: "CA", continent: "North America", timezone: "UTC-8", lat: 49.2827, lng: -123.1207, github: "AllanT102", twitter: "JayPark_io", linkedin: "https://ca.linkedin.com/in/jaykbpark", website: "https://jaykbpark.com" },
  { name: "Ramona", city: "Toronto", country: "CA", continent: "North America", timezone: "UTC-5", lat: 43.6532, lng: -79.3832, twitter: "ramonable", linkedin: "https://ca.linkedin.com/in/ramonable" },
  { name: "Brendan Beh", city: "Kuala Lumpur", country: "MY", continent: "Asia", timezone: "UTC+8", lat: 3.139, lng: 101.6869, twitter: "Brendan_In_Byte", linkedin: "https://my.linkedin.com/in/brendan-beh" },
  { name: "Tom Yang", city: "Taipei", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 25.0330, lng: 121.5654 },
  { name: "Mateo Kruk", city: "Montevideo", country: "UY", continent: "South America", timezone: "UTC-3", lat: -34.9011, lng: -56.1645, github: "MateoKruk", twitter: "mateokruk_", linkedin: "https://www.linkedin.com/in/mateokruk", website: "https://mateokruk.com" },
  { name: "An Nguyen", city: "Ho Chi Minh City", country: "VN", continent: "Asia", timezone: "UTC+7", lat: 10.8231, lng: 106.6297, github: "anthng", linkedin: "https://vn.linkedin.com/in/anthng", website: "https://anthng.github.io" },
  { name: "Harry Ng", city: "Taichung City", country: "TW", continent: "Asia", timezone: "UTC+8", lat: 24.1477, lng: 120.6736, github: "harryworld", twitter: "harryworld", linkedin: "https://tw.linkedin.com/in/harryng", website: "https://buildwithharry.com" },
  { name: "Son Le Thanh", city: "Ho Chi Minh City", country: "VN", continent: "Asia", timezone: "UTC+7", lat: 10.8231, lng: 106.6297, github: "thsonvt" },
  { name: "Zane Chee", city: "Singapore", country: "SG", continent: "Asia", timezone: "UTC+8", lat: 1.3521, lng: 103.8198, github: "injaneity", twitter: "injaneity", linkedin: "https://sg.linkedin.com/in/zanechee", website: "https://zanechee.dev" },
  { name: "Glaucia Lemos", city: "Rio de Janeiro", country: "BR", continent: "South America", timezone: "UTC-3", lat: -22.9068, lng: -43.1729, github: "glaucia86", twitter: "glaucia_lemos86", linkedin: "https://br.linkedin.com/in/glaucialemos", website: "https://linktr.ee/glaucia_lemos86" },
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
