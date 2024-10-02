import { useCallback, useState } from "react";
import { Loader2, PlusSquareIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Category } from "@prisma/client";

import CreateCategoryForm from "@/components/forms/CreateCategoryForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateCategorySchema } from "@/schema/categories";
import { CreateCategorySchemaType, TransactionType } from "@/types";
import { cn } from "@/lib/utils";

import useCategories from "@/hooks/useCategories";

const CreateCategoryModal = ({
  type,
  onSuccess,
}: {
  type: TransactionType;
  onSuccess: (cat: Category) => void;
}) => {
  const [open, setOpen] = useState(false);

  const { createCategory } = useCategories();

  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });

  const { mutate, isPending } = createCategory(form, setOpen, onSuccess);

  const onSubmit = useCallback(
    (values: CreateCategorySchemaType) => {
      toast.loading("Creating Category", {
        id: "create-category",
      });

      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-4 text-muted-foreground"
        >
          <PlusSquareIcon className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {type}
            </span>
            Category
          </DialogTitle>

          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>

        <CreateCategoryForm form={form} onSubmit={onSubmit} />

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

export default CreateCategoryModal;
