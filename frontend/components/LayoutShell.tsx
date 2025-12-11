'use client';

import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H3',location:'LayoutShell.tsx:effect',message:'authState',data:{loading,hasUser:!!user},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (!loading && !user) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H3',location:'LayoutShell.tsx:effect',message:'redirectingToLogin',data:{pathname},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-slate-500 dark:text-slate-400 font-medium">Initializing...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-slate-500 dark:text-slate-400 font-medium">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar activePath={pathname} />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto h-screen">
        <Topbar />
        <div className="animate-slide-up">
          {children}
        </div>
      </div>
    </div>
  );
}

