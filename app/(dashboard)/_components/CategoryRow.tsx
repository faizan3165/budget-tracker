import { Category } from "@prisma/client";
import React from "react";

const CategoryRow = ({ category }: { category: Category }) => {
  return (
    <div className="flex items-center gap-2">
      <span role="image">{category?.icon}</span>

      <span>{category?.name}</span>
    </div>
  );
};

export default CategoryRow;
