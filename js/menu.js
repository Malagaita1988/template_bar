document.addEventListener('DOMContentLoaded', function() {
    const menuNavButtons = document.querySelectorAll('.menu__nav-btn');
    const menuCategories = document.querySelectorAll('.menu__category');

    // Hide all categories initially except the first one
    menuCategories.forEach((category, index) => {
        if (index === 0) {
            category.style.display = 'grid';
            category.classList.add('active');
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        } else {
            category.style.display = 'none';
            category.classList.remove('active');
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
        }
        category.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    // Function to handle menu navigation
    function handleMenuNav(e) {
        const selectedCategory = e.target.dataset.category;

        // Update active button state
        menuNavButtons.forEach(btn => {
            btn.classList.remove('menu__nav-btn--active');
        });
        e.target.classList.add('menu__nav-btn--active');

        // Update visible category with smooth transitions
        menuCategories.forEach(category => {
            const categoryId = category.getAttribute('id');
            if (categoryId === selectedCategory) {
                // Show the selected category with animation
                category.style.display = 'grid';
                setTimeout(() => {
                    category.classList.add('active');
                    category.style.opacity = '1';
                    category.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide other categories with animation
                category.classList.remove('active');
                category.style.opacity = '0';
                category.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    category.style.display = 'none';
                }, 400); // Match the transition duration
            }
        });
    }

    // Add click event listeners to menu navigation buttons
    menuNavButtons.forEach(button => {
        button.addEventListener('click', handleMenuNav);
    });

    // Add hover effects to dish cards
    const dishCards = document.querySelectorAll('.dish-card');
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
            
            // Enhance image zoom effect
            const img = this.querySelector('.dish__img');
            if (img) img.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
            
            // Reset image zoom
            const img = this.querySelector('.dish__img');
            if (img) img.style.transform = 'scale(1)';
        });
    });
});