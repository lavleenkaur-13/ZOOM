// ✅ NOTIFICATION FUNCTION - ADDED (THIS WAS MISSING!)
function showNotification(message, type = 'success') {
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

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Add notification styles
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

// Detailed Planet Data
const planetDetailsData = {
    mercury: {
        name: 'Mercury',
        number: '01',
        tagline: 'The Swift Planet',
        distance: '57.9M km',
        diameter: '4,879 km',
        orbit: '88 days',
        temp: '-173°C to 427°C',
        overview: 'Mercury is the smallest planet in our solar system and the closest to the Sun. Despite its proximity to the Sun, it is not the hottest planet. Mercury has a thin atmosphere and an extreme surface temperature that varies dramatically between day and night.',
        features: [
            'Fastest planet orbiting the Sun',
            'Extreme temperature variations',
            'No atmosphere to retain heat',
            'Heavily cratered surface',
            'Smallest planet by mass'
        ],
        facts: [
            'One Mercury year = 88 Earth days',
            'Surface temperature swings 600°C',
            'Closest planet to the Sun',
            'Named after Roman messenger god',
            'No moons or rings'
        ],
        atmosphere: 'Mercury has virtually no atmosphere to speak of. It has only trace amounts of oxygen, sodium, and hydrogen. The thin exosphere is constantly being replenished by the solar wind and micrometeorite impacts.',
        surface: 'Mercury\'s surface is heavily cratered, resembling Earth\'s Moon. It has large cliffs called scarps that can be hundreds of miles long. The surface is composed primarily of silicate rocks and iron.',
        exploration: 'Mercury has been visited by NASA\'s Mariner 10 (1974-1975) and MESSENGER (2011-2015). Currently, ESA and JAXA\'s BepiColombo mission is studying the planet to understand its composition and magnetic field.',
        size: 38,
        distance_comp: 39,
        gravity: 38
    },
    venus: {
        name: 'Venus',
        number: '02',
        tagline: 'The Morning Star',
        distance: '108.2M km',
        diameter: '12,104 km',
        orbit: '225 days',
        temp: '465°C',
        overview: 'Venus is the hottest planet in our solar system and is often called Earth\'s sister planet due to its similar size. However, its harsh conditions make it impossible for life as we know it. Venus rotates backwards compared to most planets.',
        features: ['Hottest planet in solar system', 'Thick toxic atmosphere (CO2)', 'Retrograde rotation', 'Brightest planet visible from Earth', 'Extreme atmospheric pressure'],
        facts: ['Surface temperature: 465°C', 'Atmospheric pressure 92x Earth\'s', 'One Venus day > One Venus year', 'Often called Morning or Evening Star', 'Runaway greenhouse effect'],
        atmosphere: 'Venus has a thick, toxic atmosphere composed of 96% carbon dioxide with clouds of sulfuric acid.',
        surface: 'Venus has a landscape dominated by volcanic features, including thousands of volcanoes.',
        exploration: 'Venus has been extensively studied by Soviet Venera missions and American Mariner and Pioneer Venus missions.',
        size: 95,
        distance_comp: 72,
        gravity: 91
    },
    earth: {
        name: 'Earth',
        number: '03',
        tagline: 'The Blue Planet',
        distance: '150.0M km',
        diameter: '12,742 km',
        orbit: '365.25 days',
        temp: '-88°C to 58°C',
        overview: 'Our home planet is the only known world to harbor life. Earth has the perfect conditions with liquid water, a protective atmosphere, and moderate temperatures.',
        features: ['Only planet with known life', 'Perfect conditions for life', 'Abundant liquid water', 'Protective magnetic field', 'Diverse ecosystems and continents'],
        facts: ['71% of surface is water', 'One atmosphere protects from radiation', 'Home to over 8 million species', 'One natural satellite: The Moon', 'Age: 4.5 billion years'],
        atmosphere: 'Earth\'s atmosphere is 78% nitrogen, 21% oxygen, and 1% other gases.',
        surface: 'Earth has diverse landscapes including continents, oceans, mountains, and deserts.',
        exploration: 'Earth has been extensively studied by countless satellites and human missions.',
        size: 100,
        distance_comp: 100,
        gravity: 100
    },
    mars: {
        name: 'Mars',
        number: '04',
        tagline: 'The Red Planet',
        distance: '227.9M km',
        diameter: '6,779 km',
        orbit: '687 days',
        temp: '-195°C to 20°C',
        overview: 'Mars is a cold desert world with a thin atmosphere and the largest volcano in the solar system. It shows evidence of ancient water and is a prime target for human exploration.',
        features: ['Red color from iron oxide (rust)', 'Largest volcano: Olympus Mons', 'Evidence of ancient water', 'Thin atmosphere of CO2', 'Two small moons: Phobos & Deimos'],
        facts: ['Largest dust storms in solar system', 'Deep canyon system: Valles Marineris', 'Polar ice caps of water and CO2', 'One year = 687 Earth days', 'Prime target for human colonization'],
        atmosphere: 'Mars has a thin atmosphere composed primarily of carbon dioxide.',
        surface: 'Mars has diverse terrain including vast deserts, towering volcanoes, deep canyons.',
        exploration: 'Mars has been visited by numerous rovers including NASA\'s Curiosity and Perseverance.',
        size: 53,
        distance_comp: 152,
        gravity: 38
    },
    jupiter: {
        name: 'Jupiter',
        number: '05',
        tagline: 'The Gas Giant',
        distance: '778.5M km',
        diameter: '139,820 km',
        orbit: '11.86 years',
        temp: '-110°C',
        overview: 'Jupiter is the largest planet in our solar system, a gas giant with no solid surface. Its Great Red Spot is a massive storm lasting for centuries.',
        features: ['Largest planet in solar system', 'Massive storm: Great Red Spot', 'Strong magnetic field', 'Rapid rotation (10 hour day)', '95+ moons including Ganymede'],
        facts: ['2.5x mass of all other planets combined', 'Great Red Spot is 400 years old', 'Magnetic field 16x stronger than Earth', 'Completes orbit in 12 Earth years', 'Has faint ring system'],
        atmosphere: 'Jupiter\'s atmosphere is composed primarily of hydrogen and helium.',
        surface: 'Jupiter has no solid surface. It is a gas giant with layers of hydrogen and helium.',
        exploration: 'Jupiter has been visited by multiple spacecraft including Juno currently orbiting.',
        size: 1100,
        distance_comp: 519,
        gravity: 254
    },
    saturn: {
        name: 'Saturn',
        number: '06',
        tagline: 'The Ringed Planet',
        distance: '1.4B km',
        diameter: '116,460 km',
        orbit: '29.46 years',
        temp: '-140°C',
        overview: 'Saturn is famous for its spectacular ring system made of ice and rock particles. It is a gas giant with many interesting moons, including Titan.',
        features: ['Spectacular ring system', 'Lowest density of all planets', 'Titan: largest moon with atmosphere', '146+ moons', 'Rapid rotation despite large size'],
        facts: ['Rings extend 280,000 km in diameter', 'Titan larger than planet Mercury', 'Could float in water due to low density', 'Completes orbit in 29 Earth years', 'Golden color from ammonia crystals'],
        atmosphere: 'Saturn\'s atmosphere is similar to Jupiter\'s, composed mainly of hydrogen and helium.',
        surface: 'Saturn has no solid surface. It is composed of hydrogen and helium.',
        exploration: 'Saturn has been visited by Cassini-Huygens spending 13 years studying the system.',
        size: 916,
        distance_comp: 933,
        gravity: 107
    },
    uranus: {
        name: 'Uranus',
        number: '07',
        tagline: 'The Ice Giant',
        distance: '2.9B km',
        diameter: '50,724 km',
        orbit: '84.01 years',
        temp: '-195°C',
        overview: 'Uranus is an ice giant that rotates on its side with an axial tilt of 98 degrees. Its atmosphere contains methane which gives it a cyan color.',
        features: ['Rotates on its side', 'Methane atmosphere creates cyan color', 'Faint ring system', '27+ moons', 'Coldest planetary atmosphere'],
        facts: ['Axial tilt of 98 degrees', 'One rotation = 17 hours', 'Extreme wind speeds', 'Completes orbit in 84 Earth years', 'Discovered in 1781'],
        atmosphere: 'Uranus has an atmosphere composed of hydrogen, helium, and methane.',
        surface: 'Uranus has no solid surface. It is an ice giant with a rocky core.',
        exploration: 'Uranus has been visited only by Voyager 2 in 1986.',
        size: 400,
        distance_comp: 1933,
        gravity: 89
    },
    neptune: {
        name: 'Neptune',
        number: '08',
        tagline: 'The Distant Blue',
        distance: '4.5B km',
        diameter: '49,244 km',
        orbit: '164.79 years',
        temp: '-200°C',
        overview: 'Neptune is the windiest planet in our solar system, located at the edge of our planetary region. It has a deep blue color from methane in its atmosphere.',
        features: ['Fastest winds in solar system', 'Deep blue color from methane', 'Massive storm: Great Dark Spot', '16+ moons including Triton', 'Faint ring system'],
        facts: ['Wind speeds up to 2,100 km/h', 'Coldest planetary atmosphere', 'Completes orbit in 165 Earth years', 'Farthest planet from the Sun', 'Discovered in 1846'],
        atmosphere: 'Neptune\'s atmosphere is composed of hydrogen, helium, and methane.',
        surface: 'Neptune has no solid surface. It is an ice giant.',
        exploration: 'Neptune has been visited only by Voyager 2 in 1989.',
        size: 389,
        distance_comp: 3000,
        gravity: 114
    }
};

// Get planet from URL
function getPlanetFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('planet') || 'mercury';
}

