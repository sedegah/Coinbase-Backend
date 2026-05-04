import Crypto from '../models/Crypto.js';

export const getAllCryptos = async (req, res) => {
  const cryptos = await Crypto.find().sort({ symbol: 1 });
  return res.json({ success: true, cryptos });
};

export const getGainers = async (req, res) => {
  const cryptos = await Crypto.find().sort({ change24h: -1 }).limit(50);
  return res.json({ success: true, cryptos });
};

export const getNewCryptos = async (req, res) => {
  const cryptos = await Crypto.find().sort({ createdAt: -1 }).limit(50);
  return res.json({ success: true, cryptos });
};

export const createCrypto = async (req, res) => {
  const { name, symbol, price, image, change24h } = req.body;
  if (!name || !symbol || price === undefined || change24h === undefined) {
    return res.status(400).json({ error: 'Name, symbol, price, and change24h are required' });
  }

  const crypto = await Crypto.create({
    name,
    symbol,
    price,
    image: image || '',
    change24h
  });

  return res.status(201).json({ success: true, crypto });
};
