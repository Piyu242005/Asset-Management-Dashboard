'use client';

import { useState } from "react";
import { Modal } from "./Modal";
import api from "../lib/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
};

export function InventoryModal({ isOpen, onClose, onSaved }: Props) {
    const [form, setForm] = useState({
        item_name: "",
        category: "",
        quantity: "0",
        unit: "pcs",
        unit_price: "0",
        low_stock_threshold: "5"
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/inventory", {
                ...form,
                quantity: parseInt(form.quantity),
                unit_price: parseFloat(form.unit_price),
                low_stock_threshold: parseInt(form.low_stock_threshold)
            });
            onSaved();
            onClose();
        } catch (err) {
            alert("Failed to save inventory item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Item">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Item Name</label>
                    <input
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={form.item_name}
                        onChange={e => setForm({ ...form, item_name: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Category</label>
                        <input
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Unit</label>
                        <input
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.unit}
                            onChange={e => setForm({ ...form, unit: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Quantity</label>
                        <input
                            type="number"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.quantity}
                            onChange={e => setForm({ ...form, quantity: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.unit_price}
                            onChange={e => setForm({ ...form, unit_price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Low Stock</label>
                        <input
                            type="number"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.low_stock_threshold}
                            onChange={e => setForm({ ...form, low_stock_threshold: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Item"}
                </button>
            </form>
        </Modal>
    );
}
