'use client';

import Link from "next/link";
import { Asset } from "../lib/types";
import { formatCurrency, formatStatus } from "../lib/format";

type Props = {
  assets: Asset[];
  onDelete?: (id: number) => Promise<void> | void;
};

export function AssetTable({ assets, onDelete }: Props) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Assets</div>
        <Link href="/assets/new" className="px-3 py-2 rounded-lg bg-brand-500 text-white text-sm">
          Add Asset
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4 text-right">Value</th>
              <th className="py-2 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="py-2 pr-4">{asset.name}</td>
                <td className="py-2 pr-4">{asset.category}</td>
                <td className="py-2 pr-4">{formatStatus(asset.type)}</td>
                <td className="py-2 pr-4">
                  <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs">
                    {formatStatus(asset.status)}
                  </span>
                </td>
                <td className="py-2 pr-4 text-right">{formatCurrency(asset.value)}</td>
                <td className="py-2 pr-4 text-right space-x-2">
                  <Link href={`/assets/${asset.id}`} className="text-brand-600 text-sm">
                    Edit
                  </Link>
                  {onDelete && (
                    <button onClick={() => onDelete(asset.id)} className="text-rose-600 text-sm">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

