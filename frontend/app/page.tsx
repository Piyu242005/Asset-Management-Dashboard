'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutShell } from "../components/LayoutShell";
import { BarChartCard } from "../components/BarChartCard";
import { MapWidget } from "../components/MapWidget";
import { StatsCard } from "../components/StatsCard";
import { Icons } from "../components/Icons";
import api from "../lib/api";
import { formatCurrency, formatStatus } from "../lib/format";
import { DashboardData, Asset } from "../lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [recent, setRecent] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    setLoading(true);
    try {
      const dashResp = await api.get("/dashboard");
      setData(dashResp.data);
      const assetsResp = await api.get("/assets", { params: { limit: 5, offset: 0 } });
      setRecent(assetsResp.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const summary = data?.summary;

  return (
    <LayoutShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Welcome Back!</div>
            <p className="text-slate-500 text-sm">Concise summary of your financial activities provided for clarity.</p>
          </div>
          <Link href="/assets/new" className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm shadow-sm">
            Add Asset
          </Link>
        </div>

        {/* Banner Image */}
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-sm">
          <img
            src="/banner.png"
            alt="Welcome Banner"
            className="w-full h-full object-cover"
          />
        </div>



        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Real Assets"
            value={formatCurrency(summary?.total_assets_value || 0)}
            subtitle="Tangible holdings"
            icon={<Icons.Asset />}
            color="blue"
          />
          <StatsCard
            title="Intangible Assets"
            value={formatCurrency((summary?.total_assets_value || 0) * 0.3)}
            subtitle="IP & Goodwill"
            icon={<Icons.Inventory />}
            color="purple"
          />
          <StatsCard
            title="Financial Assets"
            value={formatCurrency(summary?.total_assets_value || 0)}
            subtitle="Investments"
            icon={<Icons.Financial />}
            color="green"
          />
          <StatsCard
            title="Current Assets"
            value={formatCurrency(summary?.total_assets_value || 0)}
            subtitle="Liquid holdings"
            icon={<Icons.Users />}
            color="orange"
          />
        </div>

        {/* Total Assets Section */}
        <div className="card p-6 rounded-2xl bg-white shadow-sm border border-slate-100 mt-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-slate-800">Total Assets</h3>
            <div className="text-4xl font-bold text-slate-900">
              {formatCurrency(summary?.total_assets_value || 0)}
            </div>
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span className="bg-green-100 p-1 rounded-full text-xs">↗</span>
              12% than last month
            </div>

            {/* Simple colored bar visual */}
            <div className="flex h-3 w-full rounded-full overflow-hidden mt-4 bg-slate-100">
              <div className="bg-blue-600 w-[30%]" title="Real"></div>
              <div className="bg-green-500 w-[20%]" title="Financial"></div>
              <div className="bg-purple-500 w-[20%]" title="Intangible"></div>
              <div className="bg-orange-400 w-[20%]" title="Current"></div>
              <div className="bg-slate-300 w-[10%]" title="Other"></div>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-slate-500 flex-wrap">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Real Assets (30%)</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Financial (20%)</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Intangible (20%)</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Current (20%)</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-sm text-slate-500">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <BarChartCard data={data?.monthly || []} />
              </div>
              <MapWidget locations={data?.locations || []} />
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-slate-500">Recent Assets</div>
                  <div className="font-semibold">Latest additions and updates</div>
                </div>
                <Link href="/assets" className="text-sm text-brand-600">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {(recent || []).map((asset) => (
                  <div key={asset.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{asset.name}</div>
                      <div className="text-xs text-slate-500">
                        {asset.category} • {formatStatus(asset.type)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{formatCurrency(asset.value)}</div>
                      <div className="text-xs text-slate-500">{formatStatus(asset.status)}</div>
                    </div>
                  </div>
                ))}
                {!recent.length && (
                  <div className="py-3 text-sm text-slate-500">No assets yet. Add your first asset to get started.</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </LayoutShell>
  );
}

