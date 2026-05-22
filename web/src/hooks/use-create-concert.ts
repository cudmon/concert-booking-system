import { http } from "@/libs/http";
import { useMutation } from "@tanstack/react-query";

export function useCreateConcert() {
  return useMutation({
    mutationFn: async (
      values: Pick<Concert, "name" | "capacity" | "description">
    ) => {
      const response = await http.post("/concerts", values);

      return response.data;
    }
  });
}
