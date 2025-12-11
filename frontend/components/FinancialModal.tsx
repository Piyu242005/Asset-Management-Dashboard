'use client';

import { useState } from "react";
import { Modal } from "./Modal";
import api from "../lib/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
    defaultType?: "income" | "expense";
};

export function FinancialModal({ isOpen, onClose, onSaved, defaultType = "expense" }: Props) {
    const [form, setForm] = useState({
        title: "",
        category: "",
        type: defaultType,
        amount: "",
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    // Reset type when modal opens with new default
    if (isOpen && form.type !== defaultType && form.title === "") {
        setForm(prev => ({ ...prev, type: defaultType }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/financial", {
                ...form,
                amount: parseFloat(form.amount)
            });
            onSaved();
            onClose();
        } catch (err) {
            alert("Failed to save financial record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={defaultType === 'income' ? "Record Income" : "Record Expense"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Title</label>
                    <input
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.amount}
                            onChange={e => setForm({ ...form, amount: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Date</label>
                        <input
                            type="date"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Category</label>
                    <input
                        required
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        list="categories"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                    />
                    <datalist id="categories">
                        <option value="Salary" />
                        <option value="Sales" />
                        <option value="Utilities" />
                        <option value="Rent" />
                        <option value="Supplies" />
                        <option value="Maintenance" />
                    </datalist>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 rounded-lg disabled:opacity-50 ${defaultType === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-rose-600 hover:bg-rose-700'}`}
                >
                    {loading ? "Saving..." : "Save Record"}
                </button>
            </form>
        </Modal>
    );
}
