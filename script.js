// Flonze TradeBridge - Interactive B2B Platform JavaScript

// Smooth scrolling for navigation links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect with debounce
const handleScroll = debounce(function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    }
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navActions) navActions.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            if (navActions) navActions.classList.remove('active');
        });
    });
}

// Tab functionality for registration forms
function showTab(tabName) {
    try {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab content
        const selectedTab = document.getElementById(tabName + '-tab');
        if (selectedTab) {
            selectedTab.style.display = 'block';
        }
        
        // Add active class to clicked button
        if (event && event.target) {
            event.target.classList.add('active');
            event.target.setAttribute('aria-pressed', 'true');
            
            // Update other buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                if (btn !== event.target) {
                    btn.setAttribute('aria-pressed', 'false');
                }
            });
        }
    } catch (error) {
        console.error('Error switching tabs:', error);
    }
}

// Tooltip functionality for process steps
const tooltip = document.getElementById('tooltip');
const steps = document.querySelectorAll('.step[data-tooltip]');

steps.forEach(step => {
    step.addEventListener('mouseenter', function(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        if (tooltipText && tooltip) {
            tooltip.textContent = tooltipText;
            tooltip.classList.add('show');
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        }
    });
    
    step.addEventListener('mouseleave', function() {
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    });
});

