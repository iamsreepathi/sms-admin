"use client";
import { Label } from "@/components/ui/label";
import ComboBox from "./combo-box";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTitle from "@/components/page-title";
import { useState } from "react";
import { getCoursesByCategory } from "./actions";
import TheStar from "@/components/icons/star";
import RightArrow from "@/components/icons/right-arrow";
import Link from "next/link";

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
      <div className="space-y-2">
        <Label htmlFor="category">Choose a category</Label>
        <ComboBox
          options={categories}
          selected={selected.id}
          onSelect={onSelect}
        />
      </div>
      <hr />
      <div className="space-y-4">
        <PageTitle title={`${selected.name} Course List`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {list.map((c) => (
            <Card key={c.id}>
              <img
                src="/images/course.jpeg"
                alt={c.name}
                className="object-contain rounded-t"
              />
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
                <CardDescription>{c.teacherName}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <TheStar className="w-4 h-4 text-yellow-500" fill="#fbbf24" />
                  <Label className="font-semibold">
                    {Math.round((c.overallRating * 100) / c.ratings) / 100}
                  </Label>
                  <Label className="text-sm text-gray-400">
                    ({c.ratings} ratings)
                  </Label>
                </div>
                <Link
                  href={`/courses/${c.id}`}
                  className="rounded-full hover:bg-gray-100 text-gray-400 p-2"
                >
                  <RightArrow />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
