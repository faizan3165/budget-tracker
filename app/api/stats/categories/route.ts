import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { OverviewQuerySchema } from "@/schema/overview";

import { getCategoryStats } from "@/lib/QueryFunctions";

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

  const categoryStats = await getCategoryStats(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );

  return Response.json(categoryStats);
};
