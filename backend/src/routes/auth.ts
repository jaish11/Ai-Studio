import { Router } from 'express';
import app from '../app.js';
import { signup, login } from '../controllers/authController.js';
const router = Router();
router.post('/signup', signup);
router.post('/login', login);
export default router;
