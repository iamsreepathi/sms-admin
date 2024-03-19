import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentSemesters } from "./actions";
import RegisterCourses from "./register-courses";

export default async function CourseRegistration({ params }) {
  const { id } = params;
  const { student, semesters } = await getStudentSemesters(id);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterCourses student={student} semesters={semesters} />
        </CardContent>
      </Card>
    </div>
  );
}
