// Products data
const products = [
    { id: 1, name: 'Premium Basmati Rice', price: 120, emoji: '🍚', location: 'Punjab', seller: 'Singh Farms', rating: 4.8, 
      description: 'Premium quality Basmati rice with long grains and aromatic fragrance. Perfect for biryanis and pulao.',
      benefits: ['Long grain variety', 'Aromatic fragrance', 'Low glycemic index', 'Rich in nutrients'],
      specifications: 'Grain Length: 6.5mm+, Moisture: 12-14%, Broken: <5%' },
    { id: 2, name: 'Organic Wheat', price: 45, emoji: '🌾', location: 'Haryana', seller: 'Green Valley', rating: 4.6 },
    { id: 3, name: 'Fresh Turmeric', price: 180, emoji: '🟡', location: 'Kerala', seller: 'Spice Garden', rating: 4.9 },
    { id: 4, name: 'Red Chili Powder', price: 220, emoji: '🌶️', location: 'Andhra Pradesh', seller: 'Hot Spices Co', rating: 4.7 },
    { id: 5, name: 'Black Pepper', price: 850, emoji: '⚫', location: 'Karnataka', seller: 'Pepper King', rating: 4.8 },
    { id: 6, name: 'Cardamom', price: 1200, emoji: '🟢', location: 'Kerala', seller: 'Cardamom Hills', rating: 4.9 },
    { id: 7, name: 'Cumin Seeds', price: 320, emoji: '🟤', location: 'Gujarat', seller: 'Desert Spices', rating: 4.5 },
    { id: 8, name: 'Coriander Seeds', price: 180, emoji: '🌿', location: 'Rajasthan', seller: 'Royal Herbs', rating: 4.6 },
    { id: 9, name: 'Mustard Seeds', price: 95, emoji: '🟡', location: 'West Bengal', seller: 'Bengal Oils', rating: 4.4 },
    { id: 10, name: 'Fenugreek Seeds', price: 140, emoji: '🟫', location: 'Madhya Pradesh', seller: 'Central Spices', rating: 4.3 },
    { id: 11, name: 'Cloves', price: 950, emoji: '🟤', location: 'Tamil Nadu', seller: 'South Spices', rating: 4.8 },
    { id: 12, name: 'Cinnamon Sticks', price: 420, emoji: '🟫', location: 'Kerala', seller: 'Spice Coast', rating: 4.7 },
    { id: 13, name: 'Soybean', price: 65, emoji: '🟡', location: 'Maharashtra', seller: 'Soya Farms', rating: 4.5 },
    { id: 14, name: 'Groundnuts', price: 85, emoji: '🥜', location: 'Gujarat', seller: 'Nut Valley', rating: 4.6 },
    { id: 15, name: 'Sesame Seeds', price: 160, emoji: '⚪', location: 'Uttar Pradesh', seller: 'Sesame Co', rating: 4.4 },
    { id: 16, name: 'Sunflower Seeds', price: 75, emoji: '🌻', location: 'Karnataka', seller: 'Sun Farms', rating: 4.3 },
    { id: 17, name: 'Cotton Seeds', price: 55, emoji: '🤍', location: 'Gujarat', seller: 'Cotton King', rating: 4.2 },
    { id: 18, name: 'Maize', price: 35, emoji: '🌽', location: 'Bihar', seller: 'Corn Fields', rating: 4.4 },
    { id: 19, name: 'Barley', price: 40, emoji: '🌾', location: 'Rajasthan', seller: 'Desert Grains', rating: 4.3 },
    { id: 20, name: 'Millets', price: 80, emoji: '🌾', location: 'Karnataka', seller: 'Healthy Grains', rating: 4.7 },
    { id: 21, name: 'Green Gram', price: 110, emoji: '🟢', location: 'Andhra Pradesh', seller: 'Pulse Power', rating: 4.5 },
    { id: 22, name: 'Black Gram', price: 125, emoji: '⚫', location: 'Tamil Nadu', seller: 'Dal Direct', rating: 4.6 },
    { id: 23, name: 'Chickpeas', price: 90, emoji: '🟡', location: 'Madhya Pradesh', seller: 'Chana Champ', rating: 4.4 },
    { id: 24, name: 'Red Lentils', price: 105, emoji: '🔴', location: 'West Bengal', seller: 'Lentil Land', rating: 4.5 },
    { id: 25, name: 'Pigeon Peas', price: 115, emoji: '🟡', location: 'Maharashtra', seller: 'Arhar Express', rating: 4.3 },
    { id: 26, name: 'Star Anise', price: 680, emoji: '⭐', location: 'Arunachal Pradesh', seller: 'Star Spices', rating: 4.8 },
    { id: 27, name: 'Bay Leaves', price: 280, emoji: '🍃', location: 'Himachal Pradesh', seller: 'Mountain Herbs', rating: 4.6 },
    { id: 28, name: 'Nutmeg', price: 1100, emoji: '🟤', location: 'Kerala', seller: 'Spice Paradise', rating: 4.9 },
    { id: 29, name: 'Mace', price: 1500, emoji: '🟠', location: 'Kerala', seller: 'Premium Spices', rating: 4.8 },
    { id: 30, name: 'Asafoetida', price: 2200, emoji: '🟡', location: 'Kashmir', seller: 'Hing House', rating: 4.7 },
    { id: 31, name: 'Fennel Seeds', price: 190, emoji: '🟢', location: 'Gujarat', seller: 'Fennel Fresh', rating: 4.5 },
    { id: 32, name: 'Carom Seeds', price: 240, emoji: '🟫', location: 'Rajasthan', seller: 'Ajwain King', rating: 4.4 }
];

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
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
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

