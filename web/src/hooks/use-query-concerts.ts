import { http } from "@/libs/http";
import { useQuery } from "@tanstack/react-query";

export function useQueryConcerts() {
  return useQuery({
    queryKey: ["concerts"],
    queryFn: async () => {
      const response = await http.get<Concert[]>("/concerts");

      return response.data;
    }
  });
}
