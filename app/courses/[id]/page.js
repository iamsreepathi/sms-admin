import AdditionalDetails from "@/components/additonal-details";
import DetailCard from "@/components/detail-card";
import { getCourse } from "./actions";

export const metadata = {
  title: "Course Details",
  description: "Course details",
};

const columns = [
  {
    accessorKey: "name",
    header: "Course Name",
  },
  {
    accessorKey: "credits",
    header: "Credits",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "ratings",
    header: "Total Ratings",
  },
  {
    accessorKey: "overallRating",
    header: "Overall Rating",
    avg: true,
    avgKey: "ratings",
  },
];

const teacherCols = [
  {
    accessorKey: "name",
    header: "Dept. Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
  },
  {
    accessorKey: "admission",
    header: "Admitted On",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
];

export default async function TheTeacher({ params }) {
  const course = await getCourse(params.id);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <DetailCard detail={course} columns={columns} />
        <AdditionalDetails
          cols={teacherCols}
          data={course.teacher}
          title="Instructor Details"
        />
      </div>
    </div>
  );
}
