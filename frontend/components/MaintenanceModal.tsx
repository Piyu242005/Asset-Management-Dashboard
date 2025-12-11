'use client';

import { useState } from "react";
import { Modal } from "./Modal";
import api from "../lib/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
};

export function MaintenanceModal({ isOpen, onClose, onSaved }: Props) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        scheduled_date: new Date().toISOString().split('T')[0],
        status: "pending",
        cost: "0"
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/maintenance", {
                ...form,
                cost: parseFloat(form.cost)
            });
            onSaved();
            onClose();
        } catch (err) {
            alert("Failed to save maintenance record");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Log Maintenance">
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
                <div>
                    <label className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Date</label>
                        <input
                            type="date"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.scheduled_date}
                            onChange={e => setForm({ ...form, scheduled_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Cost</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.cost}
                            onChange={e => setForm({ ...form, cost: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Status</label>
                    <select
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Record"}
                </button>
            </form>
        </Modal>
    );
}
