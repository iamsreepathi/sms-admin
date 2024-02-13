import { Label } from "@radix-ui/react-dropdown-menu";
import TheStar from "./icons/star";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import RightArrow from "./icons/right-arrow";

export default function CourseCard({ course }) {
  return (
    <Card key={course.id}>
      <img
        src="/images/course.jpeg"
        alt={course.name}
        className="object-contain rounded-t"
      />
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.teacherName}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex items-center space-x-2">
          <TheStar className="w-4 h-4 text-yellow-500" fill="#fbbf24" />
          <Label className="font-semibold">
            {Math.round((course.overallRating * 100) / course.ratings) / 100}
          </Label>
          <Label className="text-sm text-gray-400">
            ({course.ratings} ratings)
          </Label>
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="rounded-full hover:bg-gray-100 text-gray-400 p-2"
        >
          <RightArrow />
        </Link>
      </CardContent>
    </Card>
  );
}
