"use client";
import CourseCard from "@/components/course-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TheCourses({ courses }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Courses</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </CardContent>
    </Card>
  );
}
