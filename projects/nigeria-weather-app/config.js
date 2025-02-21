// List of Nigerian states
const NIGERIAN_STATES = [
    { name: "Abia" },
    { name: "Adamawa" },
    { name: "Akwa Ibom" },
    { name: "Anambra" },
    { name: "Bauchi" },
    { name: "Bayelsa" },
    { name: "Benue" },
    { name: "Borno" },
    { name: "Cross River" },
    { name: "Delta" },
    { name: "Ebonyi" },
    { name: "Edo" },
    { name: "Ekiti" },
    { name: "Enugu" },
    { name: "Federal Capital Territory" },
    { name: "Gombe" },
    { name: "Imo" },
    { name: "Jigawa" },
    { name: "Kaduna" },
    { name: "Kano" },
    { name: "Katsina" },
    { name: "Kebbi" },
    { name: "Kogi" },
    { name: "Kwara" },
    { name: "Lagos" },
    { name: "Nasarawa" },
    { name: "Niger" },
    { name: "Ogun" },
    { name: "Ondo" },
    { name: "Osun" },
    { name: "Oyo" },
    { name: "Plateau" },
    { name: "Rivers" },
    { name: "Sokoto" },
    { name: "Taraba" },
    { name: "Yobe" },
    { name: "Zamfara" }
];

// Demo weather data generator
const DEMO_WEATHER_DATA = {
    getCurrentWeather: (stateName) => {
        const weatherTypes = ['Clear', 'Rain', 'Thunderstorm', 'Clouds', 'Haze'];
        const weatherDescriptions = {
            Clear: 'Clear sky',
            Rain: 'Light rain',
            Thunderstorm: 'Thunderstorm',
            Clouds: 'Scattered clouds',
            Haze: 'Hazy'
        };
        const weatherIcons = {
            Clear: '01d',
            Rain: '10d',
            Thunderstorm: '11d',
            Clouds: '03d',
            Haze: '50d'
        };

        // Generate random weather type
        const weatherType = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];

        // Generate random temperature based on Nigeria's typical climate
        const baseTemp = 25 + Math.random() * 10; // Temperature between 25-35°C
        const humidity = 50 + Math.floor(Math.random() * 30); // Humidity between 50-80%
        const windSpeed = 2 + Math.random() * 5; // Wind speed between 2-7 m/s

        return {
            main: {
                temp: baseTemp,
                humidity: humidity,
                temp_max: baseTemp + 2,
                temp_min: baseTemp - 2,
                feels_like: baseTemp - 1
            },
            weather: [{
                main: weatherType,
                description: weatherDescriptions[weatherType],
                icon: weatherIcons[weatherType]
            }],
            wind: {
                speed: windSpeed
            }
        };
    }
};
