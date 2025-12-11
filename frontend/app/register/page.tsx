'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import api from "../../lib/api";

export default function RegisterPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/auth/register", { email, full_name: fullName, password });
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to register");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-md space-y-6">
        <div>
          <div className="text-2xl font-semibold">Create account</div>
          <p className="text-slate-500 text-sm mt-1">Start managing assets with a few clicks.</p>
        </div>
        {error && <div className="text-sm text-rose-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Alex Smith"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-lg bg-brand-600 text-white font-semibold disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}


