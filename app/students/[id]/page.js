import { getSemesterCourses, getStudent } from "./actions";
import DetailCard from "@/components/detail-card";
import TheCourses from "./courses";
import AdditionalDetails from "@/components/additonal-details";
import PageTitle from "@/components/page-title";

export const metadata = {
  title: "Student Details",
  description: "Student details",
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
    accessorKey: "createdAt",
    header: "Created On",
  },
];

const addtnlCols = [
  {
    accessorKey: "grade",
    header: "Overall Grade",
  },
];

export default async function TheStudent({ params }) {
  const { student, semesters } = await getStudent(params.id);
  const selected = semesters.find((s) => s.active) ?? {};
  const courses = await getSemesterCourses(student.id, selected.id);
  return (
    <div className="space-y-4">
      <PageTitle title="Student Details" />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <DetailCard detail={student} columns={columns} />
        <AdditionalDetails
          cols={addtnlCols}
          data={{ grade: "3.4 GPA" }}
          title="Student Grades"
        />
      </div>
      <TheCourses semesters={semesters} selected={selected} data={courses} />
    </div>
  );
}
