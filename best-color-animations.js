// Best animations with beautiful colors
(function() {
    'use strict';
    
    function createBestColorAnimations() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Best Color Animations */
            * {
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
            
            /* Header with Rainbow Gradient */
            .header {
                background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57) !important;
                background-size: 300% 300% !important;
                animation: rainbowShift 8s ease infinite !important;
                backdrop-filter: blur(20px) !important;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
            }
            
            .logo {
                animation: logoRainbow 4s ease-in-out infinite !important;
                filter: drop-shadow(0 4px 12px rgba(255,107,107,0.4)) !important;
            }
            
            .brand-name {
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b) !important;
                background-size: 400% 400% !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                animation: textRainbow 6s ease infinite !important;
                font-weight: 800 !important;
            }
            
            .nav-menu a {
                position: relative !important;
                color: #2c3e50 !important;
                font-weight: 600 !important;
            }
            
            .nav-menu a::before {
                content: '' !important;
                position: absolute !important;
                bottom: -5px !important;
                left: 50% !important;
                width: 0 !important;
                height: 3px !important;
                background: linear-gradient(90deg, #ff6b6b, #4ecdc4) !important;
                transition: all 0.3s ease !important;
                transform: translateX(-50%) !important;
                border-radius: 2px !important;
            }
            
            .nav-menu a:hover::before {
                width: 100% !important;
            }
            
            .nav-menu a:hover {
                color: #ff6b6b !important;
                transform: translateY(-3px) !important;
            }
            
            .cart-count {
                background: linear-gradient(45deg, #ff6b6b, #e74c3c) !important;
                animation: cartPulse 2s ease-in-out infinite !important;
                box-shadow: 0 0 20px rgba(255,107,107,0.6) !important;
            }
            
            /* Hero Section with Magical Colors */
            .hero {
                background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe) !important;
                background-size: 400% 400% !important;
                animation: heroMagic 12s ease infinite !important;
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
                background: radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(255,107,107,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(76,201,196,0.3) 0%, transparent 50%) !important;
                animation: particleMove 15s ease infinite !important;
            }
            
            .hero h1 {
                background: linear-gradient(45deg, #ffffff, #f8f9fa, #e3f2fd, #ffffff) !important;
                background-size: 300% 300% !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                animation: titleShine 3s ease infinite, titleFloat 4s ease-in-out infinite !important;
                text-shadow: 0 0 30px rgba(255,255,255,0.5) !important;
            }
            
            .hero p {
                animation: textGlow 2s ease-out 0.5s both !important;
                text-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
            }
            
            .hero-tagline {
                background: rgba(255,255,255,0.15) !important;
                backdrop-filter: blur(15px) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                animation: taglineFloat 3s ease-in-out infinite !important;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
            }
            
            .btn-primary {
                background: linear-gradient(45deg, #ff6b6b, #ee5a52, #ff6b6b) !important;
                background-size: 200% 200% !important;
                animation: buttonShine 3s ease infinite !important;
                box-shadow: 0 8px 25px rgba(255,107,107,0.4) !important;
                border: none !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .btn-primary::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent) !important;
                transition: left 0.6s ease !important;
            }
            
            .btn-primary:hover::before {
                left: 100% !important;
            }
            
            .btn-secondary {
                background: linear-gradient(45deg, #4ecdc4, #44a08d, #4ecdc4) !important;
                background-size: 200% 200% !important;
                animation: buttonShine 3s ease infinite 1s !important;
                box-shadow: 0 8px 25px rgba(78,205,196,0.4) !important;
                border: none !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .btn-secondary::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent) !important;
                transition: left 0.6s ease !important;
            }
            
            .btn-secondary:hover::before {
                left: 100% !important;
            }
            
            .btn-primary:hover, .btn-secondary:hover {
                transform: translateY(-5px) scale(1.05) !important;
                box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
            }
            
            /* Vision Section with Soft Colors */
            .vision-section {
                background: linear-gradient(135deg, #ffecd2, #fcb69f, #ffecd2) !important;
                background-size: 300% 300% !important;
                animation: visionGlow 10s ease infinite !important;
            }
            
            .section-title {
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1) !important;
                background-size: 200% 200% !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                animation: titleRainbow 4s ease infinite !important;
            }
            
            .vision-text {
                animation: textSlideUp 1.5s ease-out !important;
                color: #2c3e50 !important;
                position: relative !important;
            }
            
            .vision-text::before {
                content: '' !important;
                position: absolute !important;
                left: -10px !important;
                top: 0 !important;
                width: 4px !important;
                height: 100% !important;
                background: linear-gradient(to bottom, #ff6b6b, #4ecdc4) !important;
                border-radius: 2px !important;
                animation: borderGrow 2s ease-out 0.5s both !important;
            }
            
            /* Product Categories with Vibrant Colors */
            .product-categories {
                background: linear-gradient(135deg, #a8edea, #fed6e3, #d299c2, #fef9d7) !important;
                background-size: 400% 400% !important;
                animation: categoryBackground 15s ease infinite !important;
            }
            
            .category-card {
                background: rgba(255,255,255,0.9) !important;
                backdrop-filter: blur(10px) !important;
                border: 2px solid transparent !important;
                background-clip: padding-box !important;
                position: relative !important;
                overflow: hidden !important;
                animation: cardFloat 4s ease-in-out infinite !important;
            }
            
            .category-card::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57) !important;
                background-size: 300% 300% !important;
                animation: cardBorder 8s ease infinite !important;
                z-index: -1 !important;
                border-radius: 12px !important;
            }
            
            .category-card:nth-child(1) { animation-delay: 0s !important; }
            .category-card:nth-child(2) { animation-delay: 0.8s !important; }
            .category-card:nth-child(3) { animation-delay: 1.6s !important; }
            .category-card:nth-child(4) { animation-delay: 2.4s !important; }
            .category-card:nth-child(5) { animation-delay: 3.2s !important; }
            
            .category-icon {
                animation: iconDance 3s ease-in-out infinite !important;
                filter: drop-shadow(0 4px 12px rgba(255,107,107,0.3)) !important;
                font-size: 3.5rem !important;
            }
            
            .category-card:hover {
                transform: translateY(-15px) scale(1.05) rotate(2deg) !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
            }
            
            .category-card:hover .category-icon {
                animation: iconExplode 0.8s ease-out !important;
            }
            
            /* Success Stories with Dark Magic */
            .success-stories {
                background: linear-gradient(135deg, #2c3e50, #34495e, #2c3e50) !important;
                background-size: 300% 300% !important;
                animation: darkMagic 12s ease infinite !important;
                position: relative !important;
            }
            
            .success-stories::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: radial-gradient(circle at 30% 70%, rgba(255,107,107,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 70% 30%, rgba(78,205,196,0.2) 0%, transparent 50%) !important;
                animation: magicParticles 20s ease infinite !important;
            }
            
            .success-card {
                background: rgba(255,255,255,0.1) !important;
                backdrop-filter: blur(15px) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                animation: successFloat 5s ease-in-out infinite !important;
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
                background: conic-gradient(from 0deg, transparent, rgba(255,107,107,0.3), transparent, rgba(78,205,196,0.3), transparent) !important;
                animation: successSpin 6s linear infinite !important;
            }
            
            .success-card:nth-child(1) { animation-delay: 0s !important; }
            .success-card:nth-child(2) { animation-delay: 1.5s !important; }
            .success-card:nth-child(3) { animation-delay: 3s !important; }
            
            .success-card:hover {
                transform: translateY(-12px) scale(1.08) !important;
                background: rgba(255,255,255,0.2) !important;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
            }
            
            /* E-Mandi with Nature Colors */
            .e-mandi {
                background: linear-gradient(135deg, #56ab2f, #a8e6cf, #88d8a3, #56ab2f) !important;
                background-size: 300% 300% !important;
                animation: natureFlow 10s ease infinite !important;
                position: relative !important;
            }
            
            .e-mandi::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.2)"><animate attributeName="cy" values="20;80;20" dur="4s" repeatCount="indefinite"/></circle><circle cx="80" cy="60" r="1.5" fill="rgba(255,255,255,0.3)"><animate attributeName="cy" values="60;20;60" dur="5s" repeatCount="indefinite"/></circle></svg>') !important;
                animation: leafFloat 25s linear infinite !important;
            }
            
            .e-mandi-text h2 {
                color: white !important;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
                animation: titleBounce 2s ease-out !important;
            }
            
            .feature-item {
                background: rgba(255,255,255,0.15) !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255,255,255,0.3) !important;
                animation: featureWave 4s ease-in-out infinite !important;
                position: relative !important;
                overflow: hidden !important;
            }
            
            .feature-item:nth-child(1) { animation-delay: 0s !important; }
            .feature-item:nth-child(2) { animation-delay: 1s !important; }
            .feature-item:nth-child(3) { animation-delay: 2s !important; }
            .feature-item:nth-child(4) { animation-delay: 3s !important; }
            
            .feature-item::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: -100% !important;
                width: 100% !important;
                height: 100% !important;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent) !important;
                transition: left 0.8s ease !important;
            }
            
            .feature-item:hover::before {
                left: 100% !important;
            }
            
            .feature-item:hover {
                transform: translateY(-8px) scale(1.05) !important;
                background: rgba(255,255,255,0.25) !important;
                box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
            }
            
            .feature-icon {
                animation: iconPulse 3s ease-in-out infinite !important;
                filter: drop-shadow(0 4px 8px rgba(255,255,255,0.3)) !important;
            }
            
            /* Footer with Sunset Colors */
            .footer {
                background: linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e) !important;
                background-size: 300% 300% !important;
                animation: sunsetGlow 8s ease infinite !important;
            }
            
            .footer-section a {
                color: #2c3e50 !important;
                position: relative !important;
            }
            
            .footer-section a::after {
                content: '' !important;
                position: absolute !important;
                bottom: -2px !important;
                left: 0 !important;
                width: 0 !important;
                height: 2px !important;
                background: linear-gradient(90deg, #ff6b6b, #4ecdc4) !important;
                transition: width 0.3s ease !important;
            }
            
            .footer-section a:hover::after {
                width: 100% !important;
            }
            
            .footer-section a:hover {
                color: #ff6b6b !important;
            }
            
            /* Beautiful Keyframes */
            @keyframes rainbowShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes logoRainbow {
                0%, 100% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
                25% { transform: rotate(5deg) scale(1.1); filter: hue-rotate(90deg); }
                50% { transform: rotate(0deg) scale(1); filter: hue-rotate(180deg); }
                75% { transform: rotate(-5deg) scale(1.1); filter: hue-rotate(270deg); }
            }
            
            @keyframes textRainbow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes cartPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,107,107,0.6); }
                50% { transform: scale(1.2); box-shadow: 0 0 30px rgba(255,107,107,0.8); }
            }
            
            @keyframes heroMagic {
                0%, 100% { background-position: 0% 50%; }
                25% { background-position: 100% 50%; }
                50% { background-position: 50% 100%; }
                75% { background-position: 50% 0%; }
            }
            
            @keyframes particleMove {
                0%, 100% { transform: rotate(0deg) scale(1); }
                33% { transform: rotate(120deg) scale(1.1); }
                66% { transform: rotate(240deg) scale(0.9); }
            }
            
            @keyframes titleShine {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes titleFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes textGlow {
                from { opacity: 0; transform: translateY(30px); text-shadow: 0 0 0 rgba(255,255,255,0); }
                to { opacity: 1; transform: translateY(0); text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
            }
            
            @keyframes taglineFloat {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-5px) scale(1.02); }
            }
            
            @keyframes buttonShine {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes visionGlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes titleRainbow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes textSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes borderGrow {
                from { height: 0; }
                to { height: 100%; }
            }
            
            @keyframes categoryBackground {
                0%, 100% { background-position: 0% 50%; }
                25% { background-position: 100% 50%; }
                50% { background-position: 50% 100%; }
                75% { background-position: 50% 0%; }
            }
            
            @keyframes cardFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(1deg); }
            }
            
            @keyframes cardBorder {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes iconDance {
                0%, 100% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(10deg) scale(1.1); }
                50% { transform: rotate(0deg) scale(1); }
                75% { transform: rotate(-10deg) scale(1.1); }
            }
            
            @keyframes iconExplode {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.5) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
            }
            
            @keyframes darkMagic {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes magicParticles {
                0%, 100% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
            }
            
            @keyframes successFloat {
                0%, 100% { transform: translateY(0px) rotateZ(0deg); }
                33% { transform: translateY(-8px) rotateZ(1deg); }
                66% { transform: translateY(4px) rotateZ(-1deg); }
            }
            
            @keyframes successSpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes natureFlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes leafFloat {
                from { transform: translateY(100vh) rotate(0deg); }
                to { transform: translateY(-100px) rotate(360deg); }
            }
            
            @keyframes titleBounce {
                0% { opacity: 0; transform: translateY(-30px) scale(0.8); }
                50% { transform: translateY(5px) scale(1.1); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            
            @keyframes featureWave {
                0%, 100% { transform: translateY(0px) rotateX(0deg); }
                50% { transform: translateY(-6px) rotateX(5deg); }
            }
            
            @keyframes iconPulse {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.15) rotate(5deg); }
            }
            
            @keyframes sunsetGlow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize
    function init() {
        createBestColorAnimations();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();