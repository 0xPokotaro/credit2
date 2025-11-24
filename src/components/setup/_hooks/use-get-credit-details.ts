import { useQuery } from "@tanstack/react-query";
import type { CreditDetails } from "@/types";

export const useGetCreditDetails = (address?: string | null) => {
  return useQuery<CreditDetails>({
    queryKey: ["creditDetails", address],
    queryFn: async () => {
      const url = address
        ? `/api/credit/details?evm_address=${address}`
        : "/api/credit/details";
      return await fetch(url).then((res) => res.json());
    },
  });
};
