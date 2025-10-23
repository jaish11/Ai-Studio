import request from 'supertest';
import app from '../src/app.js'; // 👈 include .js extension
describe('Auth', () => {
    test('signup & login', async () => {
        const email = `user${Date.now()}@test.com`;
        const signup = await request(app)
            .post('/auth/signup')
            .send({ name: 'test', email, password: '123456' });
        expect(signup.status).toBe(200);
    });
});
//# sourceMappingURL=auth.test.js.map