// Mobile menu - Simple and reliable
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu toggled:', navMenu.classList.contains('active'));
        });
        
        // Close on menu item click
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
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
    document.body.style.transition = 'opacity 0.3s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Preload critical images
    const images = ['logo.png', 'hero-banner.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
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
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = '', 150);
            showMessage('📋 Feature details coming soon!');
        });
    });
    
    // Product cards click
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showMessage('🛒 Product details coming soon!');
        });
    });
    
    // Stat cards click
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => card.style.transform = '', 200);
        });
    });
    
    // Logo click
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.style.cursor = 'pointer';
        navBrand.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Category cards click
    document.querySelectorAll('.category-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showMessage('🔍 Category products coming soon!');
        });
    });
    
    // Benefit cards click
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showMessage('ℹ️ More details coming soon!');
        });
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

// Display products on products page
function displayProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.name.toLowerCase()}" data-location="${product.location.toLowerCase()}" data-price="${product.price}" onclick="showProductDetails(${product.id})">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="product-price">₹${product.price}/kg</div>
                <div class="product-location">📍 ${product.location}</div>
                <div class="product-seller">👤 ${product.seller}</div>
                <div class="product-rating">⭐ ${product.rating}</div>
            </div>
            <div class="product-actions" onclick="event.stopPropagation()">
                <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price}, '${product.location}', '${product.seller}', '${product.emoji}')">
                    Add to Cart
                </button>
                <button class="buy-now-btn" onclick="buyNow('${product.name}', ${product.price}, '${product.location}', '${product.seller}')">
                    Buy Now
                </button>
                <button class="wishlist-btn" onclick="toggleWishlist(this)">♡</button>
            </div>
        </div>
    `).join('');
}

// Show product details modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-header">
                <h2>${product.emoji} ${product.name}</h2>
                <button class="close-modal" onclick="closeProductModal()">&times;</button>
            </div>
            <div class="product-modal-body">
                <div class="product-details">
                    <div class="product-price-large">₹${product.price}/kg</div>
                    <div class="product-meta">
                        <p><strong>📍 Location:</strong> ${product.location}</p>
                        <p><strong>👤 Seller:</strong> ${product.seller}</p>
                        <p><strong>⭐ Rating:</strong> ${product.rating}/5</p>
                    </div>
                    <div class="product-description">
                        <h3>About This Product</h3>
                        <p>${product.description || 'High quality agricultural product sourced directly from verified farmers.'}</p>
                    </div>
                    <div class="product-benefits">
                        <h3>Key Benefits</h3>
                        <ul>
                            <li>Premium quality guaranteed</li>
                            <li>Direct from verified farmers</li>
                            <li>Fresh and organic</li>
                            <li>Best market prices</li>
                        </ul>
                    </div>
                </div>
                <div class="product-modal-actions">
                    <button class="btn-primary" onclick="addToCart('${product.name}', ${product.price}, '${product.location}', '${product.seller}', '${product.emoji}'); closeProductModal();">Add to Cart</button>
                    <button class="btn-secondary" onclick="buyNow('${product.name}', ${product.price}, '${product.location}', '${product.seller}'); closeProductModal();">Buy Now</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close product details modal
function closeProductModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Modern enhancements
function initModernFeatures() {
    // Add loading states to buttons
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .category-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add form validation feedback
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.style.borderColor = 'var(--success)';
            } else {
                this.style.borderColor = 'var(--danger)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initPageLoading();
    loadCart();
    displayCart();
    displayProducts();
    initMobileMenu();
    initScrollToTop();
    initSearch();
    initForms();
    initSmoothScroll();
    initScrollAnimations();
    initClickHandlers();
    fixPageLinks();
    initModernFeatures();
});

// Also initialize on window load
window.addEventListener('load', function() {
    loadCart();
    displayCart();
});