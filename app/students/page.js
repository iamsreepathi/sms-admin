import PageTitle from "@/components/page-title";
import { getStudents } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StudentsTable from "./table";

export default async function TheStudents() {
  const { data, key, error } = await getStudents();

  return (
    <div className="space-y-4">
      <PageTitle title="Students" />
      {error && (
        <Alert className="space-y-2" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
          <Button asChild variant="destructive" size="sm">
            <Link href="/students">Try Again</Link>
          </Button>
        </Alert>
      )}
      <StudentsTable data={data} token={key} />
    </div>
  );
}
