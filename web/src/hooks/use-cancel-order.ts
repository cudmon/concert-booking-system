import { http } from "@/libs/http";
import { useMutation } from "@tanstack/react-query";

export function useCancelOrder() {
  return useMutation({
    mutationFn: async (order_id: number) => {
      await http.patch(`/orders/${order_id}/cancel`);
    }
  });
}
