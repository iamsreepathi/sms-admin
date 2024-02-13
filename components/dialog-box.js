"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function DialogBox({
  Component,
  btntext = "Add Student",
  title,
  description,
  variant = "default",
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>{btntext}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] md:max-w-[725px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Component.type {...Component.props} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
