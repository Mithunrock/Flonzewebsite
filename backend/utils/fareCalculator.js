// Fare calculation utility

// Vehicle rates per km
const VEHICLE_RATES = {
  bike: 8,
  auto: 12,
  mini: 15,
  sedan: 18,
  truck: 25
};

// Additional charges
const ADDITIONAL_CHARGES = {
  weightCharge: 2, // per kg above 5kg
  nightCharge: 20, // 10 PM to 6 AM
  holidayCharge: 0.15, // 15% surcharge
  minimumFare: 50
};

/**
 * Calculate fare based on distance, weight, and vehicle type
 * @param {number} distance - Distance in kilometers
 * @param {number} weight - Package weight in kg
 * @param {string} vehicleType - Type of vehicle
 * @param {object} options - Additional options (isNight, isHoliday, etc.)
 * @returns {object} Fare breakdown
 */
exports.calculateFare = (distance, weight, vehicleType, options = {}) => {
  try {
    const { isNight = false, isHoliday = false } = options;
    
    // Base fare calculation
    const ratePerKm = VEHICLE_RATES[vehicleType] || VEHICLE_RATES.bike;
    const baseFare = Math.max(ratePerKm * distance, ADDITIONAL_CHARGES.minimumFare);
    
    // Distance fare
    const distanceFare = ratePerKm * distance;
    
    // Weight charge (for packages above 5kg)
    const weightCharge = weight > 5 ? (weight - 5) * ADDITIONAL_CHARGES.weightCharge : 0;
    
    // Night charge
    const nightCharge = isNight ? ADDITIONAL_CHARGES.nightCharge : 0;
    
    // Holiday surcharge
    const holidayCharge = isHoliday ? baseFare * ADDITIONAL_CHARGES.holidayCharge : 0;
    
    // Calculate total
    const subtotal = baseFare + weightCharge + nightCharge + holidayCharge;
    const totalFare = Math.ceil(subtotal);
    
    return {
      baseFare: Math.ceil(baseFare),
      distanceFare: Math.ceil(distanceFare),
      weightCharge: Math.ceil(weightCharge),
      nightCharge: Math.ceil(nightCharge),
      holidayCharge: Math.ceil(holidayCharge),
      additionalCharges: Math.ceil(weightCharge + nightCharge + holidayCharge),
      discount: 0,
      totalFare
    };
  } catch (error) {
    console.error('Fare calculation error:', error);
    throw new Error('Failed to calculate fare');
  }
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
exports.calculateDistance = async (lat1, lon1, lat2, lon2) => {
  try {
    // If Google Maps API is available, use it for more accurate distance
    if (process.env.GOOGLE_MAPS_API_KEY) {
      // In production, you would make an API call to Google Maps Distance Matrix API
      // For now, using Haversine formula as fallback
    }
    
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  } catch (error) {
    console.error('Distance calculation error:', error);
    throw new Error('Failed to calculate distance');
  }
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

/**
 * Get estimated delivery time based on distance and vehicle type
 * @param {number} distance - Distance in kilometers
 * @param {string} vehicleType - Type of vehicle
 * @returns {number} Estimated time in minutes
 */
exports.getEstimatedTime = (distance, vehicleType) => {
  const speeds = {
    bike: 25,    // km/h in city traffic
    auto: 20,    // km/h in city traffic
    mini: 18,    // km/h in city traffic
    sedan: 22,   // km/h in city traffic
    truck: 15    // km/h in city traffic
  };
  
  const speed = speeds[vehicleType] || speeds.bike;
  const timeInHours = distance / speed;
  const timeInMinutes = Math.ceil(timeInHours * 60);
  
  // Add buffer time for pickup and traffic
  return timeInMinutes + 15;
};

/**
 * Apply discount to fare
 * @param {object} fareDetails - Original fare details
 * @param {number} discountPercent - Discount percentage
 * @param {number} maxDiscount - Maximum discount amount
 * @returns {object} Updated fare details
 */
exports.applyDiscount = (fareDetails, discountPercent, maxDiscount = null) => {
  const discountAmount = Math.min(
    fareDetails.totalFare * (discountPercent / 100),
    maxDiscount || fareDetails.totalFare
  );
  
  return {
    ...fareDetails,
    discount: Math.ceil(discountAmount),
    totalFare: fareDetails.totalFare - Math.ceil(discountAmount)
  };
};