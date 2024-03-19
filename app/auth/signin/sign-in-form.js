"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignInForm({ callbackUrl }) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "johndoe@example.com",
      password: "password",
    },
  });

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!res?.ok) {
      form.setError("email", {
        type: "server",
        message: res?.error,
      });
      toast({
        variant: "destructive",
        title: "Sign In Error",
        description: res?.error,
      });
      return;
    }
    toast({
      variant: "success",
      title: "Sign In Success",
      description: "Welcome to school management system.",
    });
    router.push(callbackUrl ?? "/");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
