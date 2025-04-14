import express from 'express';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Placeholder route for getting recipes
router.get('/', auth, (req, res) => {
  res.json({ message: 'Recipe endpoint - to be implemented' });
});

export const recipeRoutes = router; 