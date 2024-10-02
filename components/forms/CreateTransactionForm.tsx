import { useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { TransactionType } from "@/types";
import { cn } from "@/lib/utils";

const CreateTransactionForm = ({
  type,
  form,
  onSubmitHandler,
}: {
  type: TransactionType;
  form: any;
  onSubmitHandler: any;
}) => {
  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue("category", value);
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Input defaultValue={""} {...field} />
              </FormControl>

              <FormDescription>
                Transaction Description (optional)
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>

              <FormControl>
                <Input defaultValue={0} type="number" {...field} />
              </FormControl>

              <FormDescription>Transaction Amount (required)</FormDescription>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>

                <FormControl>
                  <CategoryPicker
                    type={type}
                    onChangeHandler={handleCategoryChange}
                  />
                </FormControl>

                <FormDescription>
                  Select Transaction Category (required)
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Transaction Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick A Date</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      initialFocus={true}
                      selected={field.value}
                      onSelect={(val) => {
                        if (!val) return;
                        field.onChange(val);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <FormDescription>
                  Select Transaction Date (required)
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateTransactionForm;
