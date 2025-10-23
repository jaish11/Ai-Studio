import { Request, Response } from 'express';
import app from '../app.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../db/prismaClient.js';
import { signToken } from '../services/jwtService.js';

const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
});

export async function signup(req: Request, res: Response) {
    try {
        const data = signupSchema.parse(req.body);
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) return res.status(400).json({ message: 'Email already registered' });
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: { name: data.name, email: data.email, password: hashed }
        });
        const token = signToken({ userId: user.id });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err: any) {
        if (err?.issues) return res.status(400).json({ message: 'Invalid input', issues: err.issues });
        res.status(500).json({ message: 'Server error' });
    }
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export async function login(req: Request, res: Response) {
    try {
        const data = loginSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await bcrypt.compare(data.password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        const token = signToken({ userId: user.id });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err: any) {
        if (err?.issues) return res.status(400).json({ message: 'Invalid input', issues: err.issues });
        res.status(500).json({ message: 'Server error' });
    }
}
