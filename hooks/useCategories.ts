import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CreateCategory } from "@/actions/categories";

import { TransactionType } from "@/types";
import { Category } from "@prisma/client";
import { toast } from "sonner";

const useCategories = () => {
  const queryClient = useQueryClient();

  const getCategories = (type: TransactionType) => {
    return useQuery({
      queryKey: ["categories", type],
      queryFn: () =>
        fetch(`/api/categories?type=${type}`).then((res) => res.json()),
    });
  };

  const createCategory = (
    form: any,
    setOpen: any,
    onSuccessCallback: (cat: Category) => void
  ) => {
    return useMutation({
      mutationFn: CreateCategory,
      onSuccess: async (data: Category) => {
        form.reset({
          name: "",
          icon: "",
          type: "",
        });

        toast.success(`Category ${data?.name} created successfully`, {
          id: "create-category",
        });

        onSuccessCallback(data);

        await queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        setOpen((prev: any) => !prev);
      },

      onError: (error: Error) => {
        form.reset({
          name: "",
          icon: "",
          type: "",
        });

        toast.error("Failed to create category. Please try again later.", {
          id: "create-category",
        });
      },
    });
  };

  return { getCategories, createCategory };
};

export default useCategories;
