import express from 'express';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Placeholder route for getting products
router.get('/', auth, (req, res) => {
  res.json({ message: 'Product endpoint - to be implemented' });
});

export const productRoutes = router; 