// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
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