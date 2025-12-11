'use client';

import { LayoutShell } from "../../../components/LayoutShell";
import { AssetForm } from "../../../components/AssetForm";

export default function NewAssetPage() {
  return (
    <LayoutShell>
      <div className="space-y-4">
        <div>
          <div className="text-2xl font-semibold">Add Asset</div>
          <p className="text-slate-500 text-sm">Create a new asset record for your portfolio.</p>
        </div>
        <AssetForm />
      </div>
    </LayoutShell>
  );
}