// Form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Buyer registration form
    const buyerForm = document.querySelector('#buyer-tab .registration-form');
    if (buyerForm) {
        buyerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const company = this.querySelector('input[placeholder="Company Name"]').value;
            const businessType = this.querySelector('select').value;
            const contact = this.querySelector('input[placeholder="Contact Person"]').value;
            const email = this.querySelector('input[placeholder="Email Address"]').value;
            const phone = this.querySelector('input[placeholder="Phone Number"]').value;
            const city = this.querySelector('input[placeholder="City"]').value;
            
            // Show success message
            showSuccessMessage('Buyer Registration Successful!', 
                `Welcome ${contact}!\n\nCompany: ${company}\nBusiness Type: ${businessType}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\n\nOur team will contact you within 24 hours to complete the verification process.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Seller registration form
    const sellerForm = document.querySelector('#seller-tab .registration-form');
    if (sellerForm) {
        sellerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const company = this.querySelector('input[placeholder="Company/Farm Name"]').value;
            const sellerType = this.querySelector('select').value;
            const contact = this.querySelector('input[placeholder="Contact Person"]').value;
            const email = this.querySelector('input[placeholder="Email Address"]').value;
            const phone = this.querySelector('input[placeholder="Phone Number"]').value;
            const location = this.querySelector('input[placeholder="Location"]').value;
            const products = this.querySelector('textarea').value;
            
            // Show success message
            showSuccessMessage('Seller Registration Successful!', 
                `Welcome ${contact}!\n\nCompany: ${company}\nSeller Type: ${sellerType}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nProducts: ${products}\n\nOur verification team will review your application and contact you within 48 hours.`);
            
            // Reset form
            this.reset();
        });
    }
});

// Success message function
function showSuccessMessage(title, message) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    modal.innerHTML = `
        <div style="font-size: 3rem; color: #1e40af; margin-bottom: 20px;">✅</div>
        <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 1.5rem;">${title}</h3>
        <p style="color: #666; line-height: 1.6; white-space: pre-line; margin-bottom: 30px;">${message}</p>
        <button onclick="this.closest('.success-overlay').remove()" 
                style="background: linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%); color: white; border: none; padding: 12px 30px; 
                       border-radius: 25px; font-weight: 600; cursor: pointer; font-size: 1rem;">
            Continue
        </button>
    `;
    
    overlay.className = 'success-overlay';
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.benefit-card, .journey-column, .flow-side');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced step hover effects
document.querySelectorAll('.step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
        this.style.boxShadow = '0 5px 20px rgba(30,64,175,0.3)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
        this.style.boxShadow = '0 3px 10px rgba(30,64,175,0.2)';
    });
});

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta, .submit-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation enhancement
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            input.style.boxShadow = '0 0 0 3px rgba(220,53,69,0.1)';
            isValid = false;
            
            // Reset border color on focus
            input.addEventListener('focus', function() {
                this.style.borderColor = '#1e40af';
                this.style.boxShadow = '0 0 0 3px rgba(30,64,175,0.1)';
            }, { once: true });
        } else {
            input.style.borderColor = '#e0e0e0';
            input.style.boxShadow = 'none';
        }
    });
    
    return isValid;
}

// Add loading states to form submissions
document.querySelectorAll('.registration-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        if (validateForm(this)) {
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            e.preventDefault();
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroContent && heroBg) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter animation for statistics (if added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    try {
        if (window.pageYOffset > 300) {
            if (scrollToTopBtn) scrollToTopBtn.classList.add('show');
        } else {
            if (scrollToTopBtn) scrollToTopBtn.classList.remove('show');
        }
    } catch (error) {
        console.error('Scroll error:', error);
    }
}, { passive: true });

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
                
                if (numericValue) {
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            const formatted = Math.floor(current).toLocaleString();
                            if (target.includes('₹')) {
                                counter.textContent = '₹' + formatted + (target.includes('Cr') ? 'Cr+' : '+');
                            } else {
                                counter.textContent = formatted + '+';
                            }
                        }
                    }, 30);
                }
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Debounce function for performance
function debounce(func, wait) {
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

// Cart Management
let cart = JSON.parse(localStorage.getItem('flonzeCart')) || [];

function updateCartCount() {
    const cartCounts = document.querySelectorAll('#cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(count => {
        count.textContent = totalItems;
        count.style.display = totalItems > 0 ? 'inline' : 'none';
    });
}

function addToCart(name, price, location, seller, emoji) {
    try {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: Date.now(),
                name: name || 'Product',
                price: price || 0,
                location: location || 'India',
                seller: seller || 'Seller',
                emoji: emoji || '🛒',
                quantity: 1
            });
        }
        
        localStorage.setItem('flonzeCart', JSON.stringify(cart));
        updateCartCount();
        
        // Show success message
        showNotification(`${name} added to cart!`, 'success');
    } catch (error) {
        console.error('Add to cart error:', error);
        showNotification('Error adding to cart', 'error');
    }
}

function buyNow(name, price, location, seller) {
    // Add to cart first
    addToCart(name, price, location, seller, '🛒');
    // Redirect to cart
    window.location.href = 'cart.html';
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('flonzeCart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    updateCartSummary();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('flonzeCart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
            updateCartSummary();
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-details">📍 ${item.location} • 👤 ${item.seller}</div>
                <div class="cart-item-price">₹${item.price}/kg</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₹${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.05;
    const orderSummary = cart.map(item => `${item.name} (${item.quantity}kg)`).join(', ');
    const message = `Hi! I want to place an order:\n\n${orderSummary}\n\nTotal: ₹${total.toFixed(2)}\n\nPlease confirm availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/918108395367?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#dc3545'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize cart on page load
function initializeCart() {
    try {
        updateCartCount();
        if (window.location.pathname.includes('cart.html') || window.location.href.includes('cart.html')) {
            displayCartItems();
            updateCartSummary();
        }
    } catch (error) {
        console.error('Cart initialization error:', error);
    }
}

// Call on DOM ready and window load
document.addEventListener('DOMContentLoaded', initializeCart);
window.addEventListener('load', initializeCart);

// Product Marketplace Functions
function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h4').textContent.toLowerCase();
        const seller = card.querySelector('.product-seller').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || seller.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        let showCard = true;
        
        // Category filter
        if (categoryFilter !== 'all' && card.dataset.category !== categoryFilter) {
            showCard = false;
        }
        
        // Location filter
        if (locationFilter !== 'all' && card.dataset.location !== locationFilter) {
            showCard = false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            const price = parseInt(card.dataset.price);
            if (priceFilter === 'low' && price >= 100) showCard = false;
            if (priceFilter === 'medium' && (price < 100 || price > 500)) showCard = false;
            if (priceFilter === 'high' && price <= 500) showCard = false;
        }
        
        if (showCard) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function contactSeller(productName, sellerName) {
    const message = `Hi! I'm interested in ${productName} from ${sellerName}. Please provide more details about pricing, quantity, and delivery.`;
    const phoneNumber = '+918108395367';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Show contact modal
    showContactModal(productName, sellerName, whatsappUrl);
}

function showContactModal(productName, sellerName, whatsappUrl) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 15px; max-width: 500px; width: 90%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="color: var(--primary-color); margin-bottom: 20px; font-size: 1.5rem;">Contact Seller</h3>
            <p style="margin-bottom: 20px; color: var(--text-gray);">Product: <strong>${productName}</strong></p>
            <p style="margin-bottom: 30px; color: var(--text-gray);">Seller: <strong>${sellerName}</strong></p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="${whatsappUrl}" target="_blank" style="background: #25D366; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 600;">📱 WhatsApp</a>
                <a href="tel:+918108395367" style="background: var(--gradient-primary); color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 600;">📞 Call</a>
                <button onclick="this.closest('div').parentElement.remove()" style="background: var(--border-gray); color: var(--dark-gray); border: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; cursor: pointer;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function toggleWishlist(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        button.innerHTML = '❤️';
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    } else {
        button.innerHTML = '♡';
    }
}

