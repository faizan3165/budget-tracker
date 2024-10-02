import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateTransaction } from "@/actions/transactions";
import { toast } from "sonner";

const useTransaction = () => {
  const queryClient = useQueryClient();

  const createTransaction = (form: any, setOpen: any) => {
    return useMutation({
      mutationFn: CreateTransaction,

      onSuccess: () => {
        toast.success("Transaction created successfully", {
          id: "create-transaction",
        });

        form.reset();

        queryClient.invalidateQueries({ queryKey: ["overview"] });

        setOpen((prev: any) => !prev);
      },
    });
  };

  return { createTransaction };
};

export default useTransaction;
