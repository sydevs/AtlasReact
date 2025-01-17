import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate, useHref } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { StrictMode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function OuterProviders({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          {children}
        </HelmetProvider>
      </QueryClientProvider>
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
