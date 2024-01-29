"use client";
import { useState } from "react";
import { getStudents } from "@/app/students/actions";
import DataTable from "@/components/data-table";
import ThePagination from "@/components/the-pagination";

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
    accessorKey: "dob",
    header: "Date of Birth",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "admission",
    header: "Admitted On",
  },
];

export default function StudentsTable({ data, token }) {
  const [students, setStudents] = useState(data || []);

  // next and prev tokens to paginate results
  const [nextToken, setNextToken] = useState(null);
  const [nextNextToken, setNextNextToken] = useState(token);
  const [prevTokens, setPrevTokens] = useState([]);

  // Indicates if the results have next/previous page
  const hasNext = !!nextNextToken;
  const hasPrev = prevTokens.length;
  const count = students.length;

  const next = async () => {
    const { data, key } = await getStudents(nextNextToken);
    setStudents(data);
    setPrevTokens((prev) => [...prev, nextToken]);
    setNextToken(nextNextToken);
    setNextNextToken(key);
  };

  const prev = async () => {
    const prevToken = prevTokens.pop();
    const { data, key } = await getStudents(prevToken);
    setStudents(data);
    setNextToken(prevToken);
    setPrevTokens([...prevTokens]);
    setNextNextToken(key);
  };

  return (
    <div>
      <DataTable columns={columns} data={students} />
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
