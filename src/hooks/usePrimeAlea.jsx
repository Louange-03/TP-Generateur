// src/hooks/usePrimeAlea.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchNumberAlea } from "../api/fetchApi.js";

export function usePrimeAlea() {
  return useQuery({
    queryKey: ["prime-alea"],
    queryFn: fetchNumberAlea,
    refetchOnWindowFocus: false,
  });
}
