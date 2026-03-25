// Weather Service — Mock weather data with realistic Tamil Nadu conditions
import { WeatherData, ForecastDay, TamilNaduDistrict } from '@/types';

function conditionToEmoji(condition: string): string {
  const c = condition.toLowerCase();
  if (c.includes('thunderstorm')) return '⛈️';
  if (c.includes('drizzle')) return '🌦️';
  if (c.includes('rain')) return '🌧️';
  if (c.includes('snow')) return '❄️';
  if (c.includes('mist') || c.includes('fog')) return '🌫️';
  if (c.includes('clear')) return '☀️';
  if (c.includes('cloud')) return '⛅';
  return '🌤️';
}

function getMockWeather(district: TamilNaduDistrict): WeatherData {
  const hour = new Date().getHours();
  const seed = district.lat + district.lon + hour;
  const variation = (seed % 10) - 5;

  const regionBases: Record<string, Partial<{ temperature: number; humidity: number; rainfall: number; windSpeed: number; condition: string }>> = {
    'Coastal': { temperature: 32, humidity: 78, rainfall: 85, windSpeed: 5.2, condition: 'Partly Cloudy' },
    'Delta': { temperature: 31, humidity: 82, rainfall: 120, windSpeed: 3.8, condition: 'Cloudy' },
    'Western': { temperature: 29, humidity: 65, rainfall: 60, windSpeed: 4.5, condition: 'Clear' },
    'Southern': { temperature: 33, humidity: 70, rainfall: 45, windSpeed: 4.0, condition: 'Clear' },
    'Central': { temperature: 34, humidity: 58, rainfall: 30, windSpeed: 3.2, condition: 'Clear' },
    'Northwestern': { temperature: 30, humidity: 55, rainfall: 40, windSpeed: 3.5, condition: 'Clear' },
    'Northeastern': { temperature: 31, humidity: 72, rainfall: 75, windSpeed: 4.2, condition: 'Partly Cloudy' },
  };

  const base = regionBases[district.region] || regionBases['Central'];

  const temp = Math.round((base.temperature || 32) + variation * 0.5);
  const humidity = Math.min(95, Math.max(35, (base.humidity || 65) + variation));
  const rainfall = Math.max(0, (base.rainfall || 50) + variation * 3);
  const wind = Math.max(0.5, (base.windSpeed || 4) + variation * 0.2);
  const condition = base.condition || 'Clear';

  return {
    temperature: temp,
    feelsLike: temp + 2,
    humidity,
    rainfall: Math.round(rainfall),
    windSpeed: Math.round(wind * 10) / 10,
    windDirection: 210,
    condition,
    conditionIcon: conditionToEmoji(condition),
    description: condition.toLowerCase(),
    pressure: 1013 + Math.round(variation),
    visibility: 10,
    uvIndex: hour > 10 && hour < 16 ? 8 : 4,
    sunrise: '06:15',
    sunset: '18:30',
    location: `${district.name}, Tamil Nadu`,
    fetchedAt: new Date().toISOString(),
  };
}

function getMockForecast(district: TamilNaduDistrict): ForecastDay[] {
  const conditions = [
    { c: 'Clear', icon: '☀️' },
    { c: 'Partly Cloudy', icon: '⛅' },
    { c: 'Light Rain', icon: '🌦️' },
    { c: 'Cloudy', icon: '☁️' },
    { c: 'Clear', icon: '☀️' },
  ];
  const today = new Date();
  return conditions.map((cond, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    const variation = (i * 3) % 7 - 3;
    const base = 31 + (district.lat % 3);
    return {
      date: date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
      condition: cond.c,
      conditionIcon: cond.icon,
      tempHigh: Math.round(base + variation + 2),
      tempLow: Math.round(base + variation - 4),
      humidity: 60 + i * 5,
      rainfall: i === 2 ? 45 : i === 3 ? 20 : 0,
    };
  });
}

export async function fetchWeather(district: TamilNaduDistrict): Promise<WeatherData> {
  await new Promise(r => setTimeout(r, 1200));
  return getMockWeather(district);
}

export async function fetchForecast(district: TamilNaduDistrict): Promise<ForecastDay[]> {
  await new Promise(r => setTimeout(r, 800));
  return getMockForecast(district);
}
