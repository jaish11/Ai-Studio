import express from 'express';
import { upload } from '../middleware/upload.js';
import { createGeneration, listGenerations } from '../controllers/generationsController.js';
import { authenticate } from '../services/jwtService.js';
const router = express.Router();
router.post('/', authenticate, upload.single('image'), createGeneration);
router.get('/', authenticate, listGenerations);
export default router;
//# sourceMappingURL=generations.js.map