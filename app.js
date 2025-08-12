const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/flonze_logistics', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  addresses: [{ name: String, address: String, lat: Number, lng: Number }],
  role: { type: String, default: 'customer' }
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: { address: String, lat: Number, lng: Number },
  dropLocation: { address: String, lat: Number, lng: Number },
  packageDetails: { weight: Number, size: String, type: String },
  vehicleType: String,
  fare: Number,
  status: { type: String, default: 'pending' },
  driverId: String,
  trackingId: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, 'flonze_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'flonze_secret');
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/booking', auth, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.user.userId,
      trackingId: 'FL' + Date.now()
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/booking/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/calculate-fare', (req, res) => {
  const { distance, vehicleType, weight } = req.body;
  const rates = {
    bike: 8,
    auto: 12,
    mini: 15,
    sedan: 18
  };
  const baseFare = rates[vehicleType] * distance;
  const weightCharge = weight > 5 ? (weight - 5) * 2 : 0;
  const totalFare = Math.ceil(baseFare + weightCharge);
  res.json({ fare: totalFare });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));