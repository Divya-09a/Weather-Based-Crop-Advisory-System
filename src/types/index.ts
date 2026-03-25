// ─── Core Data Types ────────────────────────────────────────────────────────

export interface FarmerUser {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  location: string;
  crop: string;
  registeredAt: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
  conditionIcon: string;
  description: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  location: string;
  fetchedAt: string;
}

export interface ForecastDay {
  date: string;
  condition: string;
  conditionIcon: string;
  tempHigh: number;
  tempLow: number;
  humidity: number;
  rainfall: number;
}

export interface Advisory {
  type: 'success' | 'warning' | 'danger' | 'info';
  category: string;
  message: string;
  action: string;
}

export interface AdvisoryReport {
  cropName: string;
  overallStatus: 'Favorable' | 'Moderate' | 'Unfavorable';
  advisories: Advisory[];
  riskAlerts: string[];
  score: number;
}

export interface TamilNaduDistrict {
  name: string;
  lat: number;
  lon: number;
  region: string;
}

export interface CropConditions {
  name: string;
  emoji: string;
  season: string;
  description: string;
  tempMin: number;
  tempMax: number;
  tempIdeal: number;
  humidityMin: number;
  humidityMax: number;
  rainfallMin: number;
  rainfallMax: number;
  windMax: number;
  risks: string[];
  suitableRegions: string[];
}
