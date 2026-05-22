import { http } from "@/libs/http";
import { useMutation } from "@tanstack/react-query";

export function useRemoveConcert() {
  return useMutation({
    mutationFn: async (id: number) => {
      await http.delete(`/concerts/${id}`);
    }
  });
}
