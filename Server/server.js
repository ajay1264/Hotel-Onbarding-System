import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import { fileURLToPath } from 'url';


// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express app
const app = express();


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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/guests', guestRoutes);


// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// Port setup
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
