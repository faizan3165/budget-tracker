import { z } from "zod";

import { CreateTransactionSchema } from "@/schema/transaction";
import { CreateCategorySchema } from "@/schema/categories";
import { getBalanceStats, getCategoryStats } from "@/lib/QueryFunctions";

export type TransactionType = "income" | "expense";
export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;

export type GetCategoryStatsResponseType = Awaited<
  ReturnType<typeof getCategoryStats >
>;

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;
