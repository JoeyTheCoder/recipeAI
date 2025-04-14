import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

// Generate JWT token
const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '30d' });
};

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id.toString());
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user._id.toString());
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      preferences: user.preferences,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    
    await user.save();
    
    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

// Update user preferences
export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const { dietaryRestrictions, dislikedIngredients, favoriteIngredients, cuisinePreferences } = req.body;
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Initialize preferences object if it doesn't exist
    if (!user.preferences) {
      user.preferences = {};
    }
    
    // Update preferences
    if (dietaryRestrictions) user.preferences.dietaryRestrictions = dietaryRestrictions;
    if (dislikedIngredients) user.preferences.dislikedIngredients = dislikedIngredients;
    if (favoriteIngredients) user.preferences.favoriteIngredients = favoriteIngredients;
    if (cuisinePreferences) user.preferences.cuisinePreferences = cuisinePreferences;
    
    await user.save();
    
    res.json({
      id: user._id,
      preferences: user.preferences,
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error while updating preferences' });
  }
}; 