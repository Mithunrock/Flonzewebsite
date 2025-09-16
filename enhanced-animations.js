// Enhanced animations with bigger text
(function() {
    'use strict';
    
    function applyEnhancedStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Bigger Text Sizes */
            body {
                font-size: 16px !important;
                line-height: 1.6 !important;
            }
            
            .hero h1 {
                font-size: clamp(2.5rem, 6vw, 4rem) !important;
                font-weight: 800 !important;
                margin-bottom: 20px !important;
                animation: titleGlow 3s ease-in-out infinite alternate !important;
            }
            
            .hero p {
                font-size: clamp(1.1rem, 3vw, 1.4rem) !important;
                margin-bottom: 16px !important;
                animation: textSlide 2s ease-out !important;
            }
            
            .hero-tagline {
                font-size: clamp(1rem, 2.5vw, 1.3rem) !important;
                margin-bottom: 30px !important;
                animation: taglineBounce 2s ease-out 0.5s both !important;
            }
            
            .section-title {
                font-size: clamp(2rem, 5vw, 3rem) !important;
                margin-bottom: 40px !important;
                animation: sectionTitleSlide 1.5s ease-out !important;
            }
            
            .vision-text {
                font-size: clamp(1rem, 2.5vw, 1.3rem) !important;
                line-height: 1.7 !important;
                animation: textFadeIn 2s ease-out !important;
            }
            
            .category-card h3 {
                font-size: clamp(1rem, 2vw, 1.2rem) !important;
                margin-bottom: 8px !important;
            }
            
            .category-card p {
                font-size: clamp(0.9rem, 1.5vw, 1rem) !important;
            }
            
            .e-mandi-text h2 {
                font-size: clamp(2rem, 4vw, 2.5rem) !important;
                animation: titlePulse 2s ease-in-out infinite !important;
            }
            
            .e-mandi-text p {
                font-size: clamp(1rem, 2vw, 1.2rem) !important;
            }
            
            .e-mandi-text h3 {
                font-size: clamp(1.2rem, 3vw, 1.5rem) !important;
            }
            
            .feature-item span {
                font-size: clamp(0.9rem, 1.5vw, 1rem) !important;
            }
            
            .nav-menu a {
                font-size: 16px !important;
            }
            
            .brand-name {
                font-size: 24px !important;
                animation: brandGlow 3s ease-in-out infinite alternate !important;
            }
            
            .btn-primary, .btn-secondary {
                font-size: 16px !important;
                padding: 12px 24px !important;
            }
            
            /* Enhanced Animations */
            @keyframes titleGlow {
                0% { 
                    text-shadow: 0 0 10px rgba(255,255,255,0.5);
                    transform: scale(1);
                }
                100% { 
                    text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(220,38,38,0.3);
                    transform: scale(1.02);
                }
            }
            
            @keyframes textSlide {
                0% {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes taglineBounce {
                0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.8);
                }
                60% {
                    transform: translateY(-10px) scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes sectionTitleSlide {
                0% {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes textFadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes titlePulse {
                0%, 100% {
                    transform: scale(1);
                    color: #16a34a;
                }
                50% {
                    transform: scale(1.05);
                    color: #dc2626;
                }
            }
            
            @keyframes brandGlow {
                0% {
                    color: #dc2626;
                    text-shadow: 0 0 5px rgba(220,38,38,0.3);
                }
                100% {
                    color: #b91c1c;
                    text-shadow: 0 0 15px rgba(220,38,38,0.6);
                }
            }
            
            @keyframes cardFloat {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
            
            @keyframes iconSpin {
                0% {
                    transform: rotate(0deg) scale(1);
                }
                25% {
                    transform: rotate(90deg) scale(1.1);
                }
                50% {
                    transform: rotate(180deg) scale(1);
                }
                75% {
                    transform: rotate(270deg) scale(1.1);
                }
                100% {
                    transform: rotate(360deg) scale(1);
                }
            }
            
            @keyframes numberCount {
                0% {
                    transform: scale(0.5);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes backgroundShift {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
            
            @keyframes wiggle {
                0%, 7% {
                    transform: rotateZ(0);
                }
                15% {
                    transform: rotateZ(-15deg);
                }
                20% {
                    transform: rotateZ(10deg);
                }
                25% {
                    transform: rotateZ(-10deg);
                }
                30% {
                    transform: rotateZ(6deg);
                }
                35% {
                    transform: rotateZ(-4deg);
                }
                40%, 100% {
                    transform: rotateZ(0);
                }
            }
            
            /* Apply Animations to Elements */
            .category-card {
                animation: cardFloat 3s ease-in-out infinite !important;
                transition: all 0.3s ease !important;
            }
            
            .category-card:nth-child(1) { animation-delay: 0s !important; }
            .category-card:nth-child(2) { animation-delay: 0.5s !important; }
            .category-card:nth-child(3) { animation-delay: 1s !important; }
            .category-card:nth-child(4) { animation-delay: 1.5s !important; }
            .category-card:nth-child(5) { animation-delay: 2s !important; }
            
            .category-icon {
                animation: iconSpin 4s ease-in-out infinite !important;
                font-size: 3rem !important;
                margin-bottom: 15px !important;
            }
            
            .success-card div[style*="font-size: 1.2rem"] {
                animation: numberCount 2s ease-out !important;
            }
            
            .feature-icon {
                animation: wiggle 2s ease-in-out infinite !important;
                font-size: 2rem !important;
            }
            
            .hero {
                background: linear-gradient(-45deg, #000000, #dc2626, #16a34a, #000000) !important;
                background-size: 400% 400% !important;
                animation: backgroundShift 8s ease infinite !important;
            }
            
            .success-card {
                animation: cardFloat 4s ease-in-out infinite !important;
            }
            
            .success-card:nth-child(1) { animation-delay: 0s !important; }
            .success-card:nth-child(2) { animation-delay: 1s !important; }
            .success-card:nth-child(3) { animation-delay: 2s !important; }
            
            /* Hover Enhancements */
            .category-card:hover {
                transform: translateY(-15px) scale(1.05) rotate(2deg) !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
                animation-play-state: paused !important;
            }
            
            .success-card:hover {
                transform: translateY(-15px) scale(1.1) !important;
                animation-play-state: paused !important;
            }
            
            .feature-item:hover {
                transform: translateY(-10px) scale(1.1) !important;
                background: rgba(255,255,255,0.3) !important;
            }
            
            .btn-primary:hover, .btn-secondary:hover {
                transform: translateY(-5px) scale(1.1) !important;
                animation: wiggle 0.5s ease-in-out !important;
            }
            
            .logo:hover {
                animation: iconSpin 1s ease-in-out !important;
            }
            
            /* Hamburger Menu Fix */
            .hamburger {
                display: none !important;
                flex-direction: column !important;
                cursor: pointer !important;
                padding: 8px !important;
                background: rgba(0,0,0,0.1) !important;
                border-radius: 4px !important;
                transition: all 0.3s ease !important;
            }
            
            .hamburger span {
                width: 25px !important;
                height: 3px !important;
                background: #000000 !important;
                margin: 3px 0 !important;
                transition: all 0.3s ease !important;
                border-radius: 2px !important;
                display: block !important;
            }
            
            .hamburger:hover {
                background: rgba(220, 38, 38, 0.1) !important;
            }
            
            .hamburger:hover span {
                background: #dc2626 !important;
            }
            
            /* Mobile Adjustments */
            @media (max-width: 768px) {
                body { font-size: 14px !important; }
                
                .hamburger {
                    display: flex !important;
                    z-index: 1001 !important;
                }
                
                .nav-menu {
                    position: fixed !important;
                    top: 70px !important;
                    left: -100% !important;
                    width: 100% !important;
                    height: calc(100vh - 70px) !important;
                    background: rgba(255, 255, 255, 0.98) !important;
                    backdrop-filter: blur(10px) !important;
                    flex-direction: column !important;
                    justify-content: flex-start !important;
                    align-items: center !important;
                    padding: 40px 20px !important;
                    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    z-index: 1000 !important;
                    box-shadow: 0 0 50px rgba(0,0,0,0.1) !important;
                    list-style: none !important;
                    margin: 0 !important;
                }
                
                .nav-menu.active {
                    left: 0 !important;
                }
                
                .nav-menu li {
                    margin: 20px 0 !important;
                    text-align: center !important;
                    opacity: 0 !important;
                    transform: translateY(30px) !important;
                    transition: all 0.3s ease !important;
                    width: 100% !important;
                }
                
                .nav-menu.active li {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                
                .nav-menu.active li:nth-child(1) { transition-delay: 0.1s !important; }
                .nav-menu.active li:nth-child(2) { transition-delay: 0.2s !important; }
                .nav-menu.active li:nth-child(3) { transition-delay: 0.3s !important; }
                .nav-menu.active li:nth-child(4) { transition-delay: 0.4s !important; }
                .nav-menu.active li:nth-child(5) { transition-delay: 0.5s !important; }
                .nav-menu.active li:nth-child(6) { transition-delay: 0.6s !important; }
                
                .nav-menu a {
                    font-size: 18px !important;
                    padding: 15px 30px !important;
                    display: block !important;
                    border-radius: 10px !important;
                    background: rgba(220, 38, 38, 0.1) !important;
                    color: #000000 !important;
                    text-decoration: none !important;
                    width: 100% !important;
                    max-width: 300px !important;
                    transition: all 0.3s ease !important;
                }
                
                .nav-menu a:hover {
                    background: rgba(220, 38, 38, 0.2) !important;
                    color: #dc2626 !important;
                    transform: scale(1.05) !important;
                }
                
                .hero h1 {
                    font-size: clamp(1.8rem, 8vw, 2.5rem) !important;
                }
                
                .hero p {
                    font-size: clamp(1rem, 4vw, 1.2rem) !important;
                }
                
                .section-title {
                    font-size: clamp(1.5rem, 6vw, 2rem) !important;
                }
                
                .vision-text {
                    font-size: clamp(0.9rem, 3vw, 1.1rem) !important;
                }
                
                .category-card h3 {
                    font-size: clamp(0.9rem, 3vw, 1rem) !important;
                }
                
                .category-card p {
                    font-size: clamp(0.8rem, 2.5vw, 0.9rem) !important;
                }
                
                .e-mandi-text h2 {
                    font-size: clamp(1.5rem, 5vw, 2rem) !important;
                }
                
                .e-mandi-text p {
                    font-size: clamp(0.9rem, 3vw, 1rem) !important;
                }
                
                .feature-item span {
                    font-size: clamp(0.8rem, 2.5vw, 0.9rem) !important;
                }
            }
            
            /* Section Visibility Fix */
            section {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 1 !important;
            }
            
            .footer {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                background: #f8f9fa !important;
                padding: 40px 0 20px !important;
                border-top: 2px solid #000000 !important;
            }
            
            .footer-content {
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
                gap: 30px !important;
                margin-bottom: 20px !important;
            }
            
            .footer-section h3, .footer-section h4 {
                color: #dc2626 !important;
                font-size: 1.2rem !important;
                margin-bottom: 15px !important;
            }
            
            .footer-section p, .footer-section a {
                color: #000000 !important;
                font-size: 1rem !important;
                text-decoration: none !important;
                margin-bottom: 8px !important;
            }
            
            .footer-section ul {
                list-style: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            
            .footer-section li {
                margin-bottom: 8px !important;
            }
            
            .footer-section a:hover {
                color: #dc2626 !important;
                text-decoration: underline !important;
            }
            
            .footer-bottom {
                text-align: center !important;
                padding-top: 20px !important;
                border-top: 1px solid #000000 !important;
                color: #666 !important;
                font-size: 0.9rem !important;
            }
            
            /* Scroll Animations */
            .animate-on-scroll {
                opacity: 0 !important;
                transform: translateY(50px) !important;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            .animate-on-scroll.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Loading Animation */
            .loading-dots::after {
                content: '...' !important;
                animation: loadingDots 2s infinite !important;
            }
            
            @keyframes loadingDots {
                0%, 20% { content: '.' !important; }
                40% { content: '..' !important; }
                60%, 100% { content: '...' !important; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced Scroll Animations
    function initEnhancedScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.category-card, .success-card, .feature-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animation = `cardFloat 3s ease-in-out infinite`;
                            child.style.animationDelay = `${index * 0.2}s`;
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    }
    
    // Particle Animation
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            hero.appendChild(particle);
        }
        
        const particleStyle = document.createElement('style');
        particleStyle.innerHTML = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
    
    // Enhanced Hamburger Menu Functionality
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            // Make sure hamburger is visible
            hamburger.style.display = 'flex';
            hamburger.style.flexDirection = 'column';
            hamburger.style.cursor = 'pointer';
            hamburger.style.padding = '8px';
            hamburger.style.background = 'rgba(0,0,0,0.1)';
            hamburger.style.borderRadius = '4px';
            
            // Style hamburger spans
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.width = '25px';
                span.style.height = '3px';
                span.style.background = '#000000';
                span.style.margin = '3px 0';
                span.style.transition = 'all 0.3s ease';
                span.style.borderRadius = '2px';
                span.style.display = 'block';
            });
            
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
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
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
            
            // Close menu when clicking on menu items
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                });
            });
        }
    }
    
    // Initialize all enhancements
    function init() {
        applyEnhancedStyles();
        initEnhancedScrollAnimations();
        initHamburgerMenu();
        createParticles();
        
        // Add click animations
        document.addEventListener('click', function(e) {
            if (e.target.matches('.btn-primary, .btn-secondary, .category-card, .success-card')) {
                e.target.style.animation = 'wiggle 0.5s ease-in-out';
                setTimeout(() => {
                    e.target.style.animation = '';
                }, 500);
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', init);
})();