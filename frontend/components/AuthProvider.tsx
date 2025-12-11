'use client';

import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { clearTokens, getTokens, setTokens, TokenPair } from "../lib/auth";
import { User } from "../lib/types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { },
  logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H2',location:'AuthProvider.tsx:fetchMe',message:'fetchMe:start',data:{},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    try {
      const resp = await api.get("/auth/me");
      setUser(resp.data);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H2',location:'AuthProvider.tsx:fetchMe',message:'fetchMe:success',data:{userId:resp.data?.id},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    } catch (error) {
      setUser(null);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H2',location:'AuthProvider.tsx:fetchMe',message:'fetchMe:error',data:{hasError:true},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokens = getTokens();
    if (!tokens) {
      setLoading(false);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H1',location:'AuthProvider.tsx:init',message:'noTokensFound',data:{},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      return;
    }
    fetchMe();
  }, []);

  const login = async (email: string, password: string) => {
    // Use URLSearchParams to send application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    // Explicitly set the header, though default axios usually handles strings/params as form-urlencoded
    const resp = await api.post("/auth/login", params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/3791b131-8131-4a14-9c1f-16a3fc3f4d9b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix-run1',hypothesisId:'H1',location:'AuthProvider.tsx:login',message:'login:success',data:{email},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    const tokens: TokenPair = resp.data;
    setTokens(tokens);
    await fetchMe();
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

