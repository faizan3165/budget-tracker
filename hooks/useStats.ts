import { dateToUTCDate } from "@/lib/helpers";
import {
  GetBalanceStatsResponseType,
  GetCategoryStatsResponseType,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

const useStats = () => {
  const getStats = (from: Date, to: Date) => {
    return useQuery<GetBalanceStatsResponseType>({
      queryKey: ["overview", "stats", from, to],
      queryFn: () =>
        fetch(
          `/api/stats/balance?from=${dateToUTCDate(from)}&to=${dateToUTCDate(
            to
          )}`
        ).then((res) => res.json()),
    });
  };

  const getCategoryStats = (from: Date, to: Date) => {
    return useQuery<GetCategoryStatsResponseType>({
      queryKey: ["overview", "stats", "categories", from, to],
      queryFn: () =>
        fetch(
          `/api/stats/categories?from=${dateToUTCDate(from)}&to=${dateToUTCDate(
            to
          )}`
        ).then((res) => res.json()),
    });
  };

  return { getStats, getCategoryStats };
};

export default useStats;
