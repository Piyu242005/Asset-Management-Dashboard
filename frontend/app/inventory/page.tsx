'use client';

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Inventory } from "../../lib/types";
import { formatCurrency } from "../../lib/format";
import { LayoutShell } from "../../components/LayoutShell";
import { InventoryModal } from "../../components/InventoryModal";

export default function InventoryPage() {
    const [items, setItems] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const load = async () => {
        try {
            const resp = await api.get("/inventory");
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
                        <div className="text-2xl font-semibold text-slate-900">Inventory</div>
                        <p className="text-slate-500 text-sm">Manage stock levels and supplies.</p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm shadow-sm hover:bg-brand-700 transition-colors"
                    >
                        Add Item
                    </button>
                </div>

                <InventoryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={load}
                />

                <div className="card bg-white shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Item Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4">Unit</th>
                                    <th className="px-6 py-4 text-right">Unit Price</th>
                                    <th className="px-6 py-4 text-right">Total Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                            No inventory items found.
                                        </td>
                                    </tr>
                                )}
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.item_name}</td>
                                        <td className="px-6 py-4 text-slate-500">{item.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`font-semibold ${item.quantity <= item.low_stock_threshold ? 'text-rose-600' : 'text-slate-900'}`}>
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                                        <td className="px-6 py-4 text-right text-slate-500">{formatCurrency(item.unit_price)}</td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(item.quantity * item.unit_price)}</td>
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
