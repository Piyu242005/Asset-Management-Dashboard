'use client';

import { LayoutShell } from "../../components/LayoutShell";

export default function ReportsPage() {
    return (
        <LayoutShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-semibold text-slate-900">Reports</div>
                        <p className="text-slate-500 text-sm">Generate and view system reports.</p>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    {['Financial Summary', 'Asset Depreciation', 'Inventory Turnover', 'Maintenance Logs', 'User Activity'].map((report, i) => (
                        <div key={i} onClick={() => window.print()} className="card p-6 bg-white shadow-sm border border-slate-100 rounded-2xl hover:shadow-md transition-all cursor-pointer group">
                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{report}</h3>
                            <p className="text-sm text-slate-500 mt-1">Click to generate PDF report.</p>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutShell>
    );
}
