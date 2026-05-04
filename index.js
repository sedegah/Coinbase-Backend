import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import cryptoRoutes from './routes/crypto.js';

dotenv.config();

console.log("ENV CHECK");
console.log("PRIVATE_KEY:", !!process.env.PRIVATE_KEY);
console.log("PUBLIC_KEY:", !!process.env.PUBLIC_KEY);
console.log("MONGODB_URI:", !!process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 4000;
let CLIENT_ORIGIN = 'https://sedegah22237205.netlify.app';
if (process.env.CLIENT_ORIGIN) {
  try {
    CLIENT_ORIGIN = new URL(process.env.CLIENT_ORIGIN).origin;
  } catch (err) {
    console.warn("Invalid CLIENT_ORIGIN URL, using default:", process.env.CLIENT_ORIGIN);
  }
}
console.log("CLIENT_ORIGIN:", CLIENT_ORIGIN);

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

try {
  app.use('/api/auth', authRoutes);
  app.use('/api/crypto', cryptoRoutes);
} catch (err) {
  console.error("Route setup error:", err);
  process.exit(1);
}

app.get('/', (req, res) => {
  res.json({ success: true, message: '22237205 Coinbase Clone backend is running' });
});

const start = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

start();