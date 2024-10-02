import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CircleOff } from "lucide-react";
import { useTheme } from "next-themes";

import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

import { Button } from "../ui/button";

const CreateCategoryForm = ({
  form,
  onSubmit,
}: {
  form: any;
  onSubmit: any;
}) => {
  const theme = useTheme();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input defaultValue={""} {...field} />
              </FormControl>

              <FormDescription>Category Name (required)</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>

              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="h-[108px] w-full">
                      {form.watch("icon") ? (
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-5xl" role="img">
                            {field.value}
                          </span>

                          <p className="text-xs text-muted-foreground">
                            Change Icon
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <CircleOff className="h-[48px] w-[48px]" />

                          <p className="text-xs text-muted-foreground">
                            Click To Select
                          </p>
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full">
                    <Picker
                      data={data}
                      theme={theme?.resolvedTheme}
                      onEmojiSelect={(emoji: { native: string }) =>
                        field.onChange(emoji.native)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormDescription>
                This is how you category will appear
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
