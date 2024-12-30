import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
}, {
  timestamps: true,
});

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;
