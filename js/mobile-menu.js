document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu elements
    const createMobileMenu = () => {
        // Create hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'mobile-menu__toggle';
        hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
        hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // Style hamburger button
        hamburgerBtn.style.display = 'none'; // Hidden by default, will show in media query
        hamburgerBtn.style.background = 'transparent';
        hamburgerBtn.style.border = 'none';
        hamburgerBtn.style.cursor = 'pointer';
        hamburgerBtn.style.padding = '10px';
        hamburgerBtn.style.zIndex = '1001';
        hamburgerBtn.style.position = 'relative';
        
        // Style the hamburger lines
        const spans = hamburgerBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.display = 'block';
            span.style.width = '25px';
            span.style.height = '3px';
            span.style.margin = '5px 0';
            span.style.backgroundColor = 'var(--primary-color)';
            span.style.transition = 'all 0.3s ease';
        });
        
        // Add media query styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu__toggle {
                    display: block !important;
                }
                
                .header__nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 80%;
                    height: 100vh;
                    background-color: var(--header-bg);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    padding: 80px 20px 20px;
                    transition: right 0.3s ease;
                    z-index: 1000;
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                    overflow-y: auto;
                }
                
                .header__nav.active {
                    right: 0;
                }
                
                .nav__list {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .nav__item {
                    margin: 10px 0;
                    width: 100%;
                }
                
                .nav__link {
                    display: block;
                    padding: 10px 0;
                    font-size: 1.2rem;
                }
                
                .mobile-menu__toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 6px);
                }
                
                .mobile-menu__toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu__toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -6px);
                }
                
                body.menu-open {
                    overflow: hidden;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Get header elements
        const header = document.querySelector('.header__container');
        const nav = document.querySelector('.header__nav');
        
        // Insert hamburger button before nav
        header.insertBefore(hamburgerBtn, nav);
        
        // Add click event to hamburger button
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !hamburgerBtn.contains(e.target) && nav.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    };
    
    // Initialize mobile menu
    createMobileMenu();
});