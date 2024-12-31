import express from 'express';
import { getGuests, createGuest, updateGuest } from '../controllers/guestController.js'; // Import the controller functions

const router = express.Router();

// Route to get all guests
router.get('/', getGuests);

// Route to create a new guest
router.post('/', createGuest);

// Route to update an existing guest by ID
router.put('/:id', updateGuest);

export default router;





























// import express from 'express';
// import Guest from '../models/Guest.js';

// const router = express.Router();

// // Create a new guest
// router.post('/register', async (req, res) => { // Updated route from '/add' to '/register'
//   const {
//     fullName,
//     mobile,
//     email,
//     address,
//     purpose,
//     stayFrom,
//     stayTo,
//     idProof,
//     hotelId,  // Assuming 'hotelId' is the field in the model
//   } = req.body;

//   try {
//     const newGuest = new Guest({
//       fullName,
//       mobile,
//       email,
//       address,
//       purpose,
//       stayFrom,  
//       stayTo,
//       idProof,
//       hotel: hotelId,  // Assuming 'hotel' is the field in the model
//     });

//     await newGuest.save();
//     res.status(201).json(newGuest);  // Return the newly created guest object
//   } catch (err) {
//     console.error('Error creating guest:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all guests
// router.get('/', async (req, res) => {
//   try {
//     const guests = await Guest.find().populate('hotel');  // Populating 'hotel' field
//     res.json(guests);
//   } catch (err) {
//     console.error('Error fetching guests:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get guests by hotel ID
// router.get('/hotel/:hotelId', async (req, res) => {
//   const { hotelId } = req.params;

//   try {
//     const guests = await Guest.find({ hotel: hotelId }).populate('hotel');  // Using 'hotel' field in the query
//     res.json(guests);
//   } catch (err) {
//     console.error('Error fetching guests by hotel:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;
