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
      default: Date.now,  
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    image:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,  
  }
);

HotelSchema.index({ name: 1 });


const Hotel = mongoose.model('Hotel', HotelSchema);

export default Hotel;
