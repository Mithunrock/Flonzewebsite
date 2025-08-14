// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Set minimum date to today for booking form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
});

// Smooth Scrolling
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

// Testimonials Slider
let slideIndex = 1;

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance testimonials
setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
}, 5000);

// Service Selection Function
function selectService(serviceName, price) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = `${serviceName} - ₹${price}`;
        
        // Scroll to booking section
        document.getElementById('booking').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Booking Form Submission
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const bookingData = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    console.log('Booking Data:', bookingData);
    
    // Show success message
    alert(`Thank you ${bookingData.fullName}! Your booking for ${bookingData.service} on ${bookingData.date} at ${bookingData.time} has been confirmed. We'll contact you shortly at ${bookingData.phone}.`);
    
    // Reset form
    this.reset();
    
    // In a real application, you would send this data to your backend
    // Example: 
    // fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(bookingData)
    // });
});

// Contact Form Submission
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const contactData = {
        name: formData.get('name') || this.querySelector('input[placeholder="Your Name"]').value,
        email: formData.get('email') || this.querySelector('input[placeholder="Your Email"]').value,
        message: formData.get('message') || this.querySelector('textarea').value,
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    console.log('Contact Data:', contactData);
    
    // Show success message
    alert(`Thank you ${contactData.name}! Your message has been sent. We'll get back to you at ${contactData.email} soon.`);
    
    // Reset form
    this.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .step-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value && !emailRegex.test(input.value)) {
            input.style.borderColor = '#e53e3e';
            isValid = false;
        }
    });
    
    // Phone validation
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
        if (input.value && !phoneRegex.test(input.value)) {
            input.style.borderColor = '#e53e3e';
            isValid = false;
        }
    });
    
    return isValid;
}

// Add validation to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('Please fill in all required fields correctly.');
        }
    });
});

// Location autocomplete simulation (in real app, use Google Maps API)
document.getElementById('location')?.addEventListener('input', function(e) {
    const value = e.target.value.toLowerCase();
    
    // Simulate autocomplete suggestions
    if (value.length > 2) {
        const suggestions = [
            'Mumbai, Maharashtra',
            'Delhi, NCR',
            'Bangalore, Karnataka',
            'Chennai, Tamil Nadu',
            'Hyderabad, Telangana',
            'Pune, Maharashtra',
            'Kolkata, West Bengal',
            'Ahmedabad, Gujarat'
        ].filter(city => city.toLowerCase().includes(value));
        
        // In a real app, you would show these suggestions in a dropdown
        console.log('Location suggestions:', suggestions);
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0) scale(1)';
        } else {
            this.style.transform = 'translateY(0) scale(1.05)';
        }
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent.replace(/\D/g, ''));
            
            if (targetValue) {
                animateCounter(statNumber, targetValue);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Service Calculator Functions
function calculatePrice() {
    const vehicleType = document.getElementById('vehicleType').value;
    const serviceType = document.getElementById('serviceType').value;
    const addons = document.querySelectorAll('.addons input[type="checkbox"]:checked');
    
    let basePrice = 0;
    
    // Base pricing logic
    if (serviceType === 'wash') {
        if (vehicleType === 'hatchback') basePrice = 499;
        else if (vehicleType === 'sedan') basePrice = 599;
        else if (vehicleType === 'suv') basePrice = 799;
        else if (vehicleType === 'bike') basePrice = 299;
    } else if (serviceType === 'care') {
        if (vehicleType === 'hatchback') basePrice = 1799;
        else if (vehicleType === 'sedan') basePrice = 1999;
        else if (vehicleType === 'suv') basePrice = 2499;
    } else if (serviceType === 'bike') {
        basePrice = 399;
    }
    
    // Add addon prices
    let addonPrice = 0;
    addons.forEach(addon => {
        addonPrice += parseInt(addon.value);
    });
    
    const totalPrice = basePrice + addonPrice;
    document.getElementById('totalPrice').textContent = '₹' + totalPrice;
}

function bookFromCalculator() {
    const vehicleType = document.getElementById('vehicleType').value;
    const serviceType = document.getElementById('serviceType').value;
    
    if (!vehicleType || !serviceType) {
        alert('Please select vehicle type and service type first.');
        return;
    }
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Live Chat Functions
function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    const chatToggle = document.getElementById('chatToggle');
    
    if (chatBody.style.display === 'none' || !chatBody.style.display) {
        chatBody.style.display = 'flex';
        chatToggle.textContent = '▼';
    } else {
        chatBody.style.display = 'none';
        chatToggle.textContent = '▲';
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        const chatMessages = document.querySelector('.chat-messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p style="background: #2f855a; color: white; padding: 0.5rem 1rem; border-radius: 15px; margin: 0; font-size: 0.9rem; text-align: right;">${message}</p>`;
        chatMessages.appendChild(userMessage);
        
        // Auto-reply
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerHTML = `<p>Thanks for your message! Please call us at +91 8108395367 or WhatsApp for immediate assistance.</p>`;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', function() {
    const scrollTop = document.getElementById('scrollTop');
    if (window.pageYOffset > 300) {
        scrollTop.style.display = 'flex';
    } else {
        scrollTop.style.display = 'none';
    }
});

// Initialize chat as collapsed
document.addEventListener('DOMContentLoaded', function() {
    const chatBody = document.getElementById('chatBody');
    chatBody.style.display = 'none';
    
    // Chat input enter key support
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});