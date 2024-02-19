import PageTitle from "@/components/page-title";
import { getTeachers } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TeachersTable from "./table";
import DataSearch from "@/components/data-search";
import AddTeacher from "./add-teacher";
import DialogBox from "@/components/dialog-box";
import { getDepartments } from "../departments/actions";

export const metadata = {
  title: "Teachers",
  description: "List of teachers",
};

export default async function TheTeachers() {
  const [teachers, departments] = await Promise.all([
    getTeachers(),
    getDepartments(),
  ]);
  const { data, key, error } = teachers;
  const deps = departments.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  return (
    <div className="space-y-4">
      <PageTitle title="Teachers" />
      <div className="flex items-center justify-between">
        <DataSearch placeholder="John Doe" />
        <DialogBox
          description="Add a new teacher profile here. Click submit button when you're done."
          title="Create a teacher"
          btntext="Add Teacher"
          Component={<AddTeacher deps={deps} />}
        />
      </div>
      {error && (
        <Alert className="space-y-2" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
          <Button asChild variant="destructive" size="sm">
            <Link href="/teachers">Try Again</Link>
          </Button>
        </Alert>
      )}
      <TeachersTable data={data} token={key} />
    </div>
  );
}
