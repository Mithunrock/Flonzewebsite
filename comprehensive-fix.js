// Comprehensive website fixes
(function() {
    'use strict';
    
    // Fix all issues and add enhancements
    function applyComprehensiveFixes() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Global Fixes */
            * {
                box-sizing: border-box !important;
                max-width: 100% !important;
            }
            
            html, body {
                overflow-x: hidden !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* Smooth Animations */
            * {
                transition: all 0.3s ease !important;
            }
            
            /* Header Fixes */
            .header {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 1000 !important;
                background: white !important;
                border-bottom: 2px solid black !important;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
            }
            
            /* Navigation Fixes */
            .nav-menu a {
                color: black !important;
                font-weight: 500 !important;
                text-decoration: none !important;
            }
            
            .nav-menu a:hover {
                color: #dc2626 !important;
                transform: translateY(-2px) !important;
            }
            
            /* Button Fixes */
            .btn-primary {
                background: #dc2626 !important;
                color: white !important;
                border: 2px solid #dc2626 !important;
                padding: 8px 16px !important;
                border-radius: 6px !important;
                font-size: 11px !important;
                text-decoration: none !important;
                display: inline-block !important;
                transition: all 0.3s ease !important;
            }
            
            .btn-primary:hover {
                background: #b91c1c !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3) !important;
            }
            
            .btn-secondary {
                background: #16a34a !important;
                color: white !important;
                border: 2px solid #16a34a !important;
                padding: 8px 16px !important;
                border-radius: 6px !important;
                font-size: 11px !important;
                text-decoration: none !important;
                display: inline-block !important;
                transition: all 0.3s ease !important;
            }
            
            .btn-secondary:hover {
                background: #15803d !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3) !important;
            }
            
            /* Card Hover Effects */
            .category-card {
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                border: 2px solid black !important;
            }
            
            .category-card:hover {
                transform: translateY(-5px) scale(1.02) !important;
                box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
                border-color: #dc2626 !important;
            }
            
            .success-card {
                transition: all 0.3s ease !important;
                cursor: pointer !important;
            }
            
            .success-card:hover {
                transform: translateY(-5px) scale(1.05) !important;
                background: rgba(255, 255, 255, 0.2) !important;
            }
            
            /* Feature Items Animation */
            .feature-item {
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                padding: 8px !important;
                border-radius: 8px !important;
            }
            
            .feature-item:hover {
                background: rgba(255, 255, 255, 0.1) !important;
                transform: translateY(-3px) !important;
            }
            
            /* Mobile Optimizations */
            @media (max-width: 768px) {
                body { font-size: 10px !important; }
                .container { padding: 0 10px !important; }
                section { padding: 30px 0 !important; }
                
                .hero {
                    padding: 50px 0 30px !important;
                    min-height: 60vh !important;
                }
                
                .hero h1 {
                    font-size: 1.2rem !important;
                    line-height: 1.2 !important;
                    margin-bottom: 8px !important;
                }
                
                .hero p {
                    font-size: 0.7rem !important;
                    margin-bottom: 6px !important;
                }
                
                .hero-tagline {
                    font-size: 0.6rem !important;
                    margin-bottom: 15px !important;
                }
                
                .section-title {
                    font-size: 1rem !important;
                    margin-bottom: 15px !important;
                }
                
                .vision-text {
                    font-size: 0.6rem !important;
                    line-height: 1.3 !important;
                }
                
                .categories-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 10px !important;
                }
                
                .category-card {
                    padding: 10px 8px !important;
                }
                
                .category-icon {
                    font-size: 1.5rem !important;
                    margin-bottom: 5px !important;
                }
                
                .category-card h3 {
                    font-size: 0.6rem !important;
                    margin-bottom: 3px !important;
                }
                
                .category-card p {
                    font-size: 0.4rem !important;
                }
                
                .success-metrics {
                    grid-template-columns: 1fr !important;
                    gap: 15px !important;
                }
                
                .success-card {
                    padding: 15px 10px !important;
                }
                
                .e-mandi-text h2 {
                    font-size: 1rem !important;
                }
                
                .e-mandi-text p {
                    font-size: 0.5rem !important;
                }
                
                .e-mandi-text h3 {
                    font-size: 0.7rem !important;
                }
                
                .feature-item span {
                    font-size: 0.4rem !important;
                }
                
                .hamburger {
                    display: flex !important;
                    flex-direction: column !important;
                    cursor: pointer !important;
                    padding: 5px !important;
                }
                
                .hamburger span {
                    width: 20px !important;
                    height: 2px !important;
                    background: black !important;
                    margin: 2px 0 !important;
                    transition: 0.3s !important;
                }
                
                .nav-menu {
                    position: fixed !important;
                    top: 60px !important;
                    left: -100% !important;
                    width: 100% !important;
                    height: calc(100vh - 60px) !important;
                    background: white !important;
                    flex-direction: column !important;
                    padding: 20px !important;
                    transition: left 0.3s ease !important;
                    z-index: 999 !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
                }
                
                .nav-menu.active {
                    left: 0 !important;
                }
                
                .nav-menu li {
                    margin: 10px 0 !important;
                    text-align: center !important;
                }
                
                .nav-menu a {
                    font-size: 12px !important;
                    padding: 10px !important;
                    display: block !important;
                }
            }
            
            /* Cursor Fix */
            * {
                caret-color: red !important;
            }
            
            input, textarea, [contenteditable] {
                caret-color: red !important;
                color: black !important;
                background: white !important;
            }
            
            ::selection {
                background: red !important;
                color: white !important;
            }
            
            /* Loading Animation */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .hero-content {
                animation: fadeInUp 1s ease !important;
            }
            
            .category-card {
                animation: fadeInUp 0.6s ease !important;
            }
            
            .success-card {
                animation: fadeInUp 0.8s ease !important;
            }
            
            /* Pulse Animation for Icons */
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .category-icon {
                animation: pulse 2s infinite !important;
            }
            
            .feature-icon {
                animation: pulse 3s infinite !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Hamburger Menu Functionality
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Animate hamburger lines
                const spans = hamburger.querySelectorAll('span');
                if (hamburger.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
    }
    
    // Smooth Scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }
    
    // Initialize all fixes
    function init() {
        applyComprehensiveFixes();
        initHamburgerMenu();
        initSmoothScrolling();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run on window load
    window.addEventListener('load', init);
})();