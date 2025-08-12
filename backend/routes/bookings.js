const express = require('express');
const { body } = require('express-validator');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
  rateBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Validation rules
const createBookingValidation = [
  body('pickupLocation.address').notEmpty().withMessage('Pickup address is required'),
  body('pickupLocation.latitude').isFloat().withMessage('Valid pickup latitude is required'),
  body('pickupLocation.longitude').isFloat().withMessage('Valid pickup longitude is required'),
  body('pickupLocation.contactName').notEmpty().withMessage('Pickup contact name is required'),
  body('pickupLocation.contactPhone').matches(/^[6-9]\d{9}$/).withMessage('Valid pickup contact phone is required'),
  
  body('dropLocation.address').notEmpty().withMessage('Drop address is required'),
  body('dropLocation.latitude').isFloat().withMessage('Valid drop latitude is required'),
  body('dropLocation.longitude').isFloat().withMessage('Valid drop longitude is required'),
  body('dropLocation.contactName').notEmpty().withMessage('Drop contact name is required'),
  body('dropLocation.contactPhone').matches(/^[6-9]\d{9}$/).withMessage('Valid drop contact phone is required'),
  
  body('packageDetails.type').isIn(['documents', 'electronics', 'clothing', 'food', 'fragile', 'other']).withMessage('Valid package type is required'),
  body('packageDetails.weight').isFloat({ min: 0.1 }).withMessage('Package weight must be at least 0.1 kg'),
  
  body('vehicleType').isIn(['bike', 'auto', 'mini', 'sedan', 'truck']).withMessage('Valid vehicle type is required'),
  body('paymentMethod').isIn(['cash', 'online', 'wallet']).withMessage('Valid payment method is required')
];

const updateStatusValidation = [
  body('status').isIn(['assigned', 'accepted', 'picked_up', 'in_transit', 'delivered', 'cancelled']).withMessage('Valid status is required')
];

const rateBookingValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

// Routes
router.post('/', protect, createBookingValidation, createBooking);
router.get('/', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, authorize('driver', 'admin'), updateStatusValidation, updateBookingStatus);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/rate', protect, rateBookingValidation, rateBooking);

module.exports = router;