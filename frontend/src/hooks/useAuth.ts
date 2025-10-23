import { useState } from 'react';
import api from '../services/api';
export function useAuth() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    function save(t: string) { localStorage.setItem('token', t); setToken(t); }
    function logout() { localStorage.removeItem('token'); setToken(null); }
    async function login(email: string, password: string) {
        const res = await api.post('/auth/login', { email, password });
        save(res.data.token);
        return res.data;
    }
    async function signup(name: string, email: string, password: string) {
        const res = await api.post('/auth/signup', { name, email, password });
        save(res.data.token);
        return res.data;
    }
    return { token, login, signup, logout };
}
