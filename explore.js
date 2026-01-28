console.log('Explore page loaded');

// Planet detailed information
const planetData = {
    mercury: {
        name: 'Mercury',
        tagline: 'The Swift Planet',
        distance: '57.9M km',
        diameter: '4,879 km',
        description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. Despite its proximity to the Sun, it is not the hottest planet.',
        facts: [
            'Fastest planet in solar system',
            'No atmosphere to retain heat',
            'Surface temperature: -173°C to 427°C',
            'One year equals 88 Earth days',
            'Smallest planet by mass'
        ],
        color: '#a8a8a8'
    },
    venus: {
        name: 'Venus',
        tagline: 'The Morning Star',
        distance: '108.2M km',
        diameter: '12,104 km',
        description: 'Venus is the hottest planet in our solar system, with a thick toxic atmosphere that traps heat. It rotates backwards compared to most planets.',
        facts: [
            'Hottest planet in solar system',
            'Thick CO2 atmosphere',
            'Surface temperature: 465°C',
            'One year equals 225 Earth days',
            'Rotates backwards (retrograde rotation)'
        ],
        color: '#ffeaa7'
    },
    earth: {
        name: 'Earth',
        tagline: 'The Blue Planet',
        distance: '150.0M km',
        diameter: '12,742 km',
        description: 'Our home planet is the only known world to harbor life. It has the perfect conditions with liquid water, protective atmosphere, and moderate temperatures.',
        facts: [
            'Only planet with known life',
            'Contains 71% water',
            'One atmosphere protects from radiation',
            'One orbit = 365.25 days',
            'Home to over 8 million species'
        ],
        color: '#4a90e2'
    },
    mars: {
        name: 'Mars',
        tagline: 'The Red Planet',
        distance: '227.9M km',
        diameter: '6,779 km',
        description: 'Mars is a cold desert world with a thin atmosphere. It shows evidence of ancient water and is a prime target for human exploration.',
        facts: [
            'Red color from iron oxide (rust)',
            'Largest volcano in solar system (Olympus Mons)',
            'Two small moons: Phobos and Deimos',
            'Thin CO2 atmosphere',
            'Target for future human missions'
        ],
        color: '#e74c3c'
    },
    jupiter: {
        name: 'Jupiter',
        tagline: 'The Gas Giant',
        distance: '778.5M km',
        diameter: '139,820 km',
        description: 'Jupiter is the largest planet in our solar system, a gas giant with no solid surface. Its Great Red Spot is a storm lasting centuries.',
        facts: [
            'Largest planet in solar system',
            'Has 95+ moons',
            'Great Red Spot is a massive storm',
            'Magnetic field is 16x stronger than Earth',
            'Completes orbit in 12 Earth years'
        ],
        color: '#d4a373'
    },
    saturn: {
        name: 'Saturn',
        tagline: 'The Ringed Planet',
        distance: '1.4B km',
        diameter: '116,460 km',
        description: 'Saturn is famous for its spectacular ring system made of ice and rock. It is a gas giant with many interesting moons including Titan.',
        facts: [
            'Spectacular ring system',
            'Has 146+ moons',
            'Lowest density of all planets',
            'Titan is larger than Mercury',
            'Completes orbit in 29 Earth years'
        ],
        color: '#f4d7a7'
    },
    uranus: {
        name: 'Uranus',
        tagline: 'The Ice Giant',
        distance: '2.9B km',
        diameter: '50,724 km',
        description: 'Uranus is an ice giant that rotates on its side. Its atmosphere contains methane which gives it a cyan color.',
        facts: [
            'Rotates on its side (98° axial tilt)',
            'Methane in atmosphere gives blue color',
            'Has 27+ moons',
            'Coldest planetary atmosphere',
            'Completes orbit in 84 Earth years'
        ],
        color: '#a5d6d1'
    },
    neptune: {
        name: 'Neptune',
        tagline: 'The Distant Blue',
        distance: '4.5B km',
        diameter: '49,244 km',
        description: 'Neptune is the windiest planet in our solar system, located at the edge of our planetary region. It has a deep blue color from methane.',
        facts: [
            'Fastest winds in solar system (2,100 km/h)',
            'Has 16+ moons',
            'Methane atmosphere creates blue color',
            'Completes orbit in 165 Earth years',
            'Coldest temperature in solar system'
        ],
        color: '#6b9ddc'
    }
};

