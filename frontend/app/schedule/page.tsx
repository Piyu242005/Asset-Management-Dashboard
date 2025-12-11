'use client';

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Schedule } from "../../lib/types";
import { LayoutShell } from "../../components/LayoutShell";
import { EventModal } from "../../components/EventModal";

export default function SchedulePage() {
    const [items, setItems] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const load = async () => {
        try {
            const resp = await api.get("/schedule");
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
                        <div className="text-2xl font-semibold text-slate-900">Schedule</div>
                        <p className="text-slate-500 text-sm">Upcoming events and tasks.</p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm shadow-sm hover:bg-brand-700 transition-colors"
                    >
                        Add Event
                    </button>
                </div>

                <EventModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={load}
                />

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {items.length === 0 && !loading && (
                        <div className="col-span-full card p-12 text-center text-slate-500">
                            No scheduled events found.
                        </div>
                    )}
                    {items.map(item => (
                        <div key={item.id} className="card p-6 bg-white shadow-sm border border-slate-100 rounded-2xl flex flex-col gap-3 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide
                             ${item.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                                        item.type === 'maintenance' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}
                         `}>
                                    {item.type}
                                </div>
                                <div className="text-slate-400 text-xs">
                                    {new Date(item.start_time).toLocaleDateString()}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-slate-50 text-xs text-slate-500 flex items-center gap-2">
                                <span>🕒 {new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutShell>
    );
}
