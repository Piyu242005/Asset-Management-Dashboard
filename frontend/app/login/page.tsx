'use client';

import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid credentials. Try piyu.143247@gmail.com / Piyu24");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8 bg-white shadow-lg rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-xs text-center text-slate-400 mt-4">
            Default: admin@example.com / admin123
          </div>
        </form>
      </div>
    </div>
  );
}
