"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSemCourses, registerCourses } from "./actions";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import TrashCan from "@/components/icons/trash-can";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterCourses({ student, semesters }) {
  const [courses, setCourses] = useState([]);
  const [selCourses, setSelCourses] = useState([]);
  const [sem, setSem] = useState(null);
  const { toast } = useToast();

  const getCourses = async (semId) => {
    const crs = await getSemCourses(semId);
    setCourses(crs);
    setSem(semId);
    setSelCourses([]);
  };

  const selectCourse = (checked, course) => {
    if (checked) setSelCourses((prevState) => [...prevState, course]);
    else setSelCourses(selCourses.filter((sc) => sc.id != course.id));
  };

  const submit = async () => {
    const res = await registerCourses(student.id, sem, selCourses);
    console.log(res);
    if (res.status === 500) {
      toast({
        variant: "destructive",
        title: "Server Error",
        description: res.errors.server,
      });
      return;
    }
    setSem(null);
    setSelCourses([]);
    setCourses([]);
    toast({
      variant: "success",
      title: "Register Courses",
      description: `Courses are successfully registered.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Student</Label>
          <Input id="name" type="text" value={student.name} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Semester</Label>
          <Select onValueChange={(val) => getCourses(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {!sem && (
          <Label>
            Please choose a semester above to list the courses available to
            register.
          </Label>
        )}
        {sem && courses.length == 0 && (
          <Label>
            No courses are available to register for the selected semester.
            Please try again later.
          </Label>
        )}
        {courses.length != 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label>Please choose from list of courses to register.</Label>
              <ScrollArea className="h-[500px] pr-3">
                <ul className="space-y-2">
                  {courses.map((s) => (
                    <li
                      key={s.id}
                      className="border rounded p-2 flex items-center space-x-4"
                    >
                      <Checkbox
                        checked={selCourses.map((sc) => sc.id).includes(s.id)}
                        onCheckedChange={(checked) => selectCourse(checked, s)}
                        id={s.id}
                      />
                      <label htmlFor={s.id}>
                        <span className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {s.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          Starts on: {s.startDate.toDateString()}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
            <div className="space-y-4">
              <Label>Courses selected to register.</Label>
              <ScrollArea className="h-[500px] pr-3">
                <ul className="space-y-2">
                  {selCourses.map((s) => (
                    <li
                      key={s.id}
                      className="border rounded p-2 flex items-center justify-between space-x-4"
                    >
                      <label htmlFor={s.id}>
                        <span className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {s.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          Starts on: {s.startDate.toDateString()}
                        </span>
                      </label>
                      <button onClick={() => selectCourse(false, s)}>
                        <TrashCan className="w-8 h-8 p-1 text-gray-700 hover:cursor-pointer hover:bg-gray-300 hover:border rounded-full" />
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
      {selCourses.length > 0 && (
        <div className="pt-4">
          <Button onClick={submit} className="w-full">
            Register Courses
          </Button>
        </div>
      )}
    </div>
  );
}
