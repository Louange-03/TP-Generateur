// src/hooks/usePrimeAlea.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchNumberAlea } from "../api/fetchApi";
import { usePrimeStore } from "../stores/usePrimeStore.js";

export function usePrimeAlea() {
  const setFromApi = usePrimeStore((s) => s.setFromApi);

  return useQuery({
    queryKey: ["random-number"],
    queryFn: fetchNumberAlea,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data && typeof data.number === "number") {
        setFromApi(data.number);
      }
    },
  });
}
