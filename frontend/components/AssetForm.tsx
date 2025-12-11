'use client';

import { useState } from "react";
import { Asset } from "../lib/types";
import { useRouter } from "next/navigation";
import api from "../lib/api";

type Props = {
  initial?: Partial<Asset>;
  onSaved?: (asset: Asset) => void;
};

const typeOptions = [
  { value: "financial", label: "Financial" },
  { value: "tangible", label: "Tangible" },
  { value: "intangible", label: "Intangible" },
];

export function AssetForm({ initial, onSaved }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name || "",
    category: initial?.category || "",
    type: initial?.type || "financial",
    value: initial?.value?.toString() || "",
    status: initial?.status || "active",
    location_id: initial?.location_id || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...form,
        value: parseFloat(form.value || "0"),
        location_id: form.location_id ? Number(form.location_id) : null,
      };
      const resp = initial?.id
        ? await api.put(`/assets/${initial.id}`, payload)
        : await api.post("/assets", payload);
      onSaved?.(resp.data);
      router.push("/assets");
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Failed to save asset";
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card p-6 space-y-4 max-w-2xl">
      <div className="space-y-1">
        <label className="text-sm text-slate-600">Name</label>
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Category</label>
          <input
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Value</label>
          <input
            name="value"
            type="number"
            step="0.01"
            required
            value={form.value}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-600">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="retired">Retired</option>
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm text-slate-600">Location ID (optional)</label>
        <input
          name="location_id"
          value={form.location_id ?? ""}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      {error && <div className="text-sm text-rose-600">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-brand-600 text-white disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Asset"}
      </button>
    </form>
  );
}

