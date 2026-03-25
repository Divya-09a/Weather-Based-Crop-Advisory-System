import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ForecastDay, AdvisoryReport } from '@/types';
import { fetchWeather, fetchForecast } from '@/services/weatherService';
import { generateAdvisory } from '@/services/advisoryService';
import { getDistrict } from '@/constants/locations';
import { getCrop } from '@/constants/crops';

interface UseWeatherResult {
  weather: WeatherData | null;
  forecast: ForecastDay[];
  advisory: AdvisoryReport | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => void;
}

export function useWeather(locationName: string, cropName: string): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [advisory, setAdvisory] = useState<AdvisoryReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    if (!locationName || !cropName) return;
    const district = getDistrict(locationName);
    const crop = getCrop(cropName);
    if (!district || !crop) return;

    setIsLoading(true);
    setError(null);
    try {
      const [w, f] = await Promise.all([fetchWeather(district), fetchForecast(district)]);
      setWeather(w);
      setForecast(f);
      setAdvisory(generateAdvisory(crop, w));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  }, [locationName, cropName]);

  useEffect(() => {
    load();
  }, [load]);

  return { weather, forecast, advisory, isLoading, error, lastUpdated, refresh: load };
}
