/* ========================================
   js/common.js - SHARED FUNCTIONALITY
   ======================================== */

// Navigation functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Modal functionality
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginBtn = document.getElementById('loginBtn');
const registerNavBtn = document.getElementById('registerNavBtn');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

// Open login modal
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Open register modal
registerNavBtn.addEventListener('click', () => {
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modals
closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

closeRegister.addEventListener('click', () => {
    registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Switch between modals
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Login form submission
const loginFormElement = document.getElementById('loginFormElement');
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showNotification('All coordinates required for mission initialization', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Invalid email coordinates detected', 'error');
        return;
    }

    showNotification('Initializing mission parameters...', 'loading');

    setTimeout(() => {
        showNotification('Access granted. Welcome back, Explorer!', 'success');
        console.log('Login successful:', { email, password: '***' });

        setTimeout(() => {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            loginFormElement.reset();
        }, 1500);
    }, 1500);
});

// Register form submission
const registerFormElement = document.getElementById('registerFormElement');
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showNotification('All fields required for account creation', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('Invalid email coordinates detected', 'error');
        return;
    }

    if (password.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Password coordinates do not match', 'error');
        return;
    }

    showNotification('Creating explorer account...', 'loading');

    setTimeout(() => {
        showNotification('Account created. Mission ready!', 'success');
        console.log('Registration successful:', { name, email, password: '***' });

        setTimeout(() => {
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
            registerFormElement.reset();
        }, 1500);
    }, 1500);
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = document.createElement('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-triangle';
    } else if (type === 'loading') {
        icon.className = 'fas fa-sync-alt fa-spin';
    }
    icon.style.marginRight = '10px';
    icon.style.fontSize = '16px';

    notification.appendChild(icon);
    notification.appendChild(document.createTextNode(message));

    let bgColor, borderColor;
    if (type === 'success') {
        bgColor = 'rgba(34, 197, 94, 0.15)';
        borderColor = '#22c55e';
    } else if (type === 'error') {
        bgColor = 'rgba(239, 68, 68, 0.15)';
        borderColor = '#ef4444';
    } else if (type === 'loading') {
        bgColor = 'rgba(74, 144, 226, 0.15)';
        borderColor = '#4a90e2';
    }

    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        padding: 16px 24px;
        background: ${bgColor};
        border: 1px solid ${borderColor};
        color: white;
        font-size: 14px;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.4s ease;
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        font-family: 'Rajdhani', sans-serif;
        letter-spacing: 0.5px;
        max-width: 350px;
    `;

    document.body.appendChild(notification);

    if (type !== 'loading') {
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (registerModal.classList.contains('active')) {
            registerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

console.log('ZOOM Astronomy Portal - System Online');
console.log('All systems operational. Ready for exploration.');


/* ========================================
   js/home.js - HOME PAGE
   ======================================== */

const heroExploreBtn = document.getElementById('heroExploreBtn');
if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
        document.getElementById('registerModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

console.log('Home page loaded');


/* ========================================
   js/explore.js - EXPLORE PAGE
   ======================================== */

const planetCards = document.querySelectorAll('.planet-card');
planetCards.forEach(card => {
    card.addEventListener('click', () => {
        const planet = card.dataset.planet;
        showNotification(`Exploring ${planet.charAt(0).toUpperCase() + planet.slice(1)}...`, 'loading');

        setTimeout(() => {
            const existingNotif = document.querySelector('.notification');
            if (existingNotif) existingNotif.remove();
            showNotification(`Welcome to ${planet.charAt(0).toUpperCase() + planet.slice(1)}!`, 'success');
        }, 1500);
    });
});

const animateElements = document.querySelectorAll('.planet-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});

console.log('Explore page loaded');


/* ========================================
   js/missions.js - MISSIONS PAGE
   ======================================== */

const missionCards = document.querySelectorAll('.mission-card');
missionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

const missionAnimateElements = document.querySelectorAll('.mission-card');
missionAnimateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

missionAnimateElements.forEach(el => {
    missionObserver.observe(el);
});

console.log('Missions page loaded');


/* ========================================
   js/gallery.js - GALLERY PAGE
   ======================================== */

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.gallery-overlay h3').textContent;
        showNotification(`Viewing: ${title}`, 'success');
    });
});

const galleryAnimateElements = document.querySelectorAll('.gallery-item');
galleryAnimateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

galleryAnimateElements.forEach(el => {
    galleryObserver.observe(el);
});

console.log('Gallery page loaded');


/* ========================================
   js/about.js - ABOUT PAGE
   ======================================== */

console.log('About page loaded');


/* ========================================
   js/contact.js - CONTACT PAGE
   ======================================== */

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We will contact you soon.', 'success');
        contactForm.reset();
    });
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('click', (e) => {
        if (e.target.closest('button')) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Subscribed successfully! Welcome to the cosmos.', 'success');
                newsletterForm.reset();
            }
        }
    });
}

console.log('Contact page loaded');