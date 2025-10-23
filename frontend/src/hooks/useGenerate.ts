import { useState, useRef } from 'react';
import api from '../services/api';
export function useGenerate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);
    const ctrlRef = useRef<AbortController | null>(null);
    const attemptsRef = useRef(0);

    async function generate(formData: FormData) {
        setLoading(true); setError(null); setResult(null);
        attemptsRef.current = 0;
        return tryRequest(formData);
    }

    async function tryRequest(formData: FormData) {
        attemptsRef.current += 1;
        const controller = new AbortController();
        ctrlRef.current = controller;
        try {
            const res = await api.post('/generations', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                signal: controller.signal
            } as any);
            setResult(res.data);
            setLoading(false);
            return res.data;
        } catch (err: any) {
            if (err.name === 'CanceledError' || err.name === 'AbortError') {
                setError('Request aborted'); setLoading(false); throw err;
            }
            if (err.response?.status === 503) {
                if (attemptsRef.current < 3) {
                    await new Promise(r => setTimeout(r, 500 * Math.pow(2, attemptsRef.current)));
                    return tryRequest(formData);
                } else {
                    setError('Model overloaded (tried 3 times)'); setLoading(false); throw err;
                }
            }
            setError(err.message || 'Network error'); setLoading(false); throw err;
        }
    }

    function abort() { ctrlRef.current?.abort(); ctrlRef.current = null; setLoading(false); }

    return { loading, error, result, generate, abort };
}
