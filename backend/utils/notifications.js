const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send notification via email and SMS
 * @param {object} options - Notification options
 */
exports.sendNotification = async (options) => {
  try {
    const { type, userId, bookingId, message, email, phone } = options;
    
    // Send email notification
    if (email && process.env.SENDGRID_API_KEY) {
      await sendEmail({
        to: email,
        subject: getEmailSubject(type),
        html: getEmailTemplate(type, message, bookingId)
      });
    }
    
    // Send SMS notification
    if (phone && process.env.TWILIO_ACCOUNT_SID) {
      await sendSMS({
        to: phone,
        message: getSMSMessage(type, message, bookingId)
      });
    }
    
    console.log(`Notification sent: ${type} for booking ${bookingId}`);
  } catch (error) {
    console.error('Send notification error:', error);
    // Don't throw error to avoid breaking the main flow
  }
};

/**
 * Send email using SendGrid
 * @param {object} options - Email options
 */
const sendEmail = async (options) => {
  try {
    const msg = {
      to: options.to,
      from: process.env.FROM_EMAIL,
      subject: options.subject,
      html: options.html
    };
    
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Send email error:', error);
    throw error;
  }
};

/**
 * Send SMS using Twilio
 * @param {object} options - SMS options
 */
const sendSMS = async (options) => {
  try {
    await twilioClient.messages.create({
      body: options.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${options.to}`
    });
    
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Send SMS error:', error);
    throw error;
  }
};

/**
 * Get email subject based on notification type
 * @param {string} type - Notification type
 * @returns {string} Email subject
 */
const getEmailSubject = (type) => {
  const subjects = {
    booking_created: 'Booking Confirmation - Flonze',
    booking_assigned: 'Driver Assigned - Flonze',
    status_update: 'Booking Status Update - Flonze',
    booking_completed: 'Delivery Completed - Flonze',
    booking_cancelled: 'Booking Cancelled - Flonze',
    payment_success: 'Payment Successful - Flonze',
    payment_failed: 'Payment Failed - Flonze'
  };
  
  return subjects[type] || 'Notification - Flonze';
};

/**
 * Get email template based on notification type
 * @param {string} type - Notification type
 * @param {string} message - Notification message
 * @param {string} bookingId - Booking ID
 * @returns {string} HTML email template
 */
const getEmailTemplate = (type, message, bookingId) => {
  const baseTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Flonze Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1E3A8A; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { padding: 20px; text-align: center; color: #666; }
        .btn { display: inline-block; padding: 12px 24px; background: #F97316; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚚 Flonze</h1>
        </div>
        <div class="content">
          <h2>${getEmailSubject(type)}</h2>
          <p>${message}</p>
          ${bookingId ? `<p><strong>Booking ID:</strong> ${bookingId}</p>` : ''}
          <p>
            <a href="https://flonze.com/track/${bookingId}" class="btn">Track Your Order</a>
          </p>
        </div>
        <div class="footer">
          <p>Thank you for choosing Flonze!</p>
          <p>For support, contact us at support@flonze.com or +91 81083 95367</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return baseTemplate;
};

/**
 * Get SMS message based on notification type
 * @param {string} type - Notification type
 * @param {string} message - Notification message
 * @param {string} bookingId - Booking ID
 * @returns {string} SMS message
 */
const getSMSMessage = (type, message, bookingId) => {
  const baseMessage = `Flonze: ${message}`;
  
  if (bookingId) {
    return `${baseMessage} Booking ID: ${bookingId}. Track: https://flonze.com/track/${bookingId}`;
  }
  
  return baseMessage;
};

/**
 * Send booking confirmation notification
 * @param {object} booking - Booking object
 * @param {object} user - User object
 */
exports.sendBookingConfirmation = async (booking, user) => {
  const message = `Your booking has been confirmed! Pickup from ${booking.pickupLocation.address} to ${booking.dropLocation.address}. Fare: ₹${booking.fare.totalFare}`;
  
  await this.sendNotification({
    type: 'booking_created',
    userId: user._id,
    bookingId: booking.bookingId,
    message,
    email: user.email,
    phone: user.phone
  });
};

/**
 * Send driver assignment notification
 * @param {object} booking - Booking object
 * @param {object} driver - Driver object
 */
exports.sendDriverAssignment = async (booking, driver) => {
  const message = `New booking assigned! Pickup: ${booking.pickupLocation.address}. Customer: ${booking.pickupLocation.contactName} (${booking.pickupLocation.contactPhone})`;
  
  await this.sendNotification({
    type: 'booking_assigned',
    userId: driver.userId._id,
    bookingId: booking.bookingId,
    message,
    email: driver.userId.email,
    phone: driver.userId.phone
  });
};

/**
 * Send status update notification
 * @param {object} booking - Booking object
 * @param {object} user - User object
 * @param {string} status - New status
 */
exports.sendStatusUpdate = async (booking, user, status) => {
  const statusMessages = {
    assigned: 'Driver has been assigned to your booking',
    accepted: 'Driver has accepted your booking',
    picked_up: 'Your package has been picked up',
    in_transit: 'Your package is on the way',
    delivered: 'Your package has been delivered successfully',
    cancelled: 'Your booking has been cancelled'
  };
  
  const message = statusMessages[status] || `Your booking status has been updated to ${status}`;
  
  await this.sendNotification({
    type: 'status_update',
    userId: user._id,
    bookingId: booking.bookingId,
    message,
    email: user.email,
    phone: user.phone
  });
};