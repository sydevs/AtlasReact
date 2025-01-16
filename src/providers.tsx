import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate, useHref } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { StrictMode, Suspense } from "react";

const queryClient = new QueryClient()

export function OuterProviders({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            {children}
          </HelmetProvider>
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  );
}

export function InnerProviders({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      {children}
    </NextUIProvider>
  );
}
