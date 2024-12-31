import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import hotelRoutes from './routes/hotelRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
// import { getGuests, createGuest, updateGuest } from './controllers/guestController.js';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Use import.meta.url to get the current directory (works in ES Modules)
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Serve the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware setup
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);  
  });

// Routes setup
app.use('/api/hotels', hotelRoutes);
app.use('/api/guests', guestRoutes);
// app.get('/api/guests', getGuests);
// app.post('/api/guests', createGuest);
// app.put('/api/guests/:id', updateGuest);

// Port setup
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
