import Hotel from '../models/Hotel.js';
import { generateQRCode } from '../utils/qrcode.js';

// Create a new hotel
export const createHotel = async (req, res) => {
  try {
    const { name, address, logo } = req.body;

    const hotel = new Hotel({
      name,
      address,
      logo,
      qrCodeURL: generateQRCode(name),  // Generate QR code for the hotel
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update hotel details
export const updateHotel = async (req, res) => {
  try {
    const { name, address, logo } = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { name, address, logo },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a hotel
export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
