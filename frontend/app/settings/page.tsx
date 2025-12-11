'use client';

import { LayoutShell } from "../../components/LayoutShell";

export default function SettingsPage() {
    return (
        <LayoutShell>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    <p className="text-slate-500">Manage application preferences.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-slate-900">General</h3>
                        <p className="text-sm text-slate-500 mb-4">Application interface and behavior.</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-slate-900">Dark Mode</div>
                                    <div className="text-sm text-slate-500">Enable dark theme for the application.</div>
                                </div>
                                <div className="h-6 w-11 bg-slate-200 rounded-full relative cursor-pointer">
                                    <div className="h-5 w-5 bg-white rounded-full shadow-sm absolute top-0.5 left-0.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-slate-900">Notifications</h3>
                        <p className="text-sm text-slate-500 mb-4">Manage how you receive alerts.</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-slate-900">Email Notifications</div>
                                    <div className="text-sm text-slate-500">Receive daily summaries via email.</div>
                                </div>
                                <div className="h-6 w-11 bg-brand-600 rounded-full relative cursor-pointer">
                                    <div className="h-5 w-5 bg-white rounded-full shadow-sm absolute top-0.5 right-0.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutShell>
    );
}
