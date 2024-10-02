import prisma from "./prisma";

export const getBalanceStats = async (userId: string, from: Date, to: Date) => {
  const total = await prisma.transaction.groupBy({
    by: ["type"],

    where: {
      userId,

      date: {
        gte: from,
        lte: to,
      },
    },

    _sum: {
      amount: true,
    },
  });

  return {
    expense: total.find((t) => t.type === "expense")?._sum?.amount || 0,
    income: total.find((t) => t.type === "income")?._sum?.amount || 0,
  };
};

export const getCategoryStats = async (
  userId: string,
  from: Date,
  to: Date
) => {
  const stats = await prisma.transaction.groupBy({
    by: ["type", "category", "categoryIcon"],

    where: {
      userId,

      date: {
        gte: from,
        lte: to,
      },
    },

    _sum: {
      amount: true,
    },

    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  return stats;
};
