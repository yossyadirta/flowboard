"use client";

import { AppContext } from "@/context/AppContext";
import { initialState } from "@/state/initialState";
import { rootReducer } from "@/state/rootReducer";
import { useEffect, useReducer } from "react";

const STORAGE_KEY = "flowboard:state";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialState, (base) => {
    if (typeof window === "undefined") return base;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...base, ...JSON.parse(raw), isFetching: true, isMutating: false } : { ...base, isFetching: true, isMutating: false };
    } catch {
      return base;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    // Simulate initial fetching latency to display the skeleton loader
    const timer = setTimeout(() => {
      dispatch({ type: "SET_FETCHING", payload: false } as any);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
