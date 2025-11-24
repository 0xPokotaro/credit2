import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = (address?: string | null) => {
  return useQuery({
    queryKey: ["transactions", address],
    queryFn: async () => {
      if (!address) {
        throw new Error("Address is required");
      }
      return await fetch(`/api/avalanche?evm_address=${address}`).then((res) =>
        res.json(),
      );
    },
    enabled: !!address,
  });
};
