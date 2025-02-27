document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter__btn');
    const galleryItems = document.querySelectorAll('.gallery__item');
    const galleryGrid = document.querySelector('.gallery__grid');

    // Initialize with all items visible and proper styles
    galleryItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // Ensure gallery grid is visible
    if (galleryGrid) {
        galleryGrid.style.opacity = '1';
        galleryGrid.style.transform = 'translateY(0)';
        galleryGrid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }

    // Function to handle filter button clicks
    function handleFilter(e) {
        const filter = e.target.dataset.filter;

        // Update active button state
        filterButtons.forEach(btn => {
            btn.classList.remove('filter__btn--active');
        });
        e.target.classList.add('filter__btn--active');

        // Prepare for transition
        galleryGrid.style.opacity = '0.5';
        galleryGrid.style.transform = 'translateY(10px)';

        // Filter items with improved animation
        setTimeout(() => {
            let visibleCount = 0;
            
            galleryItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    visibleCount++;
                    
                    // Staggered animation for items appearing
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50 * (index % 4)); // Stagger based on position
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Show grid again with adjusted height if needed
            setTimeout(() => {
                galleryGrid.style.opacity = '1';
                galleryGrid.style.transform = 'translateY(0)';
            }, 100);
        }, 300);
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });

    // Enhanced hover effects for gallery items
    galleryItems.forEach(item => {
        item.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease';
        
        const overlay = item.querySelector('.gallery__overlay');
        const img = item.querySelector('.gallery__img');

        item.addEventListener('mouseenter', function() {
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
            if (img) img.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            }
            if (img) img.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });
});