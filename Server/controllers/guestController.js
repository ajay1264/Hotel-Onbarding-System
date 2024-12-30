import Guest from '../models/Guest.js';

// Get all guests
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().populate('hotel');  // Assuming each guest has a reference to the hotel
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching guests' });
  }
};

// Create a new guest
export const createGuest = async (req, res) => {
  const { fullName, mobile, email, purpose, hotelId } = req.body;
  try {
    const newGuest = new Guest({
      fullName,
      mobile,
      email,
      purpose,
      hotel: hotelId,
    });
    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    res.status(500).json({ message: 'Error creating guest' });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  const guestId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(guestId, updatedData, { new: true });
    res.json(updatedGuest);
  } catch (err) {
    res.status(500).json({ message: 'Error updating guest' });
  }
};
