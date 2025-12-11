'use client';

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Financial } from "../../lib/types";
import { formatCurrency } from "../../lib/format";
import { LayoutShell } from "../../components/LayoutShell";
import { FinancialModal } from "../../components/FinancialModal";

export default function FinancialPage() {
    const [items, setItems] = useState<Financial[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"income" | "expense">("expense");

    const load = async () => {
        try {
            const resp = await api.get("/financial");
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

    const openModal = (type: "income" | "expense") => {
        setModalType(type);
        setModalOpen(true);
    };

    return (
        <LayoutShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-semibold text-slate-900">Financial Management</div>
                        <p className="text-slate-500 text-sm">Track income and expenses.</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => openModal("expense")}
                            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm shadow-sm hover:bg-slate-50"
                        >
                            Record Expense
                        </button>
                        <button
                            onClick={() => openModal("income")}
                            className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm shadow-sm hover:bg-brand-700"
                        >
                            Record Income
                        </button>
                    </div>
                </div>

                <FinancialModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={load}
                    defaultType={modalType}
                />

                <div className="card bg-white shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                            No financial records found.
                                        </td>
                                    </tr>
                                )}
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-500">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                                        <td className="px-6 py-4 text-slate-500">{item.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'
                                                }`}>
                                                {item.type === 'income' ? 'Income' : 'Expense'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-medium ${item.type === 'income' ? 'text-green-600' : 'text-slate-900'
                                            }`}>
                                            {item.type === 'expense' ? '-' : '+'}{formatCurrency(item.amount)}
                                        </td>
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
