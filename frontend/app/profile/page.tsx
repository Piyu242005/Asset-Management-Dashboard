'use client';

import { useAuth } from "../../components/AuthProvider";
import { LayoutShell } from "../../components/LayoutShell";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <LayoutShell>
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Profile</h1>
                    <p className="text-slate-500 mt-1 text-lg">Manage your personal information and account settings.</p>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    {/* Cover Banner */}
                    <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-4 right-6 text-white/80 text-sm font-medium">Verified Account</div>
                    </div>

                    <div className="px-8 pb-8">
                        {/* Profile Image & Quick Info */}
                        <div className="relative flex flex-col md:flex-row items-start md:items-end -mt-16 mb-8 gap-6">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full ring-4 ring-white bg-white shadow-md overflow-hidden">
                                    <img
                                        src="/profile_new.jpg"
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + (user?.full_name || "User") + "&background=0D8ABC&color=fff";
                                        }}
                                    />
                                </div>
                                <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-2 border-white rounded-full" title="Online"></div>
                            </div>

                            <div className="flex-1 mb-2">
                                <h2 className="text-3xl font-bold text-slate-900">{user?.full_name || "Piyu"}</h2>
                                <p className="text-slate-500 font-medium">{user?.email}</p>
                            </div>

                            <div className="mb-2 hidden md:block">
                                <button
                                    onClick={logout}
                                    className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">Personal Details</h3>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-medium flex items-center shadow-sm">
                                        <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {user?.full_name || "Piyu"}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-medium flex items-center shadow-sm">
                                        <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">Account Information</h3>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Role</label>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-medium flex items-center justify-between shadow-sm">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="uppercase tracking-wide text-sm font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                                                {user?.is_admin ? "Administrator" : "User"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">User ID</label>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-mono font-medium flex items-center shadow-sm">
                                        <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        #{user?.id}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Sign Out Button */}
                        <div className="mt-8 md:hidden">
                            <button
                                onClick={logout}
                                className="w-full px-6 py-3 bg-white border border-slate-200 text-rose-600 rounded-xl font-bold hover:bg-rose-50 transition-all shadow-sm"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Settings / Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900">Preferences</h3>
                        <p className="text-sm text-slate-500 mt-1">Change theme and localized settings.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <p className="text-sm text-slate-500 mt-1">Manage email and push alerts.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-slate-900">Security</h3>
                        <p className="text-sm text-slate-500 mt-1">Update password and 2FA.</p>
                    </div>
                </div>
            </div>
        </LayoutShell>
    );
}
