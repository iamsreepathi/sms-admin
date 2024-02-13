import PageTitle from "@/components/page-title";
import { getSemesterCourses, getStudent } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DetailCard from "@/components/detail-card";
import TheCourses from "./courses";

export default async function TheStudent({ params }) {
  const { student, semesters } = await getStudent(params.id);
  const columns = [
    {
      accessorKey: "name",
      header: "Full Name",
    },
    {
      accessorKey: "email",
      header: "Email Address",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
    },
    {
      accessorKey: "father",
      header: "Father",
    },
    {
      accessorKey: "mother",
      header: "Mother",
    },
    {
      accessorKey: "admission",
      header: "Admitted On",
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
    },
  ];
  const selected = semesters.find((s) => s.active) ?? {};
  const courses = await getSemesterCourses(student.id, selected.id);
  return (
    <div className="space-y-4">
      <DetailCard detail={student} columns={columns} />
      <TheCourses semesters={semesters} selected={selected} data={courses} />
    </div>
  );
}
