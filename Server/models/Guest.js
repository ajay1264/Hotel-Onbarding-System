import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: ['Business', 'Personal', 'Tourist'],
    },
    stayFrom: {
      type: Date,
      required: true,
    },
    stayTo: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    idProof: {
      type: String,
      required: true,
      trim: true,
    },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, 
  },
  {
    timestamps: true, 
  }
);

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;
