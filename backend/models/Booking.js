const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  pickupLocation: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true }
  },
  dropLocation: {
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true }
  },
  packageDetails: {
    type: {
      type: String,
      enum: ['documents', 'electronics', 'clothing', 'food', 'fragile', 'other'],
      required: true
    },
    weight: { type: Number, required: true, min: 0.1 },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    description: String,
    value: Number,
    specialInstructions: String
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'auto', 'mini', 'sedan', 'truck'],
    required: true
  },
  fare: {
    baseFare: { type: Number, required: true },
    distanceFare: { type: Number, required: true },
    weightCharge: { type: Number, default: 0 },
    additionalCharges: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalFare: { type: Number, required: true }
  },
  distance: {
    type: Number,
    required: true
  },
  estimatedDuration: Number, // in minutes
  status: {
    type: String,
    enum: ['pending', 'assigned', 'accepted', 'picked_up', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    location: {
      latitude: Number,
      longitude: Number
    },
    note: String
  }],
  paymentDetails: {
    method: {
      type: String,
      enum: ['cash', 'online', 'wallet'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  otp: {
    pickup: String,
    delivery: String
  },
  rating: {
    customerRating: { type: Number, min: 1, max: 5 },
    driverRating: { type: Number, min: 1, max: 5 },
    customerFeedback: String,
    driverFeedback: String
  },
  scheduledAt: Date,
  assignedAt: Date,
  pickedUpAt: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  cancellationReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'FL' + Date.now() + Math.random().toString(36).substring(2, 5).toUpperCase();
  }
  next();
});

// Generate OTP method
bookingSchema.methods.generateOTP = function() {
  this.otp.pickup = Math.floor(1000 + Math.random() * 9000).toString();
  this.otp.delivery = Math.floor(1000 + Math.random() * 9000).toString();
  return this.save();
};

// Update status method
bookingSchema.methods.updateStatus = function(status, location = null, note = null) {
  this.status = status;
  this.statusHistory.push({
    status,
    location,
    note,
    timestamp: new Date()
  });
  
  // Update timestamps based on status
  switch(status) {
    case 'assigned':
      this.assignedAt = new Date();
      break;
    case 'picked_up':
      this.pickedUpAt = new Date();
      break;
    case 'delivered':
      this.deliveredAt = new Date();
      break;
    case 'cancelled':
      this.cancelledAt = new Date();
      break;
  }
  
  return this.save();
};

module.exports = mongoose.model('Booking', bookingSchema);