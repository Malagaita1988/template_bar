document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll) with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100,
        delay: 100
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add header scroll effect with improved transitions
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Hide header when scrolling down past threshold
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
        lastScroll = currentScroll;

        // Add sticky class with shadow effect
        if (currentScroll > 0) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    });

    // Add hover effect for navigation items
    const navItems = document.querySelectorAll('.nav__item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }
    
    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.classList.add('scroll-top-btn');
    document.body.appendChild(scrollTopBtn);
    
    // Style the scroll-to-top button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.backgroundColor = 'var(--secondary-color)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    scrollTopBtn.style.transform = 'translateY(20px)';
    scrollTopBtn.style.zIndex = '999';
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Add click event to scroll-to-top button
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to scroll-to-top button
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
        scrollTopBtn.style.transform = 'translateY(-3px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.backgroundColor = 'var(--secondary-color)';
        scrollTopBtn.style.transform = 'translateY(0)';
    });
});