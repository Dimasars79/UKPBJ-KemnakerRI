"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminTransitionLoader } from "@/components/AdminTransitionLoader";

interface AdminTransitionContextValue {
  isTransitioning: boolean;
  startTransition: () => void;
  markAdminReady: () => void;
  cancelTransition: () => void;
}

const AdminTransitionContext = createContext<AdminTransitionContextValue | undefined>(undefined);

export function AdminTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const startTransition = useCallback(() => {
    setIsReady(false);
    setIsTransitioning(true);
  }, []);

  const markAdminReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const cancelTransition = useCallback(() => {
    setIsReady(false);
    setIsTransitioning(false);
  }, []);

  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
    setIsReady(false);
  }, []);

  // Pengaman: jika sudah tiba di /admin namun markAdminReady belum terpanggil dalam 4.5 detik, tandai siap otomatis
  useEffect(() => {
    if (!isTransitioning || pathname !== "/admin" || isReady) return;
    const fallbackTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 4500);
    return () => window.clearTimeout(fallbackTimer);
  }, [isTransitioning, pathname, isReady]);

  return (
    <AdminTransitionContext.Provider
      value={{
        isTransitioning,
        startTransition,
        markAdminReady,
        cancelTransition,
      }}
    >
      {children}
      <AdminTransitionLoader
        isLoading={isTransitioning}
        isReady={isReady}
        onComplete={handleComplete}
        minDuration={1800}
      />
    </AdminTransitionContext.Provider>
  );
}

export function useAdminTransition() {
  const ctx = useContext(AdminTransitionContext);
  if (!ctx) {
    throw new Error("useAdminTransition must be used within AdminTransitionProvider");
  }
  return ctx;
}
