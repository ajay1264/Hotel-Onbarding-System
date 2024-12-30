import express from 'express';
import Guest from '../models/Guest.js';

const router = express.Router();

// Create a new guest
router.post('/add', async (req, res) => {
  const { name, email, hotelId } = req.body;

  try {
    const newGuest = new Guest({
      name,
      email,
      hotelId,
    });

    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all guests
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find().populate('hotelId');
    res.json(guests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get guests by hotel ID
router.get('/hotel/:hotelId', async (req, res) => {
  const { hotelId } = req.params;

  try {
    const guests = await Guest.find({ hotelId }).populate('hotelId');
    res.json(guests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