// Notification function
function showNotification(message, type = 'info') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'loading' ? 'spinner fa-spin' : 'check-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    if (type !== 'loading') {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Create notification styles
function createNotificationStyles() {
    if (document.getElementById('notificationStyles')) return;

    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(13, 27, 62, 0.95);
            border: 2px solid rgba(74, 144, 226, 0.6);
            color: white;
            padding: 16px 24px;
            border-radius: 6px;
            z-index: 10002;
            animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(74, 144, 226, 0.3);
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        @keyframes slideIn {
            from {
                transform: translateX(500px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
        }

        .notification-content i {
            color: #4a90e2;
            font-size: 16px;
            min-width: 20px;
        }

        .notification-success {
            border-color: rgba(76, 175, 80, 0.7);
            background: rgba(13, 27, 62, 0.95);
        }

        .notification-success .notification-content i {
            color: #4caf50;
        }

        .notification-loading {
            border-color: rgba(74, 144, 226, 0.7);
        }

        .fa-spin {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Create modal HTML
function createPlanetModal() {
    const modal = document.createElement('div');
    modal.id = 'planetDetailModal';
    modal.className = 'planet-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content-expanded">
            <button class="modal-close-btn" id="closePlanetModal">
                <i class="fas fa-times"></i>
            </button>
            <div class="planet-modal-header">
                <div class="planet-visual">
                    <div class="planet-display" id="modalPlanetDisplay"></div>
                </div>
                <div class="planet-title-section">
                    <div class="planet-badge" id="modalBadge">01</div>
                    <h1 id="modalPlanetName">Mercury</h1>
                    <p id="modalPlanetTagline">The Swift Planet</p>
                </div>
            </div>

            <div class="planet-modal-body">
                <div class="info-section">
                    <h3>Overview</h3>
                    <p id="modalDescription"></p>
                </div>

                <div class="stats-section">
                    <div class="stat-card">
                        <span class="stat-icon"><i class="fas fa-map-pin"></i></span>
                        <span class="stat-title">Distance from Sun</span>
                        <span id="modalDistance" class="stat-data">57.9M km</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon"><i class="fas fa-circle"></i></span>
                        <span class="stat-title">Diameter</span>
                        <span id="modalDiameter" class="stat-data">4,879 km</span>
                    </div>
                </div>

                <div class="facts-section">
                    <h3>Key Facts</h3>
                    <ul id="modalFactsList" class="facts-list">
                        <li>Fact 1</li>
                        <li>Fact 2</li>
                    </ul>
                </div>

                <div class="action-section">
                    <button class="btn-primary" id="exploreBtn">
                        <span>Begin Exploration</span>
                        <i class="fas fa-rocket"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closePlanetModal').addEventListener('click', closePlanetModal);
    document.querySelector('.modal-backdrop').addEventListener('click', closePlanetModal);
    document.getElementById('exploreBtn').addEventListener('click', beginExploration);
}

function showPlanetDetail(planetKey) {
    const data = planetData[planetKey];
    if (!data) return;

    const modal = document.getElementById('planetDetailModal') || createPlanetModal();

    document.getElementById('modalPlanetName').textContent = data.name;
    document.getElementById('modalPlanetTagline').textContent = data.tagline;
    document.getElementById('modalBadge').textContent = Object.keys(planetData).indexOf(planetKey) + 1;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalDistance').textContent = data.distance;
    document.getElementById('modalDiameter').textContent = data.diameter;

    const factsList = document.getElementById('modalFactsList');
    factsList.innerHTML = data.facts.map(fact => `<li>${fact}</li>`).join('');

    const planetDisplay = document.getElementById('modalPlanetDisplay');
    planetDisplay.className = `planet-display planet-image ${planetKey}`;

    modal.classList.add('active');
}

function closePlanetModal() {
    const modal = document.getElementById('planetDetailModal');
    if (modal) modal.classList.remove('active');
}

let currentPlanet = 'mercury';

function beginExploration() {
    console.log('Beginning exploration for:', currentPlanet);
    closePlanetModal();

    showNotification(`Navigating to ${planetData[currentPlanet].name}...`, 'loading');

    setTimeout(() => {
        window.location.href = `planetdetail.html?planet=${currentPlanet}`;
    }, 1500);
}

// ✅ FIXED: Only query if planetCards doesn't already exist (from common.js)
// This prevents the "already been declared" error
if (typeof planetCards === 'undefined') {
    const planetCards = document.querySelectorAll('.planet-card');

    planetCards.forEach(card => {
        card.addEventListener('click', () => {
            const planet = card.dataset.planet;
            const planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
            currentPlanet = planet;

            showNotification(`Loading ${planetName}...`, 'loading');

            setTimeout(() => {
                showNotification(`Welcome to ${planetName}!`, 'success');
                showPlanetDetail(planet);
            }, 2000);
        });
    });
} else {
    // If planetCards already exists from common.js, use it
    document.querySelectorAll('.planet-card').forEach(card => {
        card.addEventListener('click', () => {
            const planet = card.dataset.planet;
            const planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
            currentPlanet = planet;

            showNotification(`Loading ${planetName}...`, 'loading');

            setTimeout(() => {
                showNotification(`Welcome to ${planetName}!`, 'success');
                showPlanetDetail(planet);
            }, 2000);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createNotificationStyles();

    const slider = document.getElementById('planetSlider');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (slider && nextBtn && prevBtn) {
        const getScrollAmount = () => {
            const cardWidth = slider.querySelector('.planet-card').offsetWidth;
            const gap = 30;
            return (cardWidth + gap) * 3;
        };

        nextBtn.addEventListener('click', () => {
            if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        });

        prevBtn.addEventListener('click', () => {
            if (slider.scrollLeft <= 0) {
                slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        });
    }

    if (!document.getElementById('planetDetailModal')) {
        createPlanetModal();
    }
});