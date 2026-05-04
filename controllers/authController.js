import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');
const publicKey = process.env.PUBLIC_KEY?.replace(/\\n/g, '\n');

if (!privateKey || !publicKey) {
  throw new Error("JWT keys are missing. Set PRIVATE_KEY and PUBLIC_KEY in environment variables.");
}

function createTokens(user) {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    privateKey,
    { algorithm: 'RS256', expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { sub: user.id },
    privateKey,
    { algorithm: 'RS256', expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash
  });

  const { accessToken, refreshToken } = createTokens(user);

  return res.status(201).json({
    success: true,
    user: formatUser(user),
    token: accessToken,
    refreshToken
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const { accessToken, refreshToken } = createTokens(user);

  return res.json({
    success: true,
    user: formatUser(user),
    token: accessToken,
    refreshToken
  });
};

export const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const { accessToken } = createTokens(user);

    return res.json({ success: true, token: accessToken });
  } catch (error) {
    return res.status(401).json({ error: 'Refresh token invalid or expired' });
  }
};

export const profile = async (req, res) => {
  return res.json({ success: true, user: req.user });
};