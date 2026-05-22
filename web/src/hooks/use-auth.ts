import { http } from "@/libs/http";
import { useQuery } from "@tanstack/react-query";

export const AUTH_QUERY_KEY = ["auth", "me"] as const;

export function useAuth() {
  return useQuery<User | null>({
    retry: false,
    staleTime: 60_000,
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const { data } = await http.get<User>("/auth/me");

      return data;
    }
  });
}
