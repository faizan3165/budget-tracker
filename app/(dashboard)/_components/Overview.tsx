"use client";

import { useState } from "react";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { toast } from "sonner";

import StatsCards from "./StatsCards";
import CategoryStats from "./CategoryStats";

import { DateRangePicker } from "@/components/ui/date-range-picker";

import { MAX_DATE_RANGE_DAYS } from "@/constants";

const Overview = ({ userSettings }: { userSettings: UserSettings }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
      <div className="container flex flex-wrap items-center justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Overview</h2>

        <div className="flex items-center gap-3">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(val) => {
              const { from, to } = val.range;

              if (!from || !to) return;

              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `Date Range is too big, max allowed is 6 months or ${MAX_DATE_RANGE_DAYS} days.`
                );

                return;
              }

              setDateRange({ from, to });
            }}
          />
        </div>
      </div>

      <div className="container flex w-full flex-col gap-2">
        <StatsCards
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />

        <CategoryStats
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
      </div>
    </>
  );
};

export default Overview;
