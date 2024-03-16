"use client";
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
import { getCourseStudents } from "./actions";
import { useParams } from "next/navigation";
import CardSkeleton from "@/components/skeleton-card";
import DataTable from "@/components/data-table";
import Link from "next/link";
import RightArrow from "@/components/icons/right-arrow";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Link
          aria-label={data.name}
          href={`students/${data.id}`}
          variant="icon"
        >
          <RightArrow className="w-6 h-6 rounded-full hover:bg-gray-300 p-1" />
        </Link>
      );
    },
  },
];

export default function TheStudents({ semesters, data, selected }) {
  const { id } = useParams();
  const [sem, setSem] = useState(selected.id);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(data);
  const onSelect = async (option) => {
    setSem(option);
    setLoading(true);
    const res = await getCourseStudents(id, option);
    setStudents(res);
    setLoading(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students Enrolled</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          id="semester"
          value={sem}
          onValueChange={(opt) => onSelect(opt)}
        >
          <SelectTrigger className="w-full md:w-[280px]">
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
        <div>
          {loading &&
            [...Array(6)].map((i, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardSkeleton key={idx} />
                </CardHeader>
              </Card>
            ))}
          {!loading && !students.length && (
            <p>0 students enrolled in this course.</p>
          )}
          {!loading && students.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Total {students.length} students enrolled in this course this
                semester.
              </p>
              <DataTable columns={columns} data={students} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
