import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/db/prismaClient.js';
afterAll(async () => { await prisma.$disconnect(); });
describe('Auth', () => {
    test('signup & login', async () => {
        const email = `u${Date.now()}@test.com`;
        const s = await request(app).post('/auth/signup').send({ name: 'a', email, password: 'secret1' });
        expect(s.status).toBe(200);
        const l = await request(app).post('/auth/login').send({ email, password: 'secret1' });
        expect(l.status).toBe(200);
        expect(l.body.token).toBeDefined();
    });
});
//# sourceMappingURL=auth.test.js.map