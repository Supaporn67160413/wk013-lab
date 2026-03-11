import { useState, useEffect } from "react";

function WeatherApp() {
  const [city, setCity] = useState("Bangkok");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      try {
        //ใช้ Open-Meteo API (ฟรี ไม่ต้อง API key)
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
        );
        console.log(response);
        const data = await response.json(); //แปลงข้อมูล
        console.log(data);

        if (data.results?.length > 0) {
          //ถ้าข้อมูล Array อย่างน้อย 1 เอาข้อมูลตัวแรกสุด
          const { latitude, longitude } = data.results[0];

          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
          );
          const weatherData = await weatherResponse.json();
          setWeather(weatherData.current);
          setError(null);
        } else {
          setError("City not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌦️ Weather App</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..." //อ่านว่าเพลสโฮลเดอร์
      />

      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px", fontSize: "24px" }}>
          <h2>📍 {city}</h2>
          <p>🌡️ Temperature: {weather.temperature_2m}</p>
          <p>🌤️ Weather Code: {weather.weather_code}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
