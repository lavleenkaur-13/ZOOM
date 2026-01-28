console.log('Missions page loaded');
const missionCards = document.querySelectorAll('.mission-card');
missionCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.mission-title').textContent;
        showNotification(`Mission: ${title} - Loading details...`, 'loading');
    });
});