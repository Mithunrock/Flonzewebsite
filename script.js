// Simple Cart System
let cart = [];

// Load cart from localStorage
function loadCart() {
    try {
        const saved = localStorage.getItem('cart');
        cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
        cart = [];
    }
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Cannot save cart');
    }
}

// Update cart count in navigation
function updateCartCount() {
    const counts = document.querySelectorAll('#cartCount');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    counts.forEach(count => {
        count.textContent = total;
        count.style.display = total > 0 ? 'inline' : 'none';
    });
}

// Add item to cart
function addToCart(name, price, location, seller, emoji) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            location: location,
            seller: seller,
            emoji: emoji,
            quantity: 1
        });
    }
    saveCart();
    updateCartCount();
    showMessage(name + ' added to cart!');
}

// Buy now function
function buyNow(name, price, location, seller) {
    addToCart(name, price, location, seller, '🛒');
    window.location.href = 'cart.html';
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    updateCartCount();
    displayCart();
}

// Update quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id == id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartCount();
            displayCart();
        }
    }
}

// Display cart items
function displayCart() {
    const container = document.getElementById('cartItems');
    const empty = document.getElementById('emptyCart');
    const content = document.getElementById('cartContent');
    
    if (!container) return;
    
    try {
        if (cart.length === 0) {
            if (empty) empty.style.display = 'block';
            if (content) content.style.display = 'none';
            return;
        }
        
        if (empty) empty.style.display = 'none';
        if (content) content.style.display = 'block';
    
    container.innerHTML = cart.map(item => `
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
        
        updateSummary();
    } catch (error) {
        console.error('Error displaying cart:', error);
        if (empty) empty.style.display = 'block';
        if (content) content.style.display = 'none';
    }
}

// Update cart summary
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = '₹' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '₹' + total.toFixed(2);
}

// Checkout function
function proceedToCheckout() {
    if (cart.length === 0) {
        showMessage('Cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.05;
    const items = cart.map(item => `${item.name} (${item.quantity}kg)`).join(', ');
    const message = `Hi! I want to order: ${items}. Total: ₹${total.toFixed(2)}`;
    
    window.open(`https://wa.me/918108395367?text=${encodeURIComponent(message)}`, '_blank');
}

// Show message
function showMessage(text) {
    const msg = document.createElement('div');
    const isError = text.includes('❌');
    const isSuccess = text.includes('✅');
    
    msg.style.cssText = `
        position: fixed; top: 100px; right: 20px; 
        background: ${isError ? '#dc3545' : isSuccess ? '#10b981' : '#1e40af'}; 
        color: white; padding: 16px 24px; border-radius: 12px; 
        font-weight: 600; z-index: 2000; font-size: 14px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px; word-wrap: break-word;
    `;
    
    msg.innerHTML = text;
    document.body.appendChild(msg);
    
    // Slide in animation
    setTimeout(() => {
        msg.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        msg.style.transform = 'translateX(100%)';
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

// Wishlist toggle
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    btn.innerHTML = btn.classList.contains('active') ? '❤️' : '♡';
}

// Search products
function searchProducts() {
    const search = document.getElementById('productSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const seller = card.querySelector('.product-seller').textContent.toLowerCase();
        
        if (name.includes(search) || seller.includes(search)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;
    const price = document.getElementById('priceFilter').value;
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        let show = true;
        
        if (category !== 'all' && card.dataset.category !== category) show = false;
        if (location !== 'all' && card.dataset.location !== location) show = false;
        
        if (price !== 'all') {
            const itemPrice = parseInt(card.dataset.price);
            if (price === 'low' && itemPrice >= 100) show = false;
            if (price === 'medium' && (itemPrice < 100 || itemPrice > 500)) show = false;
            if (price === 'high' && itemPrice <= 500) show = false;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
}

// Load more products
function loadMoreProducts() {
    showMessage('More products loaded!');
}

// Tab switching
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    
    // Add active class to clicked button
    const activeBtn = document.getElementById('join-' + tabName);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}

// Mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (hamburger) {
        hamburger.onclick = function() {
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
            if (navActions) navActions.classList.toggle('active');
        };
    }
    
    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.onclick = function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (navActions) navActions.classList.remove('active');
        };
    });
}

// Scroll to top
function initScrollToTop() {
    const btn = document.getElementById('scrollToTop');
    
    if (btn) {
        window.onscroll = function() {
            if (window.pageYOffset > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        };
        
        btn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
}

// Search on Enter
function initSearch() {
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        };
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            input.style.boxShadow = '0 0 0 3px rgba(220,53,69,0.1)';
            isValid = false;
        } else {
            input.style.borderColor = '#10b981';
            input.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.1)';
        }
    });
    
    return isValid;
}

// Add loading state to buttons
function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.innerHTML = '<span class="loading-spinner"></span>Processing...';
        button.style.opacity = '0.8';
        button.style.cursor = 'not-allowed';
    } else {
        button.disabled = false;
        const originalText = button.getAttribute('aria-label') || 'Submit';
        button.innerHTML = originalText;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }
}

// Add page loader
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(255,255,255,0.9); z-index: 9999; 
                    display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center;">
                <div class="loading-spinner" style="width: 40px; height: 40px; margin: 0 auto 20px;"></div>
                <p style="color: #1e40af; font-weight: 600;">Loading...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        if (document.getElementById('pageLoader')) {
            document.getElementById('pageLoader').remove();
        }
    }, 1500);
}

// Handle form submissions
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (validateForm(form)) {
                setButtonLoading(submitBtn, true);
                
                const formData = new FormData(form);
                const formType = form.closest('.tab-content') ? 
                    (form.closest('#buyer-tab') ? 'Buyer' : 'Seller') : 'Contact';
                
                // Simulate API call
                setTimeout(() => {
                    setButtonLoading(submitBtn, false);
                    showMessage(`✅ ${formType} registration submitted successfully!`);
                    form.reset();
                    
                    // Reset form styling
                    form.querySelectorAll('input, select, textarea').forEach(input => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    });
                }, 2000);
            } else {
                showMessage('❌ Please fill all required fields!');
            }
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
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

// Add page loading animation
function initPageLoading() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
}

// Add intersection observer for animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .product-card, .stat-card, .benefit-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Make all elements clickable
function initClickHandlers() {
    // Feature cards click
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = '', 150);
        });
    });
    
    // Product cards click
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            showMessage('🛒 Product details coming soon!');
        });
    });
    
    // Stat cards click
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.1)';
            setTimeout(() => card.style.transform = '', 200);
        });
    });
    
    // Logo click
    document.querySelector('.nav-brand').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Fix all page links with loading
function fixPageLinks() {
    const pages = ['products.html', 'cart.html', 'how-it-works.html', 'why-choose-us.html', 'contact.html'];
    
    pages.forEach(page => {
        document.querySelectorAll(`a[href="${page}"]`).forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPageLoader();
                setTimeout(() => {
                    window.location.href = page;
                }, 500);
            });
        });
    });
}

// Add error boundary
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    showMessage('❌ Something went wrong. Please refresh the page.');
});

// Add network status
window.addEventListener('online', () => {
    showMessage('✅ Connection restored');
});

window.addEventListener('offline', () => {
    showMessage('⚠️ No internet connection');
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initPageLoading();
    loadCart();
    displayCart();
    initMobileMenu();
    initScrollToTop();
    initSearch();
    initForms();
    initSmoothScroll();
    initScrollAnimations();
    initClickHandlers();
    fixPageLinks();
});

// Also initialize on window load
window.addEventListener('load', function() {
    loadCart();
    displayCart();
});