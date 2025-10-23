import  { useState } from "react";
import { useAuth } from "../hooks/useAuth";
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  async function onSubmit(e: any) {
    e.preventDefault();
    await login(email, pw);
    window.location.href = "/studio";
  }
  return (
    <form onSubmit={onSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold">Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full mt-2"
      />
      <input
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="Password"
        type="password"
        className="border p-2 w-full mt-2"
      />
      <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded">
        Login
      </button>
    </form>
  );
}
