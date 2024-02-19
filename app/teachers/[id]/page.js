import AdditionalDetails from "@/components/additonal-details";
import { getTeacher } from "./actions";
import DetailCard from "@/components/detail-card";
import TheCourses from "./courses";

export const metadata = {
  title: "Teacher Details",
  description: "Teacher details",
};

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
    accessorKey: "subject",
    header: "Primary Subject",
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
  },
];

const addtnlCols = [
  {
    accessorKey: "name",
    header: "Dept. Name",
  },
  {
    accessorKey: "phone",
    header: "Phone No.",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "line1",
    header: "Address",
  },
];

export default async function TheTeacher({ params }) {
  const teacher = await getTeacher(params.id);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <DetailCard detail={teacher} columns={columns} />
        <AdditionalDetails
          title="Department Details"
          cols={addtnlCols}
          data={teacher.department}
        />
      </div>
      <TheCourses courses={teacher.courses} />
    </div>
  );
}
