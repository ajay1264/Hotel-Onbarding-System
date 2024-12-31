import Guest from '../models/Guest.js';
import Hotel from '../models/Hotel.js'; // Assuming you have a Hotel model to validate hotelId

// Get all guests
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find().populate('hotel');  // Assuming each guest has a reference to the hotel
    res.status(200).json(guests);  // Returning status code 200 for successful request
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching guests' });
  }
};

// Create a new guest
export const createGuest = async (req, res) => {
  const { fullName, mobile, email, purpose, hotelId, stayFrom, stayTo, address, idProof } = req.body;
  
  // Validating required fields
  if (!fullName || !mobile || !email || !hotelId || !purpose) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Validate if hotelId exists in the Hotel collection
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const newGuest = new Guest({
      fullName,
      mobile,
      email,
      purpose,
      hotel: hotelId,  // Assuming 'hotel' is the field in the model
      stayFrom,
      stayTo,
      address,
      idProof,
    });

    await newGuest.save();
    res.status(201).json(newGuest);  // Successfully created, return the new guest with status 201
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error creating guest' });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  const guestId = req.params.id;
  const updatedData = req.body;

  // Validate if the guest exists
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(guestId, updatedData, { new: true });

    if (!updatedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.status(200).json(updatedGuest);  // Successfully updated, return the updated guest
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error updating guest' });
  }
};





















// import Guest from '../models/Guest.js';

// // Get all guests
// export const getGuests = async (req, res) => {
//   try {
//     const guests = await Guest.find().populate('hotel');  // Assuming each guest has a reference to the hotel
//     res.status(200).json(guests);  // Returning status code 200 for successful request
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: 'Error fetching guests' });
//   }
// };

// // Create a new guest
// export const createGuest = async (req, res) => {
//   const { fullName, mobile, email, purpose, hotelId, stayFrom, stayTo, address, idProof } = req.body;
  
//   // Validating required fields
//   if (!fullName || !mobile || !email || !hotelId || !purpose) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newGuest = new Guest({
//       fullName,
//       mobile,
//       email,
//       purpose,
//       hotel: hotelId,
//       stayFrom,
//       stayTo,
//       address,
//       idProof,
//     });

//     await newGuest.save();
//     res.status(201).json(newGuest);  // Successfully created, return the new guest with status 201
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: 'Error creating guest' });
//   }
// };

// // Update a guest
// export const updateGuest = async (req, res) => {
//   const guestId = req.params.id;
//   const updatedData = req.body;

//   // Validate if the guest exists
//   try {
//     const updatedGuest = await Guest.findByIdAndUpdate(guestId, updatedData, { new: true });

//     if (!updatedGuest) {
//       return res.status(404).json({ message: 'Guest not found' });
//     }

//     res.status(200).json(updatedGuest);  // Successfully updated, return the updated guest
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: 'Error updating guest' });
//   }
// };