// Load planet data
function loadPlanetData() {
    const planet = getPlanetFromURL();
    const data = planetDetailsData[planet];

    if (!data) {
        console.error('Planet not found:', planet);
        window.location.href = 'explore.html';
        return;
    }

    console.log('Loading planet:', planet);

    // Update hero section
    document.getElementById('heroPlanetName').textContent = data.name;
    document.getElementById('heroNumber').textContent = data.number;
    document.getElementById('heroTitle').textContent = data.name;
    document.getElementById('heroSubtitle').textContent = data.tagline;

    // Update planet visual
    const heroVisual = document.getElementById('heroVisual');
    heroVisual.className = `planet-hero-visual planet-image ${planet}`;

    // Update stats
    document.getElementById('statDistance').textContent = data.distance;
    document.getElementById('statDiameter').textContent = data.diameter;
    document.getElementById('statOrbit').textContent = data.orbit;
    document.getElementById('statTemp').textContent = data.temp;

    // Update overview
    document.getElementById('overviewText').textContent = data.overview;

    // Update features
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

    // Update facts
    const factsGrid = document.getElementById('factsGrid');
    factsGrid.innerHTML = data.facts.map(f =>
        `<div class="fact-item">
            <span class="fact-icon"><i class="fas fa-check"></i></span>
            <span class="fact-text">${f}</span>
        </div>`
    ).join('');

    // Update detailed info
    document.getElementById('infoAtmosphere').textContent = data.atmosphere;
    document.getElementById('infoSurface').textContent = data.surface;
    document.getElementById('infoExploration').textContent = data.exploration;

    // Update comparison
    document.getElementById('compSize').style.width = data.size + '%';
    document.getElementById('compSizeText').textContent = data.size + '% of Earth';

    document.getElementById('compDistance').style.width = Math.min(data.distance_comp, 100) + '%';
    document.getElementById('compDistanceText').textContent = data.distance_comp + '% of Earth\'s distance';

    document.getElementById('compGravity').style.width = data.gravity + '%';
    document.getElementById('compGravityText').textContent = data.gravity + '% of Earth\'s gravity';

    // Update page title
    document.title = `${data.name} - ZOOM Planet Explorer`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize notification styles
    createNotificationStyles();

    loadPlanetData();

    // Start mission button
    const startMissionBtn = document.getElementById('startMissionBtn');
    if (startMissionBtn) {
        startMissionBtn.addEventListener('click', () => {
            showNotification('Virtual mission initialized! ', 'success');
        });
    }

    // Back button
    const breadcrumbLink = document.querySelector('.breadcrumb a');
    if (breadcrumbLink) {
        breadcrumbLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'explore.html';
        });
    }
});