function loadMoreProducts() {
    // Simulate loading more products
    const productsGrid = document.getElementById('productsGrid');
    const newProducts = [
        {
            category: 'vegetables',
            location: 'punjab',
            price: 45,
            emoji: '🥔',
            name: 'Fresh Potatoes',
            seller: 'Farm Fresh',
            rating: '4.5'
        },
        {
            category: 'grains',
            location: 'maharashtra',
            price: 65,
            emoji: '🌾',
            name: 'Wheat Flour',
            seller: 'Grain Mills',
            rating: '4.7'
        }
    ];
    
    newProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        productCard.dataset.location = product.location;
        productCard.dataset.price = product.price;
        
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="product-price">₹${product.price}/kg</p>
                <p class="product-location">📍 ${product.location.charAt(0).toUpperCase() + product.location.slice(1)}</p>
                <p class="product-seller">👤 ${product.seller}</p>
                <div class="product-rating">⭐⭐⭐⭐⭐ (${product.rating})</div>
                <div class="product-actions">
                    <button class="product-btn" onclick="contactSeller('${product.name}', '${product.seller}')">Contact Seller</button>
                    <button class="wishlist-btn" onclick="toggleWishlist(this)">♡</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add smooth transitions to all interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .step, .benefit-card, .journey-column');
        
        interactiveElements.forEach(el => {
            el.style.transition = 'all 0.3s ease';
        });
        
        // Initialize tooltips
        const tooltip = document.getElementById('tooltip');
        if (tooltip && !tooltip.parentNode) {
            document.body.appendChild(tooltip);
        }
        
        // Initialize counter animations
        if (typeof animateCounters === 'function') {
            animateCounters();
        }
        
        // Add focus styles for accessibility
        document.querySelectorAll('input, select, textarea, button').forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid #1e40af';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
        
        // Fix mobile menu close on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                const navActions = document.querySelector('.nav-actions');
                
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('active');
                    if (navActions) navActions.classList.remove('active');
                }
            });
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Performance optimization
window.addEventListener('load', function() {
    try {
        // Lazy load images if any
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        // Preload critical resources
        const criticalImages = document.querySelectorAll('img[loading="eager"]');
        criticalImages.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    } catch (error) {
        console.error('Error in performance optimization:', error);
    }
});