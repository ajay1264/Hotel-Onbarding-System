import Hotel from '../models/Hotel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Create a new hotel
export const createHotel = async (req, res) => {
  try {
    const { name, address } = req.body;

    // Check if logo is uploaded
    const logoLocalPath = req.files?.logo ? req.files.logo[0]?.path : null;
    if (!logoLocalPath) {
      return res.status(400).json({ message: 'Logo is required' });
    }

    // Upload logo to Cloudinary
    const logo = await uploadOnCloudinary(logoLocalPath);
    if (!logo) {
      return res.status(500).json({ message: 'Error uploading logo' });
    }

    // Create a new hotel with the QR code and uploaded logo
    const hotel = new Hotel({
      name,
      address,
      qrCodeURL: req.body.qrCodeURL, // Assuming QR code is provided
      logo: logo.url, // Save the Cloudinary URL of the logo
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
    const { name, address } = req.body;

    // Update the hotel
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { name, address },
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
