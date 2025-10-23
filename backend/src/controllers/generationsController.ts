import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db/prismaClient.js';
import path from 'path';
import app from '../app.js';

const bodySchema = z.object({
    prompt: z.string().min(1),
    style: z.string().min(1)
});

export async function createGeneration(req: any, res: any) {
    try {
        const userId = (req as any).userId;
        const body = bodySchema.parse(req.body);
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
        if (Math.random() < 0.2) return res.status(503).json({ message: 'Model overloaded' });
        let imageUrl: string | null = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const gen = await prisma.generation.create({
            data: { prompt: body.prompt, style: body.style, imageUrl, userId }
        });
        res.json({
            id: gen.id,
            imageUrl: gen.imageUrl,
            prompt: gen.prompt,
            style: gen.style,
            createdAt: gen.createdAt,
            status: 'succeeded'
        });
    } catch (err: any) {
        if (err?.issues) return res.status(400).json({ message: 'Invalid input', issues: err.issues });
        res.status(500).json({ message: 'Server error' });
    }
}

export async function listGenerations(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const list = await prisma.generation.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: Number(req.query.limit ?? 5)
        });
        res.json(list);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}
