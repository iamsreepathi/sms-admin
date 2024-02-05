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

export default function DialogBox({ Component }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Add student profile</DialogTitle>
          <DialogDescription>
            Add a student profile here. Click add stiudent when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Component.type {...Component.props} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
