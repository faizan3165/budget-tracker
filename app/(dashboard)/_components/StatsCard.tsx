import { ReactNode, useCallback } from "react";
import CountUp from "react-countup";

import { Card } from "@/components/ui/card";

const StatsCard = ({
  formatter,
  value,
  title,
  icon,
}: {
  formatter: Intl.NumberFormat;
  value: number;
  title: string;
  icon: ReactNode;
}) => {
  const formatFn = useCallback(
    (val: number) => {
      return formatter.format(val);
    },
    [formatter]
  );

  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}

      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>

        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
};

export default StatsCard;
