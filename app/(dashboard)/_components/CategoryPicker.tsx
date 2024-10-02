import { useCallback, useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";

import CategoryRow from "./CategoryRow";
import CreateCategoryModal from "./CreateCategoryModal";

import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import useCategories from "@/hooks/useCategories";

import { TransactionType } from "@/types";
import { cn } from "@/lib/utils";

const CategoryPicker = ({
  type,
  onChangeHandler,
}: {
  type: TransactionType;
  onChangeHandler: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { getCategories } = useCategories();
  const { data } = getCategories(type);

  const selectedCategory = data?.find((cat: Category) => cat.name === value);

  const onSuccessHandler = useCallback(
    (cat: Category) => {
      setValue(cat?.name);
      setOpen((prev) => !prev);
    },
    [setValue, setOpen]
  );

  useEffect(() => {
    if (!value) return;

    onChangeHandler(value);
  }, [onChangeHandler, value]);
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select a Category"
          )}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search Category" />

          <CreateCategoryModal type={type} onSuccess={onSuccessHandler} />

          <CommandEmpty>
            <p>Category Not Found</p>

            <p className="text-sx text-muted-foreground">
              Tip: Create a new Category
            </p>
          </CommandEmpty>

          <CommandGroup>
            <CommandList>
              {data &&
                data?.map((cat: Category) => (
                  <CommandItem
                    key={cat?.name}
                    className="cursor-pointer"
                    onSelect={() => {
                      setValue(cat?.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={cat} />

                    <Check
                      className={cn(
                        "ml-2 w-4 h-4 opacity-0",
                        value === cat?.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryPicker;
