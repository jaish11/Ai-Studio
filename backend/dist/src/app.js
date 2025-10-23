import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.js';
import genRoutes from './routes/generations.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/auth', authRoutes);
app.use('/generations', genRoutes);
export default app;
//# sourceMappingURL=app.js.map