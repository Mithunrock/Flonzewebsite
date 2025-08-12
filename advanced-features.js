// Advanced JavaScript Features for Flonze Website
// Using ES6+, Web APIs, and Modern JavaScript Patterns

class FlonzeWebsiteManager {
  constructor() {
    this.config = {
      apiEndpoint: 'https://api.flonzefulfillment.com',
      version: '2.0.0',
      features: {
        analytics: true,
        notifications: true,
        offline: true,
        geolocation: true
      }
    };
    
    this.state = {
      isOnline: navigator.onLine,
      userLocation: null,
      sessionData: {},
      preferences: this.loadPreferences()
    };
    
    this.init();
  }

  // Initialize all features
  async init() {
    try {
      await this.setupServiceWorker();
      this.setupEventListeners();
      this.initializeAnalytics();
      this.setupNotifications();
      this.detectUserLocation();
      this.initializeWebComponents();
      this.setupIntersectionObserver();
      this.initializeFormValidation();
      console.log('✅ Flonze Website Manager initialized successfully');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
    }
  }

  // Service Worker for Offline Support
  async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  // Event Listeners Setup
  setupEventListeners() {
    // Online/Offline Detection
    window.addEventListener('online', () => {
      this.state.isOnline = true;
      this.showNotification('Connection restored', 'success');
    });

    window.addEventListener('offline', () => {
      this.state.isOnline = false;
      this.showNotification('Working offline', 'warning');
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'k':
            e.preventDefault();
            this.openSearch();
            break;
          case '/':
            e.preventDefault();
            this.focusSearchInput();
            break;
        }
      }
    });

    // Scroll Performance Optimization
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Form Submissions
    document.addEventListener('submit', (e) => {
      if (e.target.matches('.contact-form')) {
        e.preventDefault();
        this.handleFormSubmission(e.target);
      }
    });
  }

  // Analytics and Tracking
  initializeAnalytics() {
    // Page View Tracking
    this.trackPageView();
    
    // User Interaction Tracking
    document.addEventListener('click', (e) => {
      if (e.target.matches('a, button')) {
        this.trackEvent('click', {
          element: e.target.tagName,
          text: e.target.textContent.trim(),
          href: e.target.href || null
        });
      }
    });

    // Performance Monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.trackPerformance(entry);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Notification System
  setupNotifications() {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${this.getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  getNotificationIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  // Geolocation Services
  async detectUserLocation() {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: false
          });
        });

        this.state.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.updateShippingEstimates();
      } catch (error) {
        console.log('Geolocation not available:', error);
      }
    }
  }

  // Web Components
  initializeWebComponents() {
    // Custom Shipping Calculator Component
    class ShippingCalculator extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        this.render();
        this.setupEventListeners();
      }

      render() {
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              background: white;
            }
            .calculator {
              display: grid;
              gap: 15px;
            }
            input, select {
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            button {
              background: #FFD700;
              color: #0D1B2A;
              border: none;
              padding: 12px;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
            }
            .result {
              padding: 15px;
              background: #f8f9fa;
              border-radius: 4px;
              text-align: center;
              font-weight: 600;
            }
          </style>
          <div class="calculator">
            <input type="number" id="weight" placeholder="Weight (kg)" min="0.1" step="0.1">
            <select id="destination">
              <option value="">Select destination</option>
              <option value="local">Local (Same City)</option>
              <option value="metro">Metro Cities</option>
              <option value="tier2">Tier 2 Cities</option>
              <option value="remote">Remote Areas</option>
            </select>
            <button id="calculate">Calculate Shipping</button>
            <div class="result" id="result">Enter details to calculate</div>
          </div>
        `;
      }

      setupEventListeners() {
        const button = this.shadowRoot.getElementById('calculate');
        button.addEventListener('click', () => this.calculate());
      }

      calculate() {
        const weight = parseFloat(this.shadowRoot.getElementById('weight').value);
        const destination = this.shadowRoot.getElementById('destination').value;
        const result = this.shadowRoot.getElementById('result');

        if (!weight || !destination) {
          result.textContent = '⚠️ Please fill all fields';
          return;
        }

        const rates = { local: 25, metro: 35, tier2: 45, remote: 65 };
        const cost = Math.ceil(weight * rates[destination]);
        
        result.innerHTML = `💰 Estimated Cost: ₹${cost} (${weight}kg to ${destination})`;
        
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('shipping-calculated', {
          detail: { weight, destination, cost }
        }));
      }
    }

    customElements.define('shipping-calculator', ShippingCalculator);
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Lazy load images
          if (entry.target.dataset.src) {
            entry.target.src = entry.target.dataset.src;
            entry.target.removeAttribute('data-src');
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe elements
    document.querySelectorAll('.animate-on-scroll, [data-src]').forEach(el => {
      observer.observe(el);
    });
  }

  // Form Validation and Submission
  initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        isValid = false;
        message = 'Please enter a valid phone number';
      }
    }

    this.showFieldValidation(field, isValid, message);
    return isValid;
  }

  showFieldValidation(field, isValid, message) {
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
      errorElement.remove();
    }

    if (!isValid) {
      field.classList.add('field-invalid');
      const error = document.createElement('div');
      error.className = 'field-error';
      error.textContent = message;
      field.parentNode.appendChild(error);
    } else {
      field.classList.remove('field-invalid');
    }
  }

  clearFieldError(field) {
    field.classList.remove('field-invalid');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  // API Integration
  async makeAPICall(endpoint, options = {}) {
    const url = `${this.config.apiEndpoint}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Version': this.config.version
      }
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      
      if (!this.state.isOnline) {
        return this.getOfflineData(endpoint);
      }
      
      throw error;
    }
  }

  // Offline Data Management
  getOfflineData(endpoint) {
    const offlineData = localStorage.getItem(`offline_${endpoint}`);
    return offlineData ? JSON.parse(offlineData) : null;
  }

  saveOfflineData(endpoint, data) {
    localStorage.setItem(`offline_${endpoint}`, JSON.stringify(data));
  }

  // Performance Optimization
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Local Storage Management
  loadPreferences() {
    try {
      const prefs = localStorage.getItem('flonze_preferences');
      return prefs ? JSON.parse(prefs) : {};
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {};
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('flonze_preferences', JSON.stringify(this.state.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  // Event Tracking
  trackEvent(eventName, data = {}) {
    const eventData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...data
    };

    // Send to analytics service
    if (this.state.isOnline) {
      this.makeAPICall('/analytics/events', {
        method: 'POST',
        body: JSON.stringify(eventData)
      }).catch(error => {
        // Store offline for later sync
        this.storeOfflineEvent(eventData);
      });
    } else {
      this.storeOfflineEvent(eventData);
    }
  }

  trackPageView() {
    this.trackEvent('page_view', {
      page: window.location.pathname,
      title: document.title,
      referrer: document.referrer
    });
  }

  trackPerformance(entry) {
    this.trackEvent('performance', {
      loadTime: entry.loadEventEnd - entry.loadEventStart,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      firstPaint: entry.responseEnd - entry.requestStart
    });
  }

  storeOfflineEvent(eventData) {
    const offlineEvents = JSON.parse(localStorage.getItem('offline_events') || '[]');
    offlineEvents.push(eventData);
    localStorage.setItem('offline_events', JSON.stringify(offlineEvents));
  }

  // Utility Methods
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update scroll progress
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.style.display = scrollTop > 300 ? 'block' : 'none';
    }
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showNotification('Please fix the errors in the form', 'error');
      return;
    }

    try {
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      // Submit form
      await this.makeAPICall('/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      this.showNotification('Message sent successfully!', 'success');
      form.reset();

    } catch (error) {
      this.showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button state
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }

  updateShippingEstimates() {
    if (this.state.userLocation) {
      // Update shipping calculator with location-based estimates
      const calculators = document.querySelectorAll('shipping-calculator');
      calculators.forEach(calc => {
        calc.setAttribute('user-location', JSON.stringify(this.state.userLocation));
      });
    }
  }

  openSearch() {
    // Implement search functionality
    console.log('Search opened');
  }

  focusSearchInput() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.flonzeManager = new FlonzeWebsiteManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FlonzeWebsiteManager;
}