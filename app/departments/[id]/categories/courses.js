"use client";
import { Label } from "@/components/ui/label";
import ComboBox from "./combo-box";
import PageTitle from "@/components/page-title";
import { useState } from "react";
import { getCoursesByCategory } from "./actions";
import DialogBox from "@/components/dialog-box";
import AddCourse from "./add-course";
import CourseCard from "@/components/course-card";

export default function TheCourses({ categories, courses, category }) {
  const [list, setList] = useState(courses);
  const [selected, setSelected] = useState(category);
  const onSelect = async (selOption) => {
    setSelected(categories.find((c) => c.id === selOption));
    const data = await getCoursesByCategory(selOption);
    setList(data);
  };
  return (
    <>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Label htmlFor="category">Choose a category</Label>
          <ComboBox
            options={categories}
            selected={selected.id}
            onSelect={onSelect}
          />
        </div>
        <div>
          <DialogBox
            btntext="Add Course"
            description="Add a new course here. Click submit button when you're done."
            title="Create a new course"
            Component={<AddCourse />}
          />
        </div>
      </div>

      <hr />
      <div className="space-y-4">
        <PageTitle title={`${selected.name} Course List`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {list.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </>
  );
}
