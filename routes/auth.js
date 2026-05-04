import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { login, register, refreshToken, profile } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.get('/profile', authMiddleware, profile);

export default router;
