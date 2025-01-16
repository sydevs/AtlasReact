import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export default function useAtlasClient(apiKey: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['client', apiKey],
    queryFn: () => api.getClient(apiKey),
  });

  return {
    client: data,
    isClientLoading: isLoading,
    clientError: error,
  };
};
