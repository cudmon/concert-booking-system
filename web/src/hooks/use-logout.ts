import { http } from "@/libs/http";
import { AUTH_QUERY_KEY } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await http.post("/auth/logout");
    },

    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({
        queryKey: AUTH_QUERY_KEY
      });
    }
  });
}
