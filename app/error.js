"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({ error, reset }) {
  return (
    <div className="h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Something went wrong!</CardTitle>
          <CardDescription>{error?.message}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => reset()}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
