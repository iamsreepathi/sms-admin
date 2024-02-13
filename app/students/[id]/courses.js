"use client";
import CourseCard from "@/components/course-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { getSemesterCourses } from "./actions";
import { useParams } from "next/navigation";
import CardSkeleton from "@/components/skeleton-card";

export default function TheCourses({ semesters, data, selected }) {
  const { id } = useParams();
  const [sem, setSem] = useState(selected.id);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState(data);
  const onSelect = async (option) => {
    setSem(option);
    setLoading(true);
    const res = await getSemesterCourses(id, option);
    setCourses(res);
    setLoading(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          id="semester"
          value={sem}
          onValueChange={(opt) => onSelect(opt)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a category</SelectLabel>
              {semesters.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {loading &&
            [...Array(6)].map((i, idx) => (
              <Card>
                <CardHeader>
                  <CardSkeleton key={idx} />
                </CardHeader>
              </Card>
            ))}
          {!loading && courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </CardContent>
    </Card>
  );
}
