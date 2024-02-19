"use client";
import { useState } from "react";
import { getTeachers } from "./actions";
import DataTable from "@/components/data-table";
import ThePagination from "@/components/the-pagination";
import Link from "next/link";
import RightArrow from "@/components/icons/right-arrow";

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
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "admission",
    header: "Admitted On",
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

export default function TeachersTable({ data, token }) {
  const [teachers, setTeachers] = useState(data || []);

  // next and prev tokens to paginate results
  const [nextToken, setNextToken] = useState(null);
  const [nextNextToken, setNextNextToken] = useState(token);
  const [prevTokens, setPrevTokens] = useState([]);

  // Indicates if the results have next/previous page
  const hasNext = !!nextNextToken;
  const hasPrev = prevTokens.length;
  const count = teachers.length;

  const next = async () => {
    const { data, key } = await getTeachers(nextNextToken);
    setTeachers(data);
    setPrevTokens((prev) => [...prev, nextToken]);
    setNextToken(nextNextToken);
    setNextNextToken(key);
  };

  const prev = async () => {
    const prevToken = prevTokens.pop();
    const { data, key } = await getTeachers(prevToken);
    setTeachers(data);
    setNextToken(prevToken);
    setPrevTokens([...prevTokens]);
    setNextNextToken(key);
  };

  return (
    <div>
      <DataTable columns={columns} data={teachers} />
      <ThePagination
        hasNext={hasNext}
        hasPrev={hasPrev}
        count={count}
        next={next}
        prev={prev}
      />
    </div>
  );
}
