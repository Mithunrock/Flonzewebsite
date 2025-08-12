const Booking = require('../models/Booking');
const Driver = require('../models/Driver');
const { calculateFare, calculateDistance } = require('../utils/fareCalculator');
const { sendNotification } = require('../utils/notifications');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropLocation,
      packageDetails,
      vehicleType,
      paymentMethod,
      scheduledAt
    } = req.body;

    // Calculate distance and fare
    const distance = await calculateDistance(
      pickupLocation.latitude,
      pickupLocation.longitude,
      dropLocation.latitude,
      dropLocation.longitude
    );

    const fareDetails = calculateFare(distance, packageDetails.weight, vehicleType);

    // Create booking
    const booking = await Booking.create({
      customerId: req.user.id,
      pickupLocation,
      dropLocation,
      packageDetails,
      vehicleType,
      distance,
      fare: fareDetails,
      paymentDetails: {
        method: paymentMethod
      },
      scheduledAt: scheduledAt || new Date()
    });

    // Generate OTP
    await booking.generateOTP();

    // Find and assign nearest available driver
    const nearbyDrivers = await Driver.find({
      vehicleType,
      'availability.isOnline': true,
      'availability.isAvailable': true,
      isVerified: true,
      isActive: true
    }).populate('userId', 'name phone');

    if (nearbyDrivers.length > 0) {
      // Simple assignment to first available driver
      const assignedDriver = nearbyDrivers[0];
      booking.driverId = assignedDriver._id;
      booking.status = 'assigned';
      await booking.save();

      // Update driver availability
      assignedDriver.availability.isAvailable = false;
      await assignedDriver.save();

      // Send notifications
      await sendNotification({
        type: 'booking_assigned',
        userId: assignedDriver.userId._id,
        bookingId: booking._id,
        message: `New booking assigned: ${booking.bookingId}`
      });
    }

    // Send confirmation to customer
    await sendNotification({
      type: 'booking_created',
      userId: req.user.id,
      bookingId: booking._id,
      message: `Booking created successfully: ${booking.bookingId}`
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('driverId', 'userId vehicleType vehicleNumber rating')
      .populate({
        path: 'driverId',
        populate: {
          path: 'userId',
          select: 'name phone'
        }
      });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during booking creation'
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { customerId: req.user.id };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('driverId', 'userId vehicleType vehicleNumber rating')
      .populate({
        path: 'driverId',
        populate: {
          path: 'userId',
          select: 'name phone'
        }
      })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name phone')
      .populate('driverId', 'userId vehicleType vehicleNumber rating currentLocation')
      .populate({
        path: 'driverId',
        populate: {
          path: 'userId',
          select: 'name phone'
        }
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to view this booking
    if (booking.customerId._id.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        (!booking.driverId || booking.driverId.userId._id.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Driver/Admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, location, note, otp } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify OTP for pickup and delivery
    if (status === 'picked_up' && otp !== booking.otp.pickup) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pickup OTP'
      });
    }

    if (status === 'delivered' && otp !== booking.otp.delivery) {
      return res.status(400).json({
        success: false,
        message: 'Invalid delivery OTP'
      });
    }

    // Update booking status
    await booking.updateStatus(status, location, note);

    // Update driver availability if booking is completed or cancelled
    if (['delivered', 'cancelled'].includes(status) && booking.driverId) {
      const driver = await Driver.findById(booking.driverId);
      if (driver) {
        driver.availability.isAvailable = true;
        
        // Update driver stats
        if (status === 'delivered') {
          driver.stats.completedDeliveries += 1;
          driver.earnings.today += booking.fare.totalFare;
          driver.earnings.total += booking.fare.totalFare;
        } else if (status === 'cancelled') {
          driver.stats.cancelledDeliveries += 1;
        }
        
        await driver.save();
      }
    }

    // Send notifications
    await sendNotification({
      type: 'status_update',
      userId: booking.customerId,
      bookingId: booking._id,
      message: `Your booking ${booking.bookingId} is now ${status}`
    });

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during status update'
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking can be cancelled
    if (['delivered', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled'
      });
    }

    // Update booking
    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancellationReason = reason;
    await booking.save();

    // Free up driver if assigned
    if (booking.driverId) {
      const driver = await Driver.findById(booking.driverId);
      if (driver) {
        driver.availability.isAvailable = true;
        driver.stats.cancelledDeliveries += 1;
        await driver.save();
      }
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during booking cancellation'
    });
  }
};

// @desc    Rate booking
// @route   PUT /api/bookings/:id/rate
// @access  Private
exports.rateBooking = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Can only rate completed bookings'
      });
    }

    // Update booking rating
    if (req.user.id === booking.customerId.toString()) {
      booking.rating.customerRating = rating;
      booking.rating.customerFeedback = feedback;
    } else if (booking.driverId && req.user.id === booking.driverId.userId.toString()) {
      booking.rating.driverRating = rating;
      booking.rating.driverFeedback = feedback;
    }

    await booking.save();

    // Update driver rating if customer rated
    if (req.user.id === booking.customerId.toString() && booking.driverId) {
      const driver = await Driver.findById(booking.driverId);
      if (driver) {
        await driver.updateRating(rating);
      }
    }

    res.json({
      success: true,
      message: 'Rating submitted successfully',
      booking
    });
  } catch (error) {
    console.error('Rate booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during rating submission'
    });
  }
};