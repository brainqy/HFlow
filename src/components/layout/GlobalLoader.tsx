
"use client";

import { useState, useEffect, ReactNode, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoaderUI from '@/components/ui/page-loader';

export function GlobalLoader({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true); // Start true to show on initial load
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    // This effect runs once on component mount for the initial load
    if (isInitialLoadRef.current) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        isInitialLoadRef.current = false; // Mark initial load as complete
      }, 500); // Duration for the initial loading indicator

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    // This effect runs on route changes (pathname or searchParams)
    // It should not run during the initial load phase handled by the mount effect.
    if (!isInitialLoadRef.current) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 750); // Duration for navigation loading indicator

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading && <PageLoaderUI />}
      {children}
    </>
  );
}
