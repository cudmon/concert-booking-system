import { http } from "@/libs/http";
import { useQuery } from "@tanstack/react-query";

const ORDERS_QUERY_KEY = ["orders"];

export function useQueryOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: async () => {
      const response = await http.get<Order[]>("/orders");

      return response.data;
    }
  });
}
