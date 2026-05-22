import { http } from "@/libs/http";
import { useMutation } from "@tanstack/react-query";

export function useReserveOrder() {
  return useMutation({
    mutationFn: async (concert_id: number) => {
      await http.post("/orders", {
        concert_id
      });
    }
  });
}
