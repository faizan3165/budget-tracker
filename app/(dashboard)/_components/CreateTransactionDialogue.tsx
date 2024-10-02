"use client";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import CreateTransactionForm from "@/components/forms/CreateTransactionForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import { TransactionProps } from "@/interfaces";
import { CreateTransactionSchemaType } from "@/types";
import { CreateTransactionSchema } from "@/schema/transaction";

import useTransaction from "@/hooks/useTransaction";
import { toast } from "sonner";
import { dateToUTCDate } from "@/lib/helpers";

const CreateTransactionDialogue = ({ trigger, type }: TransactionProps) => {
  const [open, setOpen] = useState(false);

  const { createTransaction } = useTransaction();

  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });

  const { mutate, isPending } = createTransaction(form, setOpen);

  const onSubmit = useCallback(
    (values: CreateTransactionSchemaType) => {
      toast.loading("Creating transaction", {
        id: "create-transaction",
      });

      mutate({
        ...values,
        date: dateToUTCDate(values.date),
      });
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {type}
            </span>{" "}
            transaction
          </DialogTitle>
        </DialogHeader>

        <CreateTransactionForm
          type={type}
          form={form}
          onSubmitHandler={onSubmit}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => form.reset}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialogue;
