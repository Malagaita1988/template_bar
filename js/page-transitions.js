document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class to main content
    const mainContent = document.querySelector('.main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }
    
    // Handle internal link clicks for smooth page transitions
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links that aren't hash links
        if (link.href.includes(window.location.origin) && !link.href.includes('#') && !link.getAttribute('target')) {
            link.addEventListener('click', e => {
                e.preventDefault();
                const destination = link.href;
                
                // Fade out current page
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate to new page after transition
                setTimeout(() => {
                    window.location.href = destination;
                }, 300);
            });
        }
    });
    
    // Ensure page fades in when loaded
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
});