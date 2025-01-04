import express from 'express';
import { signup, login } from '../controllers/userController.js';
import authenticateJWT from '../Middleware/authenticateJWT.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

// Protected route that requires authentication
router.get('/main-admin-panel', authenticateJWT, (req, res) => {
  // Only accessible if token is valid
  res.status(200).json({ message: 'Welcome to the Main Admin Panel!' });
});

export default router;
