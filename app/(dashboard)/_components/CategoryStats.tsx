import { useMemo } from "react";
import { UserSettings } from "@prisma/client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import CategoriesCard from "./CategoriesCard";

import { GetCurrencyFormatter } from "@/lib/helpers";

import useStats from "@/hooks/useStats";

const CategoryStats = ({
  userSettings,
  from,
  to,
}: {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}) => {
  const { getCategoryStats } = useStats();
  const { data, isFetching } = getCategoryStats(from, to);

  const formatter = useMemo(() => {
    return GetCurrencyFormatter(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={isFetching}>
        <CategoriesCard formatter={formatter} type="income" data={data || []} />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={isFetching}>
        <CategoriesCard
          formatter={formatter}
          type="expense"
          data={data || []}
        />
      </SkeletonWrapper>
    </div>
  );
};

export default CategoryStats;
