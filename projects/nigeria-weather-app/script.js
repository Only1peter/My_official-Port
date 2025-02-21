class WeatherApp {
    constructor() {
        this.weatherGrid = document.querySelector('.weather-grid');
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.loadingSpinner = document.querySelector('.loading-spinner');

        this.init();
    }

    init() {
        this.loadAllStateWeather();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.trim().toLowerCase();
        const cards = this.weatherGrid.querySelectorAll('.weather-card');

        cards.forEach(card => {
            const stateName = card.querySelector('h2').textContent.toLowerCase();
            if (stateName.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                // Add fade-in animation for matching cards
                card.style.animation = 'cardEntrance 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                card.style.display = 'none';
            }
        });
     }

    async loadAllStateWeather() {
        this.showLoading(true);
        try {
            const weatherData = NIGERIAN_STATES.map(state => {
                const demoData = DEMO_WEATHER_DATA.getCurrentWeather(state.name);
                return { ...demoData, stateName: state.name };
            });
            this.renderWeatherCards(weatherData);
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.showError('Failed to load weather data. Please try again later.');
        } finally {
            this.showLoading(false);
        }
    }

    renderWeatherCards(weatherDataList) {
        this.weatherGrid.innerHTML = '';
        weatherDataList.forEach(data => {
            const card = this.createWeatherCard(data);
            this.weatherGrid.appendChild(card);
        });
    }

    createWeatherCard(data) {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.setAttribute('data-weather', data.weather[0].main);
        
        const weather = data.weather[0];
        const temp = Math.round(data.main.temp);
        
        card.innerHTML = `
            <h2>${data.stateName}</h2>
            <div class="weather-info">
                <span class="temperature">${temp}°C</span>
                <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
            </div>
            <p class="weather-description">${weather.description}</p>
            <div class="weather-details">
                <div class="weather-detail">
                    <i class="fas fa-tint"></i>
                    <span>${data.main.humidity}%</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-wind"></i>
                    <span>${Math.round(data.wind.speed)} m/s</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-temperature-high"></i>
                    <span>${Math.round(data.main.temp_max)}°C</span>
                </div>
                <div class="weather-detail">
                    <i class="fas fa-temperature-low"></i>
                    <span>${Math.round(data.main.temp_min)}°C</span>
                </div>
            </div>
            <div class="weather-effect"></div>
        `;

        // Add dynamic weather effects
        const weatherEffect = card.querySelector('.weather-effect');
        this.addWeatherEffects(weatherEffect, weather.main);

        // Add hover animation delay
        card.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Add click interaction
        card.addEventListener('click', () => this.handleCardClick(card));
        
        return card;
    }

    addWeatherEffects(container, weatherType) {
        switch(weatherType) {
            case 'Rain':
                this.createRaindrops(container);
                break;
            case 'Thunderstorm':
                this.createLightning(container);
                this.createRaindrops(container);
                break;
            case 'Clear':
            case 'Sunny':
                this.createSunEffect(container);
                break;
            case 'Clouds':
                this.createClouds(container);
                break;
            case 'Snow':
                this.createSnow(container);
                break;
            case 'Haze':
                this.createHaze(container);
                break;
        }
    }

    createRaindrops(container) {
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(drop);
        }
    }

    createLightning(container) {
        const flash = document.createElement('div');
        flash.className = 'lightning-flash';
        container.appendChild(flash);
    }

    createSunEffect(container) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        container.appendChild(ray);
    }

    createClouds(container) {
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.top = (20 + i * 25) + '%';
            cloud.style.width = (60 + Math.random() * 40) + 'px';
            cloud.style.height = '20px';
            cloud.style.animationDuration = (15 + Math.random() * 5) + 's';
            cloud.style.animationDelay = (i * -5) + 's';
            container.appendChild(cloud);
        }
    }

    createSnow(container) {
        for (let i = 0; i < 20; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(snowflake);
        }
    }

    createHaze(container) {
        const haze = document.createElement('div');
        haze.className = 'haze';
        container.appendChild(haze);
    }

    handleCardClick(card) {
        // Add a ripple effect on click
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        card.appendChild(ripple);
        
        // Remove the ripple after animation
        setTimeout(() => ripple.remove(), 1000);

        // Add a subtle scale animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => card.style.transform = '', 150);
    }

    showLoading(show) {
        this.loadingSpinner.style.display = show ? 'flex' : 'none';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.weatherGrid.innerHTML = '';
        this.weatherGrid.appendChild(errorDiv);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
