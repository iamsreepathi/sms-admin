"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/lib/schema";
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
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { addCategory } from "./actions";

export default function AddCategory({ setOpen }) {
  const { toast } = useToast();
  const { id } = useParams();
  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await addCategory(id, data);
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
      title: "Department Category Created",
      description: `New department category ${res.data.name} is successfully created.`,
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Description</FormLabel>
                <FormControl>
                  <Textarea rows="4" placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Category
        </Button>
      </form>
    </Form>
  );
}
