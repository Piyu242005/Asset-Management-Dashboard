'use client';

import Link from "next/link";
import { clsx } from "clsx";
import { Icons } from "./Icons";

type NavItem = {
  href: string;
  label: string;
  icon: keyof typeof Icons;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "Menu",
    items: [
      { href: "/", label: "Home", icon: "Home" },
      { href: "/assets", label: "Asset Management", icon: "Asset" },
      { href: "/maintenance", label: "Maintenance", icon: "Maintenance" },
      { href: "/inventory", label: "Inventory", icon: "Inventory" },
      { href: "/financial", label: "Financial Management", icon: "Financial" },
      { href: "/users", label: "User Management", icon: "Users" },
      { href: "/reports", label: "Reports", icon: "Reports" },
      { href: "/schedule", label: "Schedule", icon: "Schedule" },
    ],
  },
  {
    title: "Inbox",
    items: [
      { href: "/messages", label: "Messages", icon: "Messages" },
      { href: "/notifications", label: "Notifications", icon: "Notifications" },
      { href: "/tasks", label: "Tasks", icon: "Tasks" },
    ],
  },
  {
    title: "General",
    items: [
      { href: "/profile", label: "Profile", icon: "Profile" },
      { href: "/settings", label: "Settings", icon: "Settings" },
    ],
  },
];

export function Sidebar({ activePath }: { activePath: string }) {
  const isActive = (href: string) => activePath === href || activePath.startsWith(`${href}/`);

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-4 flex flex-col transition-colors duration-300 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8 px-2 animate-fade-in sticky top-0 bg-white dark:bg-slate-900 z-10 py-2">
        <div className="text-white font-bold text-lg flex items-center justify-center">
          <img src="/piyu.png" className="w-10 h-10 rounded-xl shadow-lg border-2 border-white" alt="Logo" />
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Piyu WealthPro
        </div>
      </div>

      <nav className="space-y-8 flex-1">
        {navGroups.map((group) => (
          <div key={group.title} className="animate-slide-up">
            <h3 className="px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = Icons[item.icon];
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden",
                      active
                        ? "bg-brand-600 text-white shadow-md shadow-brand-500/20 translate-x-1"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 hover:translate-x-1"
                    )}
                  >
                    {/* Slide Animation Background */}
                    <div className={clsx(
                      "absolute inset-0 bg-current opacity-0 transition-opacity duration-300",
                      active ? "opacity-0" : "group-hover:opacity-5"
                    )} />

                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900 z-10">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Need help?</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">piyu.143247@gmail.com</div>
        </div>
      </div>
    </aside>
  );
}
