import { createFileRoute } from "@tanstack/react-router";
import PrimesPage from "../pages/PrimesPage";

export const Route = createFileRoute("/primes")({
  component: PrimesPage,
});
