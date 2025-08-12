#!/usr/bin/env python3
"""
Flonze Fulfillment Backend API
Python Flask application with advanced features
"""

import os
import json
import sqlite3
import hashlib
import smtplib
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from functools import wraps
import requests
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'flonze-secret-key-2025'
CORS(app)

# Database configuration
DATABASE = 'flonze_fulfillment.db'

class FlonzeAPI:
    def __init__(self):
        self.init_database()
        self.shipping_rates = {
            'local': 25,
            'metro': 35,
            'tier2': 45,
            'remote': 65
        }
        
    def init_database(self):
        """Initialize SQLite database with required tables"""
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT NOT NULL,
                phone TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Contact submissions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                message TEXT NOT NULL,
                status TEXT DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Shipping calculations table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS shipping_calculations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                weight REAL NOT NULL,
                destination TEXT NOT NULL,
                cost REAL NOT NULL,
                user_ip TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Analytics events table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS analytics_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_name TEXT NOT NULL,
                event_data TEXT,
                user_ip TEXT,
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")

# Initialize API
api = FlonzeAPI()

def require_auth(f):
    """Decorator for routes that require authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401
        
        try:
            token = token.replace('Bearer ', '')
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user_id = data['user_id']
        except:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(current_user_id, *args, **kwargs)
    return decorated

@app.route('/')
def home():
    """Serve the main website"""
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Flonze Fulfillment API</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .method { color: #007bff; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>🚀 Flonze Fulfillment API</h1>
        <p>Backend API for Flonze e-commerce fulfillment platform</p>
        
        <h2>Available Endpoints:</h2>
        
        <div class="endpoint">
            <span class="method">POST</span> /api/contact - Submit contact form
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span> /api/shipping/calculate - Calculate shipping cost
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span> /api/analytics/events - Track analytics events
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span> /api/auth/register - User registration
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span> /api/auth/login - User login
        </div>
        
        <div class="endpoint">
            <span class="method">GET</span> /api/stats - Get website statistics
        </div>
        
        <div class="endpoint">
            <span class="method">GET</span> /api/health - Health check
        </div>
    </body>
    </html>
    ''')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0'
    })

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        import re
        email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_pattern, data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Save to database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO contact_submissions (name, email, phone, message)
            VALUES (?, ?, ?, ?)
        ''', (data['name'], data['email'], data.get('phone', ''), data['message']))
        
        submission_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Send notification email (in production)
        send_notification_email(data)
        
        logger.info(f"Contact form submitted: {submission_id}")
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message. We will get back to you soon!',
            'submission_id': submission_id
        })
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/shipping/calculate', methods=['POST'])
def calculate_shipping():
    """Calculate shipping costs"""
    try:
        data = request.get_json()
        
        weight = float(data.get('weight', 0))
        destination = data.get('destination', '')
        
        if weight <= 0:
            return jsonify({'error': 'Weight must be greater than 0'}), 400
        
        if destination not in api.shipping_rates:
            return jsonify({'error': 'Invalid destination'}), 400
        
        # Calculate cost
        base_rate = api.shipping_rates[destination]
        cost = round(weight * base_rate, 2)
        
        # Apply discounts for bulk orders
        if weight > 10:
            cost *= 0.9  # 10% discount for orders > 10kg
        elif weight > 5:
            cost *= 0.95  # 5% discount for orders > 5kg
        
        cost = round(cost, 2)
        
        # Save calculation to database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO shipping_calculations (weight, destination, cost, user_ip)
            VALUES (?, ?, ?, ?)
        ''', (weight, destination, cost, request.remote_addr))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'weight': weight,
            'destination': destination,
            'cost': cost,
            'currency': 'INR',
            'estimated_delivery': get_delivery_estimate(destination)
        })
        
    except ValueError:
        return jsonify({'error': 'Invalid weight value'}), 400
    except Exception as e:
        logger.error(f"Shipping calculation error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/analytics/events', methods=['POST'])
def track_event():
    """Track analytics events"""
    try:
        data = request.get_json()
        
        event_name = data.get('event', '')
        event_data = json.dumps(data.get('data', {}))
        
        if not event_name:
            return jsonify({'error': 'Event name is required'}), 400
        
        # Save to database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO analytics_events (event_name, event_data, user_ip, user_agent)
            VALUES (?, ?, ?, ?)
        ''', (event_name, event_data, request.remote_addr, request.headers.get('User-Agent', '')))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
        
    except Exception as e:
        logger.error(f"Analytics tracking error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/auth/register', methods=['POST'])
def register_user():
    """User registration"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate email format
        import re
        email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_pattern, data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if user already exists
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id FROM users WHERE email = ?', (data['email'],))
        if cursor.fetchone():
            conn.close()
            return jsonify({'error': 'User already exists'}), 400
        
        # Hash password and save user
        password_hash = generate_password_hash(data['password'])
        
        cursor.execute('''
            INSERT INTO users (name, email, password_hash, phone)
            VALUES (?, ?, ?, ?)
        ''', (data['name'], data['email'], password_hash, data.get('phone', '')))
        
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user_id,
            'email': data['email'],
            'exp': datetime.utcnow() + timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': user_id,
                'name': data['name'],
                'email': data['email']
            }
        })
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login_user():
    """User login"""
    try:
        data = request.get_json()
        
        email = data.get('email', '')
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Check user credentials
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, name, email, password_hash FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        conn.close()
        
        if not user or not check_password_hash(user[3], password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user[0],
            'email': user[2],
            'exp': datetime.utcnow() + timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user[0],
                'name': user[1],
                'email': user[2]
            }
        })
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get website statistics"""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Get contact submissions count
        cursor.execute('SELECT COUNT(*) FROM contact_submissions')
        contact_count = cursor.fetchone()[0]
        
        # Get shipping calculations count
        cursor.execute('SELECT COUNT(*) FROM shipping_calculations')
        shipping_count = cursor.fetchone()[0]
        
        # Get user registrations count
        cursor.execute('SELECT COUNT(*) FROM users')
        user_count = cursor.fetchone()[0]
        
        # Get recent analytics events
        cursor.execute('''
            SELECT event_name, COUNT(*) as count 
            FROM analytics_events 
            WHERE created_at > datetime('now', '-7 days')
            GROUP BY event_name
            ORDER BY count DESC
            LIMIT 10
        ''')
        recent_events = cursor.fetchall()
        
        conn.close()
        
        return jsonify({
            'success': True,
            'stats': {
                'total_contacts': contact_count,
                'total_shipping_calculations': shipping_count,
                'total_users': user_count,
                'recent_events': [{'event': event[0], 'count': event[1]} for event in recent_events]
            }
        })
        
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def send_notification_email(data):
    """Send notification email for contact form submissions"""
    try:
        # Email configuration (use environment variables in production)
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('SMTP_PORT', '587'))
        smtp_username = os.getenv('SMTP_USERNAME', 'your-email@gmail.com')
        smtp_password = os.getenv('SMTP_PASSWORD', 'your-app-password')
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = 'hello@flonzefulfillment.com'
        msg['Subject'] = f"New Contact Form Submission from {data['name']}"
        
        body = f"""
        New contact form submission received:
        
        Name: {data['name']}
        Email: {data['email']}
        Phone: {data.get('phone', 'Not provided')}
        
        Message:
        {data['message']}
        
        Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        text = msg.as_string()
        server.sendmail(smtp_username, 'hello@flonzefulfillment.com', text)
        server.quit()
        
        logger.info("Notification email sent successfully")
        
    except Exception as e:
        logger.error(f"Email sending failed: {str(e)}")

def get_delivery_estimate(destination):
    """Get delivery time estimate based on destination"""
    estimates = {
        'local': '1-2 days',
        'metro': '2-3 days',
        'tier2': '3-5 days',
        'remote': '5-7 days'
    }
    return estimates.get(destination, '3-5 days')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Create database tables
    api.init_database()
    
    # Run the application
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting Flonze API server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)