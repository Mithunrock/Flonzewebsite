// Checkout functionality
let orderData = {};

// Load order data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadOrderData();
    initPaymentOptions();
});

// Load cart data for checkout
function loadOrderData() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        displayOrderItems(cart);
        calculateOrderTotals(cart);
    } catch (e) {
        console.error('Error loading order data:', e);
    }
}

// Display order items
function displayOrderItems(cart) {
    const container = document.getElementById('orderItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>No items in cart</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="order-item">
            <span class="item-emoji">${item.emoji}</span>
            <div class="item-details">
                <h5>${item.name}</h5>
                <p>₹${item.price}/kg × ${item.quantity}kg</p>
            </div>
            <span class="item-total">₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

// Calculate order totals
function calculateOrderTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById('orderSubtotal').textContent = '₹' + subtotal.toFixed(2);
    document.getElementById('orderTax').textContent = '₹' + tax.toFixed(2);
    document.getElementById('orderTotal').textContent = '₹' + total.toFixed(2);

    orderData.subtotal = subtotal;
    orderData.tax = tax;
    orderData.total = total;
}

// Initialize payment options
function initPaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            updatePaymentMethod(this.value);
        });
    });
}

// Update payment method
function updatePaymentMethod(method) {
    orderData.paymentMethod = method;
}

// Proceed to payment
function proceedToPayment() {
    // Validate billing form
    const form = document.getElementById('billingForm');
    const formData = new FormData(form);
    
    // Check if all required fields are filled
    let isValid = true;
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'pincode'];
    
    requiredFields.forEach(field => {
        if (!formData.get(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showMessage('❌ Please fill all billing details');
        return;
    }

    // Store billing data
    orderData.billing = Object.fromEntries(formData);
    orderData.paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Show payment modal
    showPaymentModal();
}

// Show payment modal
function showPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const paymentBody = document.getElementById('paymentBody');
    
    // Generate payment form based on selected method
    paymentBody.innerHTML = generatePaymentForm(orderData.paymentMethod);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Generate payment form based on method
function generatePaymentForm(method) {
    const total = orderData.total.toFixed(2);
    
    switch(method) {
        case 'upi':
            return `
                <div class="upi-payment">
                    <h4>UPI Payment - ₹${total}</h4>
                    <div class="qr-code">
                        <div class="qr-placeholder">📱 QR Code</div>
                        <p>Scan QR code with any UPI app</p>
                    </div>
                    <div class="upi-options">
                        <input type="text" placeholder="Enter UPI ID" id="upiId">
                        <button onclick="processUPIPayment()" class="pay-btn">Pay ₹${total}</button>
                    </div>
                </div>
            `;
        
        case 'card':
            return `
                <div class="card-payment">
                    <h4>Card Payment - ₹${total}</h4>
                    <form class="card-form">
                        <input type="text" placeholder="Card Number" maxlength="19" required>
                        <div class="card-row">
                            <input type="text" placeholder="MM/YY" maxlength="5" required>
                            <input type="text" placeholder="CVV" maxlength="3" required>
                        </div>
                        <input type="text" placeholder="Cardholder Name" required>
                        <button type="button" onclick="processCardPayment()" class="pay-btn">Pay ₹${total}</button>
                    </form>
                </div>
            `;
        
        case 'netbanking':
            return `
                <div class="netbanking-payment">
                    <h4>Net Banking - ₹${total}</h4>
                    <select class="bank-select" required>
                        <option value="">Select Your Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                    </select>
                    <button onclick="processNetBankingPayment()" class="pay-btn">Pay ₹${total}</button>
                </div>
            `;
        
        case 'wallet':
            return `
                <div class="wallet-payment">
                    <h4>Digital Wallet - ₹${total}</h4>
                    <div class="wallet-options">
                        <button onclick="processWalletPayment('paytm')" class="wallet-btn">Paytm</button>
                        <button onclick="processWalletPayment('phonepe')" class="wallet-btn">PhonePe</button>
                        <button onclick="processWalletPayment('googlepay')" class="wallet-btn">Google Pay</button>
                        <button onclick="processWalletPayment('amazonpay')" class="wallet-btn">Amazon Pay</button>
                    </div>
                </div>
            `;
        
        case 'cod':
            return `
                <div class="cod-payment">
                    <h4>Cash on Delivery - ₹${total}</h4>
                    <div class="cod-info">
                        <p>💰 Pay when your order is delivered</p>
                        <p>📦 Additional ₹50 COD charges may apply</p>
                        <p>🚚 Delivery in 3-5 business days</p>
                    </div>
                    <button onclick="processCODPayment()" class="pay-btn">Confirm Order</button>
                </div>
            `;
        
        default:
            return '<p>Please select a payment method</p>';
    }
}

// Payment processing functions
function processUPIPayment() {
    const upiId = document.getElementById('upiId').value;
    if (!upiId) {
        showMessage('❌ Please enter UPI ID');
        return;
    }
    
    simulatePayment('UPI', () => {
        showMessage('✅ UPI Payment Successful!');
        completeOrder();
    });
}

function processCardPayment() {
    simulatePayment('Card', () => {
        showMessage('✅ Card Payment Successful!');
        completeOrder();
    });
}

function processNetBankingPayment() {
    const bank = document.querySelector('.bank-select').value;
    if (!bank) {
        showMessage('❌ Please select your bank');
        return;
    }
    
    simulatePayment('Net Banking', () => {
        showMessage('✅ Net Banking Payment Successful!');
        completeOrder();
    });
}

function processWalletPayment(wallet) {
    simulatePayment(wallet, () => {
        showMessage(`✅ ${wallet} Payment Successful!`);
        completeOrder();
    });
}

function processCODPayment() {
    showMessage('✅ Order Confirmed! Pay on Delivery');
    completeOrder();
}

// Simulate payment processing
function simulatePayment(method, callback) {
    const payBtn = document.querySelector('.pay-btn');
    payBtn.innerHTML = '<span class="loading-spinner"></span>Processing...';
    payBtn.disabled = true;
    
    setTimeout(() => {
        callback();
    }, 2000);
}

// Complete order
function completeOrder() {
    // Clear cart
    localStorage.removeItem('cart');
    
    // Close modal
    closePaymentModal();
    
    // Redirect to success page
    setTimeout(() => {
        window.location.href = 'order-success.html';
    }, 1500);
}

// Show message function (if not already defined)
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
    
    setTimeout(() => {
        msg.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        msg.style.transform = 'translateX(100%)';
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}