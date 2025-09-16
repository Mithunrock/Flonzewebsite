// Advanced comprehensive website fixes
(function() {
    'use strict';
    
    function applyAdvancedFixes() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Advanced Global Fixes */
            * {
                box-sizing: border-box !important;
                max-width: 100% !important;
                word-wrap: break-word !important;
            }
            
            html, body {
                overflow-x: hidden !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                scroll-behavior: smooth !important;
            }
            
            /* Enhanced Typography */
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
                font-size: 12px !important;
                line-height: 1.4 !important;
                color: #000000 !important;
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
            }
            
            /* Advanced Header */
            .header {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 1000 !important;
                background: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(10px) !important;
                border-bottom: 2px solid #000000 !important;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
                height: 60px !important;
                transition: all 0.3s ease !important;
            }
            
            .header:hover {
                background: rgba(255, 255, 255, 1) !important;
                box-shadow: 0 6px 30px rgba(0,0,0,0.15) !important;
            }
            
            /* Logo and Brand */
            .logo {
                height: 30px !important;
                width: auto !important;
                transition: transform 0.3s ease !important;
            }
            
            .logo:hover {
                transform: scale(1.1) rotate(5deg) !important;
            }
            
            .brand-name {
                font-size: 16px !important;
                font-weight: 700 !important;
                color: #dc2626 !important;
                transition: all 0.3s ease !important;
            }
            
            .brand-name:hover {
                color: #b91c1c !important;
                text-shadow: 0 2px 4px rgba(220, 38, 38, 0.3) !important;
            }
            
            /* Enhanced Navigation */
            .nav-menu {
                display: flex !important;
                list-style: none !important;
                margin: 0 !important;
                padding: 0 !important;
                gap: 20px !important;
            }
            
            .nav-menu a {
                color: #000000 !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                font-size: 12px !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
                transition: all 0.3s ease !important;
                position: relative !important;
            }
            
            .nav-menu a::before {
                content: '' !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 50% !important;
                width: 0 !important;
                height: 2px !important;
                background: #dc2626 !important;
                transition: all 0.3s ease !important;
                transform: translateX(-50%) !important;
            }
            
            .nav-menu a:hover {
                color: #dc2626 !important;
                background: rgba(220, 38, 38, 0.1) !important;
                transform: translateY(-2px) !important;
            }
            
            .nav-menu a:hover::before {
                width: 100% !important;
            }
            
            /* Cart Count Animation */
            .cart-count {
                background: #dc2626 !important;
                color: white !important;
                border-radius: 50% !important;
                padding: 2px 6px !important;
                font-size: 10px !important;
                font-weight: 700 !important;
                margin-left: 4px !important;
                animation: pulse 2s infinite !important;
            }
            
            /* Enhanced Buttons */
            .btn-primary, .btn-secondary {
                padding: 10px 20px !important;
                border-radius: 8px !important;
                font-size: 12px !important;
                font-weight: 600 !important;
                text-decoration: none !important;
                display: inline-block !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                position: relative !important;
                overflow: hidden !important;
                border: 2px solid transparent !important;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
                color: white !important;
                border-color: #dc2626 !important;
                box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3) !important;
            }
            
            .btn-primary:hover {
                background: linear-gradient(135deg, #b91c1c, #991b1b) !important;
                transform: translateY(-3px) scale(1.05) !important;
                box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4) !important;
            }
            
            .btn-secondary {
                background: linear-gradient(135deg, #16a34a, #15803d) !important;
                color: white !important;
                border-color: #16a34a !important;
                box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3) !important;
            }
            
            .btn-secondary:hover {
                background: linear-gradient(135deg, #15803d, #166534) !important;
                transform: translateY(-3px) scale(1.05) !important;
                box-shadow: 0 8px 25px rgba(22, 163, 74, 0.4) !important;
            }
            
            /* Hero Section Enhancements */
            .hero {
                background: linear-gradient(135deg, #000000 0%, #dc2626 50%, #16a34a 100%) !important;
                color: white !important;
                padding: 80px 0 60px !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .hero::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="30" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="70" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>') !important;
                animation: float 20s infinite linear !important;
            }
            
            .hero h1 {
                font-size: clamp(1.2rem, 4vw, 2rem) !important;
                font-weight: 800 !important;
                margin-bottom: 16px !important;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
                animation: slideInDown 1s ease !important;
            }
            
            .hero p {
                font-size: clamp(0.7rem, 2vw, 1rem) !important;
                margin-bottom: 12px !important;
                opacity: 0.95 !important;
                animation: slideInUp 1s ease 0.2s both !important;
            }
            
            .hero-tagline {
                font-size: clamp(0.6rem, 1.5vw, 0.9rem) !important;
                margin-bottom: 24px !important;
                animation: slideInUp 1s ease 0.4s both !important;
            }
            
            .hero-buttons {
                animation: slideInUp 1s ease 0.6s both !important;
            }
            
            /* Enhanced Cards */
            .category-card {
                background: white !important;
                border: 2px solid #000000 !important;
                border-radius: 12px !important;
                padding: 20px 15px !important;
                text-align: center !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                cursor: pointer !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .category-card::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.1), transparent) !important;
                transition: left 0.5s ease !important;
            }
            
            .category-card:hover::before {
                left: 100% !important;
            }
            
            .category-card:hover {
                transform: translateY(-8px) scale(1.03) !important;
                border-color: #dc2626 !important;
                box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
            }
            
            .category-icon {
                font-size: 2.5rem !important;
                margin-bottom: 12px !important;
                display: block !important;
                animation: bounce 2s infinite !important;
            }
            
            .category-card h3 {
                font-size: 0.8rem !important;
                font-weight: 600 !important;
                color: #dc2626 !important;
                margin-bottom: 6px !important;
            }
            
            .category-card p {
                font-size: 0.6rem !important;
                color: #666 !important;
                margin: 0 !important;
            }
            
            /* Success Cards Enhancement */
            .success-card {
                transition: all 0.4s ease !important;
                cursor: pointer !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .success-card::after {
                content: '' !important;
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                width: 0 !important;
                height: 0 !important;
                background: rgba(255,255,255,0.1) !important;
                border-radius: 50% !important;
                transform: translate(-50%, -50%) !important;
                transition: all 0.5s ease !important;
            }
            
            .success-card:hover::after {
                width: 300px !important;
                height: 300px !important;
            }
            
            .success-card:hover {
                transform: translateY(-8px) scale(1.05) !important;
                background: rgba(255, 255, 255, 0.2) !important;
            }
            
            /* Feature Items Enhancement */
            .feature-item {
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 10px !important;
                padding: 12px !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
            }
            
            .feature-item:hover {
                background: rgba(255, 255, 255, 0.2) !important;
                transform: translateY(-5px) !important;
                border-color: rgba(255, 255, 255, 0.4) !important;
            }
            
            .feature-icon {
                font-size: 1.5rem !important;
                margin-bottom: 8px !important;
                animation: rotate 4s infinite linear !important;
            }
            
            .feature-item span {
                font-size: 0.6rem !important;
                font-weight: 500 !important;
            }
            
            /* Mobile Optimizations */
            @media (max-width: 768px) {
                body { font-size: 10px !important; }
                
                .header { height: 50px !important; }
                .logo { height: 25px !important; }
                .brand-name { font-size: 14px !important; }
                
                .hero { padding: 60px 0 40px !important; }
                
                .categories-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 12px !important;
                }
                
                .category-card {
                    padding: 15px 10px !important;
                }
                
                .category-icon {
                    font-size: 2rem !important;
                }
                
                .success-metrics {
                    grid-template-columns: 1fr !important;
                    gap: 15px !important;
                }
                
                .e-mandi-features {
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 10px !important;
                }
                
                /* Mobile Menu */
                .hamburger {
                    display: flex !important;
                    flex-direction: column !important;
                    cursor: pointer !important;
                    padding: 5px !important;
                    z-index: 1001 !important;
                }
                
                .hamburger span {
                    width: 22px !important;
                    height: 2px !important;
                    background: #000000 !important;
                    margin: 2px 0 !important;
                    transition: all 0.3s ease !important;
                    border-radius: 1px !important;
                }
                
                .nav-menu {
                    position: fixed !important;
                    top: 50px !important;
                    left: -100% !important;
                    width: 100% !important;
                    height: calc(100vh - 50px) !important;
                    background: rgba(255, 255, 255, 0.98) !important;
                    backdrop-filter: blur(10px) !important;
                    flex-direction: column !important;
                    padding: 30px 20px !important;
                    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    z-index: 999 !important;
                    box-shadow: 0 0 50px rgba(0,0,0,0.1) !important;
                }
                
                .nav-menu.active {
                    left: 0 !important;
                }
                
                .nav-menu li {
                    margin: 15px 0 !important;
                    text-align: center !important;
                    opacity: 0 !important;
                    transform: translateY(20px) !important;
                    animation: slideInMenu 0.3s ease forwards !important;
                }
                
                .nav-menu.active li:nth-child(1) { animation-delay: 0.1s !important; }
                .nav-menu.active li:nth-child(2) { animation-delay: 0.2s !important; }
                .nav-menu.active li:nth-child(3) { animation-delay: 0.3s !important; }
                .nav-menu.active li:nth-child(4) { animation-delay: 0.4s !important; }
                .nav-menu.active li:nth-child(5) { animation-delay: 0.5s !important; }
                .nav-menu.active li:nth-child(6) { animation-delay: 0.6s !important; }
                
                .nav-menu a {
                    font-size: 16px !important;
                    padding: 15px 20px !important;
                    display: block !important;
                    border-radius: 10px !important;
                }
            }
            
            /* Advanced Animations */
            @keyframes slideInDown {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideInMenu {
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                40%, 43% { transform: translate3d(0,-10px,0); }
                70% { transform: translate3d(0,-5px,0); }
                90% { transform: translate3d(0,-2px,0); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes float {
                from { transform: translateX(-100px); }
                to { transform: translateX(calc(100vw + 100px)); }
            }
            
            /* Scroll Animations */
            .animate-on-scroll {
                opacity: 0 !important;
                transform: translateY(30px) !important;
                transition: all 0.6s ease !important;
            }
            
            .animate-on-scroll.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced Hamburger Menu
    function initAdvancedHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                const spans = hamburger.querySelectorAll('span');
                if (hamburger.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    document.body.style.overflow = 'hidden';
                } else {
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                    document.body.style.overflow = 'auto';
                }
            });
            
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    const spans = hamburger.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
        }
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    }
    
    // Initialize all advanced features
    function init() {
        applyAdvancedFixes();
        initAdvancedHamburger();
        initScrollAnimations();
        
        // Add smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', init);
})();