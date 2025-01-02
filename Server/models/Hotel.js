import mongoose from 'mongoose';
import { type } from 'os';

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    qrCodeURL: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now,  // Automatically set the update date
    },
    image:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,  // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Optionally create an index for faster searches on the 'name' field
HotelSchema.index({ name: 1 });

// Create the Hotel model using the schema
const Hotel = mongoose.model('Hotel', HotelSchema);

export default Hotel;
