"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { activateSemester } from "./actions";
import { useToast } from "@/components/ui/use-toast";

export default function UpdateSemester({ setOpen, activeSem, futureSems }) {
  const [sem, setSem] = useState(null);
  const { toast } = useToast();

  const submit = async () => {
    const semester = futureSems.find((s) => s.id === sem);
    if (semester) {
      const res = await activateSemester(sem);
      if (res?.status === 500) {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: res.errors.server,
        });
        return;
      }
      toast({
        variant: "success",
        title: "Activate Semester",
        description: res.data?.message,
      });
      setOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Active Semester</Label>
        <Input id="name" type="text" value={activeSem.name} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Future Semesters</Label>
        <Select onValueChange={(val) => setSem(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a semester to activate" />
          </SelectTrigger>
          <SelectContent>
            {futureSems.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button onClick={submit} type="submit" className="w-full">
          Activate Selected Semester
        </Button>
      </div>
    </div>
  );
}
