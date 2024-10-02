import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

import { GetCategoryStatsResponseType, TransactionType } from "@/types";

const CategoriesCard = ({
  formatter,
  type,
  data,
}: {
  formatter: Intl.NumberFormat;
  type: TransactionType;
  data: GetCategoryStatsResponseType;
}) => {
  let filteredData = data?.filter((el) => el.type === type);

  const total = filteredData?.reduce(
    (acc, el) => acc + (el._sum?.amount || 0),
    0
  );

  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow justify-between gap-2 text-muted-foreground md:grid-flow-col">
          Monthly {type === "income" ? "Incomes" : "Expenses"}
        </CardTitle>
      </CardHeader>

      <div className="flex items-center justify-between gap-2">
        {filteredData?.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            <span>No Data For The Selected Period</span>

            <p className="text-sm text-muted-foreground">
              Try a differente period or try adding a new
              {type === "income" ? "income" : "expense"}
            </p>
          </div>
        )}

        {filteredData?.length > 0 && (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredData?.map((i) => {
                const amount = i._sum.amount || 0;
                const percentage = (amount * 100) / (total || amount);

                return (
                  <div className="flex flex-col gap-2" key={i.category}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400">
                        {i.categoryIcon} {i.category}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>

                      <span className="text-sm text-gray-400">
                        {formatter.format(amount)}
                      </span>
                    </div>

                    <Progress
                      value={percentage}
                      className="h-1 transition duration-700 start-1"
                      indicator={
                        type === "income" ? "bg-emerald-500" : "bg-rose-500"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
};

export default CategoriesCard;
