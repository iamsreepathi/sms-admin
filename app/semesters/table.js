import DataTable from "@/components/data-table";

const columns = [
  {
    accessorKey: "name",
    header: "Semester Title",
  },
  {
    accessorKey: "active",
    header: "Is Active?",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
];

export default function SemestersTable({ data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
