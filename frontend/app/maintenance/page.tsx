'use client';

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Maintenance } from "../../lib/types";
import { formatCurrency, formatStatus } from "../../lib/format";
import { LayoutShell } from "../../components/LayoutShell";
import { MaintenanceModal } from "../../components/MaintenanceModal";

export default function MaintenancePage() {
    const [items, setItems] = useState<Maintenance[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const load = async () => {
        try {
            const resp = await api.get("/maintenance");
            setItems(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <LayoutShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-semibold text-slate-900">Maintenance</div>
                        <p className="text-slate-500 text-sm">Track repairs and scheduled service.</p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm shadow-sm hover:bg-brand-700 transition-colors"
                    >
                        Log Maintenance
                    </button>
                </div>

                <MaintenanceModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={load}
                />

                <div className="card bg-white shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                            No maintenance records found.
                                        </td>
                                    </tr>
                                )}
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                                        <td className="px-6 py-4 text-slate-500">{item.description || "-"}</td>
                                        <td className="px-6 py-4 text-slate-500">{new Date(item.scheduled_date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-slate-100 text-slate-800'
                                                }`}>
                                                {formatStatus(item.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(item.cost)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutShell>
    );
}
