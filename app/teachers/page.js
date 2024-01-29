import PageTitle from "@/components/page-title";
import { getTeachers } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TeachersTable from "./table";

export default async function TheStudents() {
  const { data, key, error } = await getTeachers();

  return (
    <div className="space-y-4">
      <PageTitle title="Teachers" />
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
