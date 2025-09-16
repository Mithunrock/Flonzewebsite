// Safe animations with error handling
(function() {
    'use strict';
    
    // Error handling wrapper
    function safeExecute(fn, errorMsg) {
        try {
            return fn();
        } catch (error) {
            console.warn(errorMsg, error);
            return null;
        }
    }
    
    function createSafeAnimations() {
        safeExecute(() => {
            const style = document.createElement('style');
            style.innerHTML = `
                /* Safe Global Animations */
                * {
                    transition: all 0.3s ease !important;
                }
                
                /* Header Safe Animation */
                .header {
                    background: rgba(255,255,255,0.95) !important;
                    backdrop-filter: blur(10px) !important;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
                    animation: headerSlide 1s ease-out !important;
                }
                
                .logo {
                    animation: logoFloat 3s ease-in-out infinite !important;
                }
                
                .brand-name {
                    color: #dc2626 !important;
                    animation: brandPulse 2s ease-in-out infinite !important;
                }
                
                .nav-menu a:hover {
                    color: #dc2626 !important;
                    transform: translateY(-2px) !important;
                }
                
                .cart-count {
                    background: #dc2626 !important;
                    color: white !important;
                    animation: pulse 2s ease-in-out infinite !important;
                }
                
                /* Hero Safe Animations */
                .hero {
                    background: linear-gradient(135deg, #000000, #dc2626, #16a34a) !important;
                    background-size: 300% 300% !important;
                    animation: gradientMove 6s ease infinite !important;
                }
                
                .hero h1 {
                    animation: titleFade 1.5s ease-out !important;
                    text-shadow: 0 2px 10px rgba(255,255,255,0.3) !important;
                }
                
                .hero p {
                    animation: textSlide 1.5s ease-out 0.3s both !important;
                }
                
                .hero-tagline {
                    animation: taglineGlow 1.5s ease-out 0.6s both !important;
                    background: rgba(255,255,255,0.1) !important;
                    padding: 8px 16px !important;
                    border-radius: 20px !important;
                    backdrop-filter: blur(5px) !important;
                }
                
                .btn-primary, .btn-secondary {
                    animation: buttonFloat 2s ease-in-out infinite !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                .btn-primary:hover, .btn-secondary:hover {
                    transform: translateY(-3px) scale(1.05) !important;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important;
                }
                
                /* Section Safe Animations */
                .section-title {
                    animation: titleSlide 1s ease-out !important;
                    color: #dc2626 !important;
                }
                
                .vision-text {
                    animation: textFade 1.5s ease-out !important;
                }
                
                /* Category Cards Safe */
                .category-card {
                    animation: cardSlide 1s ease-out !important;
                    transition: all 0.3s ease !important;
                    border: 2px solid #000000 !important;
                }
                
                .category-card:nth-child(1) { animation-delay: 0.1s !important; }
                .category-card:nth-child(2) { animation-delay: 0.2s !important; }
                .category-card:nth-child(3) { animation-delay: 0.3s !important; }
                .category-card:nth-child(4) { animation-delay: 0.4s !important; }
                .category-card:nth-child(5) { animation-delay: 0.5s !important; }
                
                .category-icon {
                    animation: iconBounce 2s ease-in-out infinite !important;
                    font-size: 3rem !important;
                }
                
                .category-card:hover {
                    transform: translateY(-10px) scale(1.03) !important;
                    border-color: #dc2626 !important;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
                }
                
                /* Success Cards Safe */
                .success-card {
                    animation: successFloat 3s ease-in-out infinite !important;
                    transition: all 0.3s ease !important;
                }
                
                .success-card:nth-child(1) { animation-delay: 0s !important; }
                .success-card:nth-child(2) { animation-delay: 1s !important; }
                .success-card:nth-child(3) { animation-delay: 2s !important; }
                
                .success-card:hover {
                    transform: translateY(-8px) scale(1.05) !important;
                    background: rgba(255,255,255,0.2) !important;
                }
                
                /* E-Mandi Safe */
                .e-mandi {
                    background: linear-gradient(135deg, #16a34a, #059669) !important;
                }
                
                .e-mandi-text h2 {
                    animation: titleBounce 1.5s ease-out !important;
                    color: white !important;
                }
                
                .feature-item {
                    background: rgba(255,255,255,0.1) !important;
                    backdrop-filter: blur(5px) !important;
                    border: 1px solid rgba(255,255,255,0.2) !important;
                    animation: featureSlide 2s ease-in-out infinite !important;
                    transition: all 0.3s ease !important;
                }
                
                .feature-item:nth-child(1) { animation-delay: 0s !important; }
                .feature-item:nth-child(2) { animation-delay: 0.5s !important; }
                .feature-item:nth-child(3) { animation-delay: 1s !important; }
                .feature-item:nth-child(4) { animation-delay: 1.5s !important; }
                
                .feature-item:hover {
                    transform: translateY(-5px) scale(1.05) !important;
                    background: rgba(255,255,255,0.2) !important;
                }
                
                .feature-icon {
                    animation: iconSpin 3s ease-in-out infinite !important;
                    font-size: 2rem !important;
                }
                
                /* Footer Safe */
                .footer {
                    animation: footerFade 1s ease-out !important;
                    background: #f8f9fa !important;
                    border-top: 2px solid #000000 !important;
                }
                
                .footer-section a:hover {
                    color: #dc2626 !important;
                    text-decoration: underline !important;
                }
                
                /* Safe Keyframes */
                @keyframes headerSlide {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes logoFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                
                @keyframes brandPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes gradientMove {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes titleFade {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes textSlide {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes taglineGlow {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes buttonFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                
                @keyframes titleSlide {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes textFade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes cardSlide {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes iconBounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                
                @keyframes successFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                
                @keyframes titleBounce {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes featureSlide {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                
                @keyframes iconSpin {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(5deg); }
                }
                
                @keyframes footerFade {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                /* Mobile Safe */
                @media (max-width: 768px) {
                    .hamburger {
                        display: flex !important;
                        flex-direction: column !important;
                        cursor: pointer !important;
                        padding: 5px !important;
                    }
                    
                    .hamburger span {
                        width: 20px !important;
                        height: 2px !important;
                        background: #000000 !important;
                        margin: 2px 0 !important;
                        transition: 0.3s !important;
                    }
                    
                    .nav-menu {
                        position: fixed !important;
                        top: 60px !important;
                        left: -100% !important;
                        width: 100% !important;
                        height: calc(100vh - 60px) !important;
                        background: rgba(255,255,255,0.95) !important;
                        backdrop-filter: blur(10px) !important;
                        flex-direction: column !important;
                        padding: 20px !important;
                        transition: left 0.3s ease !important;
                        z-index: 999 !important;
                    }
                    
                    .nav-menu.active {
                        left: 0 !important;
                    }
                    
                    .nav-menu li {
                        margin: 10px 0 !important;
                        text-align: center !important;
                    }
                    
                    .nav-menu a {
                        font-size: 16px !important;
                        padding: 10px !important;
                        display: block !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }, 'Animation styles failed to load');
    }
    
    // Safe hamburger menu
    function initSafeHamburger() {
        safeExecute(() => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    
                    const spans = hamburger.querySelectorAll('span');
                    if (hamburger.classList.contains('active')) {
                        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                        spans[1].style.opacity = '0';
                        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        spans.forEach(span => {
                            span.style.transform = 'none';
                            span.style.opacity = '1';
                        });
                    }
                });
                
                document.addEventListener('click', function(e) {
                    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        
                        const spans = hamburger.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.transform = 'none';
                            span.style.opacity = '1';
                        });
                    }
                });
            }
        }, 'Hamburger menu failed to initialize');
    }
    
    // Safe scroll animations
    function initSafeScrollAnimations() {
        safeExecute(() => {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, { threshold: 0.1 });
                
                document.querySelectorAll('section').forEach(section => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(30px)';
                    section.style.transition = 'all 0.6s ease';
                    observer.observe(section);
                });
            }
        }, 'Scroll animations failed to initialize');
    }
    
    // Initialize safely
    function init() {
        createSafeAnimations();
        initSafeHamburger();
        initSafeScrollAnimations();
    }
    
    // Safe initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Prevent errors from breaking the page
    window.addEventListener('error', function(e) {
        console.warn('Animation error caught:', e.error);
        return true;
    });
    
})();