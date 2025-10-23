import { z } from 'zod';
import { prisma } from '../db/prismaClient.js';
const bodySchema = z.object({
    prompt: z.string().min(1),
    style: z.string().min(1)
});
export async function createGeneration(req, res) {
    try {
        const userId = req.userId;
        const body = bodySchema.parse(req.body);
        // simulate delay (1-2s)
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));
        // simulate 20% overload
        if (Math.random() < 0.2)
            return res.status(503).json({ message: 'Model overloaded' });
        let imageUrl = null;
        // if (req.file) {
        //     imageUrl = `/uploads/${path.basename(req.file.path)}`;
        // }
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
    }
    catch (err) {
        if (err?.issues)
            return res.status(400).json({ message: 'Invalid input', issues: err.issues });
        res.status(500).json({ message: 'Server error' });
    }
}
export async function listGenerations(req, res) {
    try {
        const userId = req.userId;
        const list = await prisma.generation.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: Number(req.query.limit ?? 5)
        });
        res.json(list);
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
}
//# sourceMappingURL=generationsController.js.map