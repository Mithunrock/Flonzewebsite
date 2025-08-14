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
    msg.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: #10b981; 
        color: white; padding: 15px 25px; border-radius: 25px; 
        font-weight: 600; z-index: 2000;
    `;
    msg.textContent = text;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
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
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) selectedTab.style.display = 'block';
    
    if (event && event.target) {
        event.target.classList.add('active');
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

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    displayCart();
    initMobileMenu();
    initScrollToTop();
    initSearch();
});

// Also initialize on window load
window.addEventListener('load', function() {
    loadCart();
    displayCart();
});