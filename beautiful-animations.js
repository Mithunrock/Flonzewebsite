// Beautiful animations for all sections
(function() {
    'use strict';
    
    function createBeautifulAnimations() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Beautiful Global Animations */
            * {
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            /* Header Beautiful Animation */
            .header {
                background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95)) !important;
                backdrop-filter: blur(20px) !important;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
                animation: headerSlideDown 1s ease-out !important;
            }
            
            .logo {
                animation: logoSpin 3s ease-in-out infinite !important;
                filter: drop-shadow(0 4px 8px rgba(220,38,38,0.3)) !important;
            }
            
            .brand-name {
                background: linear-gradient(45deg, #dc2626, #16a34a, #dc2626) !important;
                background-size: 200% 200% !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                animation: gradientShift 3s ease-in-out infinite !important;
            }
            
            .nav-menu a {
                position: relative !important;
                overflow: hidden !important;
            }
            
            .nav-menu a::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(220,38,38,0.2), transparent) !important;
                transition: left 0.5s ease !important;
            }
            
            .nav-menu a:hover::before {
                left: 100% !important;
            }
            
            .cart-count {
                animation: heartbeat 2s ease-in-out infinite !important;
                background: linear-gradient(45deg, #dc2626, #b91c1c) !important;
                box-shadow: 0 0 20px rgba(220,38,38,0.5) !important;
            }
            
            /* Hero Section Beautiful Animations */
            .hero {
                background: linear-gradient(-45deg, #000000, #dc2626, #16a34a, #000000, #dc2626) !important;
                background-size: 400% 400% !important;
                animation: heroGradient 8s ease infinite !important;
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
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)" opacity="0.5"><animate attributeName="cy" values="20;80;20" dur="3s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="1.5" fill="rgba(255,255,255,0.1)" opacity="0.7"><animate attributeName="cy" values="30;70;30" dur="4s" repeatCount="indefinite"/></circle><circle cx="40" cy="70" r="1" fill="rgba(255,255,255,0.1)" opacity="0.6"><animate attributeName="cy" values="70;20;70" dur="5s" repeatCount="indefinite"/></circle></svg>') !important;
                animation: particleFloat 20s linear infinite !important;
            }
            
            .hero h1 {
                animation: titleMagic 2s ease-out !important;
                text-shadow: 0 0 30px rgba(255,255,255,0.5) !important;
                background: linear-gradient(45deg, #ffffff, #f0f9ff, #ffffff) !important;
                background-size: 200% 200% !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }
            
            .hero p {
                animation: textReveal 2s ease-out 0.5s both !important;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
            }
            
            .hero-tagline {
                animation: taglineGlow 2s ease-out 1s both !important;
                background: rgba(255,255,255,0.1) !important;
                padding: 10px 20px !important;
                border-radius: 25px !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
            }
            
            .btn-primary, .btn-secondary {
                position: relative !important;
                overflow: hidden !important;
                transform: perspective(1000px) rotateX(0deg) !important;
                animation: buttonFloat 3s ease-in-out infinite !important;
            }
            
            .btn-primary::before, .btn-secondary::before {
                content: '' !important;
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                width: 0 !important;
                height: 0 !important;
                background: rgba(255,255,255,0.3) !important;
                border-radius: 50% !important;
                transform: translate(-50%, -50%) !important;
                transition: all 0.5s ease !important;
            }
            
            .btn-primary:hover::before, .btn-secondary:hover::before {
                width: 300px !important;
                height: 300px !important;
            }
            
            .btn-primary:hover, .btn-secondary:hover {
                transform: perspective(1000px) rotateX(10deg) translateY(-10px) scale(1.1) !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
            }
            
            /* Vision Section Beautiful Animation */
            .vision-section {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0) !important;
                position: relative !important;
            }
            
            .vision-section::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: radial-gradient(circle at 20% 50%, rgba(220,38,38,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(22,163,74,0.1) 0%, transparent 50%) !important;
                animation: backgroundPulse 6s ease-in-out infinite !important;
            }
            
            .section-title {
                animation: titleSlideUp 1.5s ease-out !important;
                background: linear-gradient(45deg, #dc2626, #16a34a) !important;
                background-size: 200% 200% !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                animation: titleSlideUp 1.5s ease-out, gradientShift 3s ease-in-out infinite !important;
            }
            
            .vision-text {
                animation: textSlideIn 2s ease-out !important;
                position: relative !important;
            }
            
            .vision-text::before {
                content: '' !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 4px !important;
                height: 100% !important;
                background: linear-gradient(to bottom, #dc2626, #16a34a) !important;
                border-radius: 2px !important;
                animation: borderGrow 2s ease-out 0.5s both !important;
            }
            
            /* Product Categories Beautiful Animation */
            .product-categories {
                background: linear-gradient(135deg, #ffffff, #f1f5f9) !important;
                position: relative !important;
            }
            
            .categories-grid {
                animation: gridFadeIn 2s ease-out !important;
            }
            
            .category-card {
                background: linear-gradient(135deg, #ffffff, #f8fafc) !important;
                border: 2px solid transparent !important;
                background-clip: padding-box !important;
                position: relative !important;
                overflow: hidden !important;
                animation: cardSlideUp 1s ease-out !important;
                transform-style: preserve-3d !important;
            }
            
            .category-card::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: linear-gradient(45deg, #dc2626, #16a34a, #dc2626) !important;
                background-size: 200% 200% !important;
                animation: gradientShift 4s ease-in-out infinite !important;
                z-index: -1 !important;
                border-radius: 12px !important;
            }
            
            .category-card:nth-child(1) { animation-delay: 0.1s !important; }
            .category-card:nth-child(2) { animation-delay: 0.2s !important; }
            .category-card:nth-child(3) { animation-delay: 0.3s !important; }
            .category-card:nth-child(4) { animation-delay: 0.4s !important; }
            .category-card:nth-child(5) { animation-delay: 0.5s !important; }
            
            .category-icon {
                animation: iconDance 3s ease-in-out infinite !important;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)) !important;
                font-size: 3.5rem !important;
            }
            
            .category-card:hover {
                transform: perspective(1000px) rotateY(10deg) rotateX(10deg) translateY(-20px) scale(1.05) !important;
                box-shadow: 0 25px 50px rgba(0,0,0,0.2) !important;
            }
            
            .category-card:hover .category-icon {
                animation: iconExplode 0.6s ease-out !important;
            }
            
            /* Success Stories Beautiful Animation */
            .success-stories {
                position: relative !important;
                overflow: hidden !important;
            }
            
            .success-stories::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%) !important;
                animation: shimmer 3s ease-in-out infinite !important;
            }
            
            .success-card {
                animation: successCardFloat 4s ease-in-out infinite !important;
                backdrop-filter: blur(20px) !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .success-card::before {
                content: '' !important;
                position: absolute !important;
                top: -50% !important;
                left: -50% !important;
                width: 200% !important;
                height: 200% !important;
                background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.2), transparent) !important;
                animation: rotate 4s linear infinite !important;
            }
            
            .success-card:nth-child(1) { animation-delay: 0s !important; }
            .success-card:nth-child(2) { animation-delay: 1s !important; }
            .success-card:nth-child(3) { animation-delay: 2s !important; }
            
            .success-card:hover {
                transform: perspective(1000px) rotateX(15deg) translateY(-15px) scale(1.1) !important;
                background: rgba(255,255,255,0.2) !important;
            }
            
            .success-card div[style*="font-size: 1.2rem"] {
                animation: numberCounter 3s ease-out !important;
                background: linear-gradient(45deg, #16a34a, #10b981) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }
            
            /* E-Mandi Section Beautiful Animation */
            .e-mandi {
                background: linear-gradient(135deg, #16a34a, #059669) !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .e-mandi::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 60,35 85,35 65,55 75,80 50,65 25,80 35,55 15,35 40,35" fill="rgba(255,255,255,0.1)" opacity="0.3"><animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="10s" repeatCount="indefinite"/></polygon></svg>') !important;
                animation: starField 15s linear infinite !important;
            }
            
            .e-mandi-text h2 {
                animation: titleBounce 2s ease-out !important;
                text-shadow: 0 0 20px rgba(255,255,255,0.5) !important;
            }
            
            .e-mandi-features {
                animation: featuresSlideIn 2s ease-out !important;
            }
            
            .feature-item {
                background: rgba(255,255,255,0.1) !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                animation: featureFloat 3s ease-in-out infinite !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .feature-item:nth-child(1) { animation-delay: 0s !important; }
            .feature-item:nth-child(2) { animation-delay: 0.5s !important; }
            .feature-item:nth-child(3) { animation-delay: 1s !important; }
            .feature-item:nth-child(4) { animation-delay: 1.5s !important; }
            
            .feature-item::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) !important;
                transition: left 0.6s ease !important;
            }
            
            .feature-item:hover::before {
                left: 100% !important;
            }
            
            .feature-item:hover {
                transform: perspective(1000px) rotateY(15deg) translateY(-10px) scale(1.1) !important;
                background: rgba(255,255,255,0.2) !important;
            }
            
            .feature-icon {
                animation: iconPulse 2s ease-in-out infinite !important;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)) !important;
            }
            
            /* Footer Beautiful Animation */
            .footer {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0) !important;
                position: relative !important;
                animation: footerSlideUp 1s ease-out !important;
            }
            
            .footer-section {
                animation: footerSectionFade 1.5s ease-out !important;
            }
            
            .footer-section:nth-child(1) { animation-delay: 0.1s !important; }
            .footer-section:nth-child(2) { animation-delay: 0.2s !important; }
            .footer-section:nth-child(3) { animation-delay: 0.3s !important; }
            .footer-section:nth-child(4) { animation-delay: 0.4s !important; }
            
            .footer-section a {
                position: relative !important;
                overflow: hidden !important;
            }
            
            .footer-section a::before {
                content: '' !important;
                position: absolute !important;
                bottom: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 2px !important;
                background: linear-gradient(90deg, #dc2626, #16a34a) !important;
                transition: left 0.3s ease !important;
            }
            
            .footer-section a:hover::before {
                left: 0 !important;
            }
            
            /* Keyframe Animations */
            @keyframes headerSlideDown {
                from { transform: translateY(-100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes logoSpin {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(5deg) scale(1.1); }
                50% { transform: rotate(0deg) scale(1); }
                75% { transform: rotate(-5deg) scale(1.1); }
            }
            
            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes heroGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes particleFloat {
                from { transform: translateX(-100px); }
                to { transform: translateX(calc(100vw + 100px)); }
            }
            
            @keyframes titleMagic {
                0% { 
                    opacity: 0; 
                    transform: translateY(50px) scale(0.8); 
                    filter: blur(10px);
                }
                50% {
                    transform: translateY(-10px) scale(1.1);
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                    filter: blur(0px);
                }
            }
            
            @keyframes textReveal {
                0% { 
                    opacity: 0; 
                    transform: translateX(-50px); 
                    filter: blur(5px);
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0); 
                    filter: blur(0px);
                }
            }
            
            @keyframes taglineGlow {
                0% { 
                    opacity: 0; 
                    transform: translateY(30px) scale(0.8); 
                    box-shadow: 0 0 0 rgba(255,255,255,0.5);
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                    box-shadow: 0 0 30px rgba(255,255,255,0.3);
                }
            }
            
            @keyframes buttonFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
            
            @keyframes backgroundPulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            
            @keyframes titleSlideUp {
                0% { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            @keyframes textSlideIn {
                0% { 
                    opacity: 0; 
                    transform: translateX(-30px); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0); 
                }
            }
            
            @keyframes borderGrow {
                0% { height: 0; }
                100% { height: 100%; }
            }
            
            @keyframes gridFadeIn {
                0% { opacity: 0; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes cardSlideUp {
                0% { 
                    opacity: 0; 
                    transform: translateY(50px) rotateX(45deg); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0) rotateX(0deg); 
                }
            }
            
            @keyframes iconDance {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(10deg) scale(1.1); }
                50% { transform: rotate(0deg) scale(1); }
                75% { transform: rotate(-10deg) scale(1.1); }
            }
            
            @keyframes iconExplode {
                0% { transform: scale(1); }
                50% { transform: scale(1.5) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            @keyframes successCardFloat {
                0%, 100% { transform: translateY(0px) rotateZ(0deg); }
                33% { transform: translateY(-10px) rotateZ(1deg); }
                66% { transform: translateY(5px) rotateZ(-1deg); }
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes numberCounter {
                0% { 
                    opacity: 0; 
                    transform: scale(0.5) rotateY(180deg); 
                }
                50% {
                    transform: scale(1.2) rotateY(0deg);
                }
                100% { 
                    opacity: 1; 
                    transform: scale(1) rotateY(0deg); 
                }
            }
            
            @keyframes starField {
                from { transform: translateY(100vh); }
                to { transform: translateY(-100vh); }
            }
            
            @keyframes titleBounce {
                0% { 
                    opacity: 0; 
                    transform: translateY(-50px) scale(0.5); 
                }
                50% {
                    transform: translateY(10px) scale(1.1);
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            
            @keyframes featuresSlideIn {
                0% { 
                    opacity: 0; 
                    transform: translateX(50px); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0); 
                }
            }
            
            @keyframes featureFloat {
                0%, 100% { transform: translateY(0px) rotateX(0deg); }
                50% { transform: translateY(-8px) rotateX(5deg); }
            }
            
            @keyframes iconPulse {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.2) rotate(5deg); }
            }
            
            @keyframes footerSlideUp {
                0% { 
                    opacity: 0; 
                    transform: translateY(50px); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            @keyframes footerSectionFade {
                0% { 
                    opacity: 0; 
                    transform: translateY(20px); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            /* Scroll-triggered animations */
            .animate-on-scroll {
                opacity: 0 !important;
                transform: translateY(50px) !important;
                transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            .animate-on-scroll.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced scroll animations
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
    
    // Initialize beautiful animations
    function init() {
        createBeautifulAnimations();
        initScrollAnimations();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.addEventListener('load', init);
})();