'use client';

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { User } from "../../lib/types";
import { LayoutShell } from "../../components/LayoutShell";
import { InviteUserModal } from "../../components/InviteUserModal";

export default function UsersPage() {
    const [items, setItems] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const load = async () => {
        try {
            const resp = await api.get("/users");
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
                        <div className="text-2xl font-semibold text-slate-900">User Management</div>
                        <p className="text-slate-500 text-sm">Manage system access and roles.</p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm shadow-sm hover:bg-brand-700 transition-colors"
                    >
                        Invite User
                    </button>
                </div>

                <InviteUserModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSaved={load}
                />

                <div className="card bg-white shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                                {items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.full_name || "-"}</td>
                                        <td className="px-6 py-4 text-slate-500">{item.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                                                }`}>
                                                {item.is_admin ? 'Admin' : 'User'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'
                                                }`}>
                                                {item.is_active ? 'Active' : 'Inactive'}
                                            </span>
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
