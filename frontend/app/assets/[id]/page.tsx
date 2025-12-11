'use client';

import { useEffect, useState } from "react";
import { LayoutShell } from "../../../components/LayoutShell";
import { AssetForm } from "../../../components/AssetForm";
import api from "../../../lib/api";
import { Asset } from "../../../lib/types";

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const assetId = Number(params.id);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!assetId) {
        setError("Invalid asset id");
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(true);
      try {
        const resp = await api.get(`/assets/${assetId}`);
        setAsset(resp.data);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to load asset");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [assetId]);

  return (
    <LayoutShell>
      <div className="space-y-4">
        <div>
          <div className="text-2xl font-semibold">Edit Asset</div>
          <p className="text-slate-500 text-sm">Update asset details and status.</p>
        </div>
        {error && <div className="text-sm text-rose-600">{error}</div>}
        {loading ? (
          <div className="text-sm text-slate-500">Loading asset...</div>
        ) : (
          asset && <AssetForm initial={asset} onSaved={setAsset} />
        )}
      </div>
    </LayoutShell>
  );
}



