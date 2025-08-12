// Global state
let currentUser = null;
let products = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  loadProducts();
  initializeForms();
});

// Authentication
function checkAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    currentUser = JSON.parse(localStorage.getItem('user'));
    updateAuthUI();
  }
}

function showAuth(type) {
  document.getElementById('authModal').style.display = 'block';
  document.getElementById('loginTab').style.display = type === 'login' ? 'block' : 'none';
  document.getElementById('registerTab').style.display = type === 'register' ? 'block' : 'none';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

async function login(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      currentUser = data.user;
      updateAuthUI();
      closeModal('authModal');
      showNotification('Login successful!', 'success');
    } else {
      showNotification(data.error, 'error');
    }
  } catch (error) {
    showNotification('Login failed', 'error');
  }
}

async function register(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      showNotification('Registration successful! Please login.', 'success');
      document.getElementById('loginTab').style.display = 'block';
      document.getElementById('registerTab').style.display = 'none';
    } else {
      showNotification(data.error, 'error');
    }
  } catch (error) {
    showNotification('Registration failed', 'error');
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentUser = null;
  updateAuthUI();
  showNotification('Logged out successfully', 'success');
}

function updateAuthUI() {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  
  if (currentUser) {
    if (authButtons) authButtons.style.display = 'none';
    if (userMenu) {
      userMenu.style.display = 'block';
      document.getElementById('userName').textContent = currentUser.name;
    }
  } else {
    if (authButtons) authButtons.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
  }
}

// Products
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    products = await response.json();
    displayProducts();
  } catch (error) {
    console.error('Failed to load products:', error);
  }
}

function displayProducts() {
  const container = document.getElementById('productsContainer');
  if (container) {
    container.innerHTML = products.map(product => `
      <div class="product-card" onclick="showProductDetail('${product._id}')">
        <img src="/images/${product.image}" alt="${product.name}" onerror="this.src='/images/default.jpg'">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p class="description">${product.description.substring(0, 100)}...</p>
      </div>
    `).join('');
  }
}

function showProductDetail(id) {
  const product = products.find(p => p._id === id);
  if (product) {
    document.getElementById('productDetailContent').innerHTML = `
      <h2>${product.name}</h2>
      <img src="/images/${product.image}" alt="${product.name}" onerror="this.src='/images/default.jpg'">
      <p class="price">₹${product.price}</p>
      <p>${product.description}</p>
      <button class="btn-primary" onclick="addToCart('${product._id}')">Add to Cart</button>
    `;
    document.getElementById('productModal').style.display = 'block';
  }
}

function addToCart(productId) {
  showNotification('Product added to cart!', 'success');
  closeModal('productModal');
}

// Contact Form
async function submitContact(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      showNotification('Message sent successfully!', 'success');
      event.target.reset();
    } else {
      showNotification(data.error, 'error');
    }
  } catch (error) {
    showNotification('Failed to send message', 'error');
  }
}

// Form Validation
function initializeForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
    });
  });
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();
  
  if (!value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  if (field.type === 'email' && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email');
    return false;
  }
  
  clearFieldError(field);
  return true;
}

function showFieldError(field, message) {
  clearFieldError(field);
  const error = document.createElement('div');
  error.className = 'field-error';
  error.textContent = message;
  field.parentNode.appendChild(error);
  field.classList.add('error');
}

function clearFieldError(field) {
  const error = field.parentNode.querySelector('.field-error');
  if (error) error.remove();
  field.classList.remove('error');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Notifications
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}