import express from 'express';
import Hotel from '../models/Hotel.js';
import qrcode from 'qrcode';
import multer from 'multer';
import path from 'path';    
import fs from 'fs';       
import { upload } from '../Middleware/MulterMiddleware.js'; 

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use unique filename
  }
});

const uploadMiddleware = multer({ storage: storage });

// Add hotel with image and QR code
router.post('/add', uploadMiddleware.single('file'), async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Generate QR Code URL
    const qrCodeURL = await qrcode.toDataURL(`https://example.com/hotel/${name}`);

    // Handle image upload
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';  

    const newHotel = new Hotel({
      name,
      address,
      qrCodeURL,
      image: imageUrl,  // Store image URL
    });

    await newHotel.save();
    res.status(201).json(newHotel);  
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    console.error('Error fetching hotel:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
