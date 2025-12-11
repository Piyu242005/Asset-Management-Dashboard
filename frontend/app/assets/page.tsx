'use client';

import { useEffect, useState } from "react";
import { LayoutShell } from "../../components/LayoutShell";
import { AssetTable } from "../../components/AssetTable";
import api from "../../lib/api";
import { Asset } from "../../lib/types";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAssets = async () => {
    setError(null);
    setLoading(true);
    try {
      const resp = await api.get("/assets");
      setAssets(resp.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this asset?");
    if (!confirmed) return;
    try {
      await api.delete(`/assets/${id}`);
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to delete asset");
    }
  };

  return (
    <LayoutShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Assets</div>
            <p className="text-slate-500 text-sm">Track your inventory, locations, and status.</p>
          </div>
          <div className="text-sm text-slate-500">{assets.length} total</div>
        </div>
        {error && <div className="text-sm text-rose-600">{error}</div>}
        {loading ? (
          <div className="text-sm text-slate-500">Loading assets...</div>
        ) : (
          <AssetTable assets={assets} onDelete={handleDelete} />
        )}
      </div>
    </LayoutShell>
  );
}
