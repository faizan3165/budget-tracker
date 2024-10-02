import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const GET = async (req: Request, res: Response) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    userSettings = await prisma.userSettings.create({
      data: {
        userId: user?.id,
        currency: "USD",
      },
    });
  }

  revalidatePath("/");

  return Response.json(userSettings);
};
