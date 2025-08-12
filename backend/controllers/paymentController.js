const Razorpay = require('razorpay');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay order
// @route   POST /api/payments/razorpay/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const options = {
      amount: booking.fare.totalFare * 100, // amount in paise
      currency: 'INR',
      receipt: `booking_${booking.bookingId}`,
      notes: {
        bookingId: booking._id.toString(),
        customerId: req.user.id
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payments/razorpay/verify
// @access  Private
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Update booking payment status
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.paymentDetails.status = 'completed';
    booking.paymentDetails.transactionId = razorpay_payment_id;
    booking.paymentDetails.paidAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      booking
    });
  } catch (error) {
    console.error('Verify Razorpay payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
};

// @desc    Create Stripe payment intent
// @route   POST /api/payments/stripe/create-intent
// @access  Private
exports.createStripePaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.fare.totalFare * 100, // amount in cents
      currency: 'inr',
      metadata: {
        bookingId: booking._id.toString(),
        customerId: req.user.id
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Create Stripe payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent'
    });
  }
};

// @desc    Confirm Stripe payment
// @route   POST /api/payments/stripe/confirm
// @access  Private
exports.confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.paymentDetails.status = 'completed';
        booking.paymentDetails.transactionId = paymentIntentId;
        booking.paymentDetails.paidAt = new Date();
        await booking.save();
      }

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        booking
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not successful'
      });
    }
  } catch (error) {
    console.error('Confirm Stripe payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment confirmation failed'
    });
  }
};

// @desc    Process refund
// @route   POST /api/payments/refund
// @access  Private (Admin)
exports.processRefund = async (req, res) => {
  try {
    const { bookingId, amount, reason } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.paymentDetails.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'No completed payment found for this booking'
      });
    }

    let refund;
    const refundAmount = amount || booking.fare.totalFare;

    // Process refund based on payment method
    if (booking.paymentDetails.method === 'online') {
      // Assuming Razorpay was used for online payments
      refund = await razorpay.payments.refund(booking.paymentDetails.transactionId, {
        amount: refundAmount * 100, // amount in paise
        notes: {
          reason,
          bookingId: booking.bookingId
        }
      });
    }

    // Update booking payment status
    booking.paymentDetails.status = 'refunded';
    await booking.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      refund: {
        id: refund?.id,
        amount: refundAmount,
        status: refund?.status
      }
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Refund processing failed'
    });
  }
};

// @desc    Get payment history
// @route   GET /api/payments/history
// @access  Private
exports.getPaymentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const bookings = await Booking.find({
      customerId: req.user.id,
      'paymentDetails.status': { $in: ['completed', 'refunded'] }
    })
    .select('bookingId fare paymentDetails createdAt')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await Booking.countDocuments({
      customerId: req.user.id,
      'paymentDetails.status': { $in: ['completed', 'refunded'] }
    });

    res.json({
      success: true,
      payments: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
};