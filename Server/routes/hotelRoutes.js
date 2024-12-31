import express from 'express';
import Hotel from '../models/Hotel.js';
import qrcode from 'qrcode';

const router = express.Router();

// Create a new hotel
router.post('/add', async (req, res) => {
  const { name, address } = req.body;  // Assuming you're sending 'name' and 'address' in the request body

  // Check if fields are missing
  if (!name || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Generate QR code URL
    const qrCodeURL = await qrcode.toDataURL(`https://example.com/hotel/${name}`);

    // Create a new hotel instance
    const newHotel = new Hotel({
      name,
      address,
      qrCodeURL,
    });

    // Save the hotel to the database
    await newHotel.save();
    res.status(201).json(newHotel);  // Respond with the saved hotel data
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();  // Fetch all hotels from the database
    res.json(hotels);  // Return the list of hotels
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Get hotel ID from request params

  try {
    const hotel = await Hotel.findById(id);  // Fetch hotel by ID from the database
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);  // Return the hotel data
  } catch (err) {
    console.error('Error fetching hotel:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
