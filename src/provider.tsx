import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate, useHref } from "react-router";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient()

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <NextUIProvider navigate={navigate} useHref={useHref}>
          {children}
        </NextUIProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
