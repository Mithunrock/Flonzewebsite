const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'auto', 'mini', 'sedan', 'truck'],
    required: [true, 'Vehicle type is required']
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    unique: true
  },
  vehicleModel: String,
  documents: {
    license: {
      url: String,
      verified: { type: Boolean, default: false }
    },
    aadhar: {
      url: String,
      verified: { type: Boolean, default: false }
    },
    pan: {
      url: String,
      verified: { type: Boolean, default: false }
    },
    vehicleRC: {
      url: String,
      verified: { type: Boolean, default: false }
    },
    insurance: {
      url: String,
      verified: { type: Boolean, default: false }
    }
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: { type: Date, default: Date.now }
  },
  availability: {
    isOnline: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true }
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  earnings: {
    today: { type: Number, default: 0 },
    thisWeek: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  stats: {
    totalDeliveries: { type: Number, default: 0 },
    completedDeliveries: { type: Number, default: 0 },
    cancelledDeliveries: { type: Number, default: 0 }
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    accountHolderName: String,
    verified: { type: Boolean, default: false }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

// Update location method
driverSchema.methods.updateLocation = function(latitude, longitude) {
  this.currentLocation = {
    latitude,
    longitude,
    lastUpdated: new Date()
  };
  return this.save();
};

// Update rating method
driverSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

module.exports = mongoose.model('Driver', driverSchema);