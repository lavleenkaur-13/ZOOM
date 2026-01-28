console.log('Contact page loaded');
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
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Subscribed successfully! Welcome to the cosmos.', 'success');
        newsletterForm.reset();
    });
}