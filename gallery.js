console.log('Gallery page loaded');
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.gallery-overlay h3').textContent;
        showNotification(`Viewing: ${title}`, 'success');
    });
});