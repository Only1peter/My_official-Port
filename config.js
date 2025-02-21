// Demo weather data for Nigerian states
const DEMO_WEATHER_DATA = {
    getCurrentWeather: (stateName) => {
        const baseTemp = 25 + Math.random() * 10;
        const humidity = 50 + Math.floor(Math.random() * 30);
        const windSpeed = 2 + Math.random() * 5;
        const weatherType = getRandomWeather();
        
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
                description: getWeatherDescription(weatherType),
                icon: getWeatherIcon(weatherType)
            }],
            wind: {
                speed: windSpeed
            }
        };
    }
};

function getRandomWeather() {
    const conditions = [
        'Clear',
        'Clouds',
        'Rain',
        'Thunderstorm',
        'Drizzle',
        'Haze',
        'Sunny'
    ];
    return conditions[Math.floor(Math.random() * conditions.length)];
}

function getWeatherDescription(weatherType) {
    const descriptions = {
        'Clear': 'clear sky',
        'Clouds': ['scattered clouds', 'broken clouds', 'overcast clouds'],
        'Rain': ['light rain', 'moderate rain', 'heavy rain'],
        'Thunderstorm': ['thunderstorm with rain', 'severe thunderstorm', 'thunderstorm with lightning'],
        'Drizzle': 'light drizzle',
        'Haze': 'hazy',
        'Sunny': 'sunny'
    };
    
    const desc = descriptions[weatherType];
    return Array.isArray(desc) ? desc[Math.floor(Math.random() * desc.length)] : desc;
}

function getWeatherIcon(weatherType) {
    const icons = {
        'Clear': '01d',
        'Clouds': ['02d', '03d', '04d'],
        'Rain': ['09d', '10d'],
        'Thunderstorm': '11d',
        'Drizzle': '09d',
        'Haze': '50d',
        'Sunny': '01d'
    };
    
    const icon = icons[weatherType];
    return Array.isArray(icon) ? icon[Math.floor(Math.random() * icon.length)] : icon;
}

// All 36 Nigerian states with their coordinates
const NIGERIAN_STATES = [
    { name: 'Abia', lat: 5.4527, lon: 7.5248 },
    { name: 'Adamawa', lat: 9.3265, lon: 12.4380 },
    { name: 'Akwa Ibom', lat: 5.0333, lon: 7.9333 },
    { name: 'Anambra', lat: 6.2209, lon: 6.9370 },
    { name: 'Bauchi', lat: 10.3159, lon: 9.8437 },
    { name: 'Bayelsa', lat: 4.7717, lon: 6.0694 },
    { name: 'Benue', lat: 7.3369, lon: 8.7404 },
    { name: 'Borno', lat: 11.8464, lon: 13.1603 },
    { name: 'Cross River', lat: 4.9757, lon: 8.3417 },
    { name: 'Delta', lat: 5.5320, lon: 5.8987 },
    { name: 'Ebonyi', lat: 6.2649, lon: 8.0137 },
    { name: 'Edo', lat: 6.3350, lon: 5.6037 },
    { name: 'Ekiti', lat: 7.7190, lon: 5.3110 },
    { name: 'Enugu', lat: 6.4584, lon: 7.5464 },
    { name: 'Federal Capital Territory', lat: 9.0765, lon: 7.3986 },
    { name: 'Gombe', lat: 10.2791, lon: 11.1731 },
    { name: 'Imo', lat: 5.4831, lon: 7.0333 },
    { name: 'Jigawa', lat: 12.2280, lon: 9.5616 },
    { name: 'Kaduna', lat: 10.5222, lon: 7.4384 },
    { name: 'Kano', lat: 12.0022, lon: 8.5177 },
    { name: 'Katsina', lat: 12.9814, lon: 7.6024 },
    { name: 'Kebbi', lat: 12.4482, lon: 4.1929 },
    { name: 'Kogi', lat: 7.7337, lon: 6.6906 },
    { name: 'Kwara', lat: 8.4799, lon: 4.5418 },
    { name: 'Lagos', lat: 6.5244, lon: 3.3792 },
    { name: 'Nasarawa', lat: 8.4999, lon: 8.1999 },
    { name: 'Niger', lat: 9.9309, lon: 5.5988 },
    { name: 'Ogun', lat: 7.1475, lon: 3.3619 },
    { name: 'Ondo', lat: 7.2571, lon: 5.2058 },
    { name: 'Osun', lat: 7.7667, lon: 4.5667 },
    { name: 'Oyo', lat: 8.1574, lon: 3.6147 },
    { name: 'Plateau', lat: 9.2182, lon: 9.5177 },
    { name: 'Rivers', lat: 4.8156, lon: 7.0498 },
    { name: 'Sokoto', lat: 13.0622, lon: 5.2339 },
    { name: 'Taraba', lat: 7.9868, lon: 10.9877 },
    { name: 'Yobe', lat: 12.2940, lon: 11.4390 },
    { name: 'Zamfara', lat: 12.1222, lon: 6.2236 }
];
