"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HodSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { updateHod } from "./actions";

export default function UpdateHod({ setOpen, hods }) {
  const { toast } = useToast();
  const { id } = useParams();
  //   const hodId = hod ? hod.id : "";
  const form = useForm({
    resolver: zodResolver(HodSchema),
    defaultValues: {
      hodId: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await updateHod(+id, data);
    if (res.status === 422) {
      for (const key in res.errors) {
        form.setError(key, {
          type: "server",
          message: res.errors[key],
        });
      }
      return;
    }
    if (res.status === 500) {
      toast({
        variant: "destructive",
        title: "Server Error",
        description: res.errors.server,
      });
      return;
    }
    setOpen(false);
    toast({
      variant: "success",
      title: "Head of Department Updated",
      description: `Head of department is successfully updated.`,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1">
          <FormField
            control={form.control}
            name="hodId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="my-1">Head of Department</FormLabel>
                <FormControl>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? hods.find((t) => t.value === field.value)?.label
                            : "Select a Head of Department"}
                          <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Department..."
                          className="h-9"
                        />
                        <CommandList></CommandList>
                        <CommandEmpty>
                          No Head of Department Found.
                        </CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 overflow-scroll">
                            {hods.map((t) => (
                              <CommandItem
                                value={t.label}
                                key={t.value}
                                onSelect={() => {
                                  form.setValue("hodId", t.value);
                                  form.clearErrors("hodId");
                                }}
                              >
                                {t.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    t.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Update Hod
        </Button>
      </form>
    </Form>
  );
}
