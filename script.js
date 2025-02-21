class WeatherApp {
    constructor() {
        this.weatherGrid = document.querySelector('.weather-grid');
        this.loadingSpinner = document.querySelector('.loading-spinner');
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');

        this.init();
    }

    init() {
        this.loadAllStateWeather();
        this.setupSearchListener();
        // Update weather every 5 minutes
        setInterval(() => this.loadAllStateWeather(), 300000);
    }

    setupSearchListener() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const weatherCards = document.querySelectorAll('.weather-card');
        
        weatherCards.forEach(card => {
            const stateName = card.querySelector('h2').textContent.toLowerCase();
            if (stateName.includes(searchTerm)) {
                card.style.display = 'block';
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

    renderWeatherCards(weatherDataArray) {
        this.weatherGrid.innerHTML = '';
        
        weatherDataArray.forEach(data => {
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
        if (weather.main === 'Rain') {
            this.createRaindrops(weatherEffect);
        } else if (weather.main === 'Thunderstorm') {
            this.createLightning(weatherEffect);
        }
        
        return card;
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

    showLoading(show) {
        this.loadingSpinner.style.display = show ? 'flex' : 'none';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.weatherGrid.appendChild(errorDiv);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Profile picture upload
const pictureUpload = document.getElementById('picture-upload');
const profileImg = document.getElementById('profile-img');

if (pictureUpload && profileImg) {
    pictureUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});
