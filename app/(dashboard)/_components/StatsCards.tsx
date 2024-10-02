import { useMemo } from "react";
import { UserSettings } from "@prisma/client";

import StatsCard from "./StatsCard";
import SkeletonWrapper from "@/components/SkeletonWrapper";

import { GetCurrencyFormatter } from "@/lib/helpers";

import useStats from "@/hooks/useStats";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const StatsCards = ({
  userSettings,
  from,
  to,
}: {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}) => {
  const { getStats } = useStats();
  const { data, isFetching } = getStats(from, to);

  const income = data?.income || 0;
  const expense = data?.expense || 0;
  const balance = income - expense;

  const formatter = useMemo(() => {
    return GetCurrencyFormatter(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          formatter={formatter}
          value={income}
          title="Income"
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg text-emerald-500 bg-emerald-400/10 " />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          formatter={formatter}
          value={expense}
          title="Expense"
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg text-rose-500 bg-rose-400/10 " />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={isFetching}>
        <StatsCard
          formatter={formatter}
          value={balance}
          title="Balance"
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg text-violet-500 bg-violet-400/10 " />
          }
        />
      </SkeletonWrapper>
    </div>
  );
};

export default StatsCards;
