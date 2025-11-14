import { useQuery } from "@tanstack/react-query";
import { fetchNumberAlea } from "../api/fetchApi.js";

export function usePrimeAlea() {
  return useQuery({
    queryKey: ["random-number"],
    queryFn: fetchNumberAlea,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
