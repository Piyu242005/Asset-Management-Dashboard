const ACCESS_KEY = "asset_dashboard_access_token";
const REFRESH_KEY = "asset_dashboard_refresh_token";

export type TokenPair = { access_token: string; refresh_token: string };

export const getTokens = (): TokenPair | null => {
  if (typeof window === "undefined") return null;
  const access_token = localStorage.getItem(ACCESS_KEY);
  const refresh_token = localStorage.getItem(REFRESH_KEY);
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
};

export const setTokens = (tokens: TokenPair) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, tokens.access_token);
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
};

export const clearTokens = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

