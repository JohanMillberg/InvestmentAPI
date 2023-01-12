import { useQuery } from "@tanstack/react-query";
import fetchPlotList from "./fetchPlotList";

export default function usePlotList(request) {
  const results = useQuery(["plots", request], fetchPlotList);

  return [results?.data?.plots ?? [], results.status];
}
