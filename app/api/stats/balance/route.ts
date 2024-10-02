import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { getBalanceStats } from "@/lib/QueryFunctions";

import { OverviewQuerySchema } from "@/schema/overview";

export const GET = async (req: Request, res: Response) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success)
    return Response.json(queryParams.error.message, {
      status: 400,
    });

  const stats = await getBalanceStats(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );

  return Response.json(stats);
};
