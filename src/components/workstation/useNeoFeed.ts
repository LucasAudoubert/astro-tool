/**
 * src/components/workstation/useNeoFeed.ts
 * ---------------------------------------------------------
 * Tiny hook that wraps fetchNeoFeed with loading/error/cache
 * state. Stays local to the workstation feature folder.
 * ---------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { fetchNeoFeed, type NeoObject } from "../../services/proxyClient";

interface State {
  objects: NeoObject[];
  loading: boolean;
  error: string | null;
  cached: boolean;
  hazardous: number;
  refreshedAt: Date | null;
}

export function useNeoFeed(autoRefreshMs?: number) {
  const [state, setState] = useState<State>({
    objects: [],
    loading: true,
    error: null,
    cached: false,
    hazardous: 0,
    refreshedAt: null,
  });

  const load = async (isRefresh = false) => {
    if (!isRefresh) setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetchNeoFeed();
      setState({
        objects: res.objects,
        loading: false,
        error: null,
        cached: res.cached,
        hazardous: res.hazardous,
        refreshedAt: new Date(),
      });
    } catch (e: any) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e?.message || "Failed to load NEO feed",
      }));
    }
  };

  useEffect(() => {
    load();
    if (!autoRefreshMs) return;
    const id = setInterval(() => load(true), autoRefreshMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefreshMs]);

  return { ...state, refresh: () => load(true) };
}
