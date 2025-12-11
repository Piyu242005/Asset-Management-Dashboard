'use client';

import { useState } from "react";
import { Modal } from "./Modal";
import api from "../lib/api";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
};

export function EventModal({ isOpen, onClose, onSaved }: Props) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        start_time: new Date().toISOString().slice(0, 16),
        end_time: new Date().toISOString().slice(0, 16),
        type: "meeting"
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/schedule", form);
            onSaved();
            onClose();
        } catch (err) {
            alert("Failed to save event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Event">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Event Title</label>
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
                        <label className="block text-sm font-medium text-slate-700">Start Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.start_time}
                            onChange={e => setForm({ ...form, start_time: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">End Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={form.end_time}
                            onChange={e => setForm({ ...form, end_time: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Type</label>
                    <select
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="meeting">Meeting</option>
                        <option value="task">Task</option>
                        <option value="reminder">Reminder</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Add Event"}
                </button>
            </form>
        </Modal>
    );
}
