import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    await Note.syncIndexes();
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.log('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
