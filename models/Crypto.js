import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  symbol: { type: String, required: true, trim: true, uppercase: true },
  price: { type: Number, required: true },
  image: { type: String, trim: true, default: '' },
  change24h: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;
