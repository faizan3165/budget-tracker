"use server";

import prisma from "@/lib/prisma";
import { CreateCategorySchema } from "@/schema/categories";
import { CreateCategorySchemaType } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const CreateCategory = async (form: CreateCategorySchemaType) => {
  const parsedBody = CreateCategorySchema.safeParse(form);

  if (!parsedBody.success) throw new Error("Error");

  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { name, icon, type } = parsedBody.data;

  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
};
