import { useQuery } from "@tanstack/react-query";
import type { CreditScore } from "@/types";

export const useGetCreditScore = () => {
  return useQuery<CreditScore>({
    queryKey: ["creditScore"],
    queryFn: async () => {
      return await fetch("/api/credit/score").then((res) => res.json());
    },
  });
};
