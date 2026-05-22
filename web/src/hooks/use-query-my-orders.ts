import { http } from "@/libs/http";
import { useQuery } from "@tanstack/react-query";

export function useQueryMyOrders() {
  return useQuery({
    queryKey: ["orders", "me"],
    queryFn: async () => {
      const response = await http.get<Order[]>("/orders/me");

      return response.data;
    }
  });
}
