// Mobile optimization and section management
(function() {
    // Mobile-first responsive design
    function optimizeForMobile() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Ultra mobile-friendly styles */
            @media (max-width: 768px) {
                body { font-size: 10px !important; }
                .container { padding: 0 8px !important; }
                section { padding: 20px 0 !important; }
                
                /* Header optimization */
                .header { height: 50px !important; }
                .logo { height: 20px !important; }
                .brand-name { font-size: 12px !important; }
                .nav-menu a { font-size: 9px !important; }
                
                /* Hero section compact */
                .hero { padding: 40px 0 30px !important; min-height: 60vh !important; }
                .hero h1 { font-size: 1rem !important; line-height: 1.1 !important; margin-bottom: 6px !important; }
                .hero p { font-size: 0.6rem !important; margin-bottom: 4px !important; }
                .hero-tagline { font-size: 0.5rem !important; margin-bottom: 12px !important; }
                .btn-primary, .btn-secondary { padding: 4px 8px !important; font-size: 8px !important; }
                
                /* All sections compact */
                .section-title { font-size: 0.8rem !important; margin-bottom: 12px !important; }
                .vision-text { font-size: 0.5rem !important; line-height: 1.2 !important; }
                .vision-tagline { font-size: 0.6rem !important; }
                
                /* Categories ultra compact */
                .categories-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 6px !important; }
                .category-card { padding: 8px 4px !important; }
                .category-icon { font-size: 1.2rem !important; margin-bottom: 4px !important; }
                .category-card h3 { font-size: 0.5rem !important; margin-bottom: 2px !important; }
                .category-card p { font-size: 0.35rem !important; }
                
                /* Success stories compact */
                .success-stories { padding: 30px 0 !important; }
                .success-metrics { grid-template-columns: 1fr !important; gap: 10px !important; }
                .success-card { padding: 15px 10px !important; }
                .success-card h3 { font-size: 0.6rem !important; }
                .success-card div { font-size: 1rem !important; }
                .success-card p { font-size: 8px !important; }
                
                /* E-mandi compact */
                .e-mandi-text h2 { font-size: 0.8rem !important; }
                .e-mandi-text p { font-size: 0.4rem !important; }
                .e-mandi-text h3 { font-size: 0.6rem !important; }
                .feature-item { padding: 6px !important; }
                .feature-item span { font-size: 0.35rem !important; }
                .feature-icon { font-size: 1rem !important; }
                
                /* Hamburger menu compact */
                .hamburger { padding: 2px !important; }
                .hamburger span { width: 18px !important; height: 2px !important; margin: 2px 0 !important; }
            }
            
            @media (max-width: 480px) {
                body { font-size: 9px !important; }
                .hero h1 { font-size: 0.9rem !important; }
                .hero p { font-size: 0.5rem !important; }
                .section-title { font-size: 0.7rem !important; }
                .categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
                .category-icon { font-size: 1rem !important; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove unwanted sections
    function removeUnwantedSections() {
        // Remove "Why Choose Flonze?" if it exists
        const whyChooseSection = document.querySelector('h2:contains("Why Choose Flonze?")');
        if (whyChooseSection) {
            whyChooseSection.closest('section')?.remove();
        }
        
        // Remove "Traditional Selling vs Flonze Platform" if it exists
        const traditionalSection = document.querySelector('h2:contains("Traditional Selling vs Flonze Platform")');
        if (traditionalSection) {
            traditionalSection.closest('section')?.remove();
        }
        
        // Remove any comparison sections
        const comparisonSections = document.querySelectorAll('.comparison-section, .farmer-comparison');
        comparisonSections.forEach(section => section.remove());
    }
    
    // Make hamburger menu more compact and functional
    function optimizeHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }
    
    // Initialize all optimizations
    function init() {
        optimizeForMobile();
        removeUnwantedSections();
        optimizeHamburgerMenu();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run on window load and resize
    window.addEventListener('load', init);
    window.addEventListener('resize', optimizeForMobile);
})();