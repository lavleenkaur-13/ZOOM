console.log('Home page loaded');
// Home specific interactions
const heroExploreBtn = document.getElementById('heroExploreBtn');
if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', () => {
        document.getElementById('registerModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}