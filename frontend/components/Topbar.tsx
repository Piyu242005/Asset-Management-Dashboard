'use client';

import { useAuth } from "./AuthProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
      {/* Search Button & Toggle */}
      <div className="flex items-center gap-4">
        <button className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-slate-500 dark:text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <ThemeToggle />
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 pl-4 md:border-l border-slate-200 dark:border-slate-700">
        <div
          onClick={logout}
          className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 pr-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          title="Click to Logout"
        >
          <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-slate-700 overflow-hidden ring-2 ring-white dark:ring-slate-800">
            {/* Using a premium placeholder avatar */}
            <img
              src="/profile_new.jpg"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 transition-colors">
              {user?.full_name || "Sheena Abdur"}
            </div>
            <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Administrator
            </div>
          </div>
          <div className="ml-2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
