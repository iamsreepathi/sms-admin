import PageTitle from "@/components/page-title";
import { getSemesters } from "./actions";
import DataSearch from "@/components/data-search";
import SemestersTable from "./table";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateSemester from "./update-semester";
import DialogBox from "@/components/dialog-box";

export const metadata = {
  title: "Semesters",
  description: "List of semesters",
};

export default async function TheSemesters() {
  const { semesters, activeSem, futureSems } = await getSemesters();
  return (
    <div className="space-y-4">
      <PageTitle title="Semesters" />
      <div className="flex items-center justify-between">
        <DataSearch placeholder="John Doe" />
        <DialogBox
          description="Select a new semester to activate and close current semester."
          title="Activate/Close a semester"
          btntext="Close Semester"
          Component={
            <UpdateSemester activeSem={activeSem} futureSems={futureSems} />
          }
        />
      </div>
      <ScrollArea className="min-h-[75vh]">
        <SemestersTable data={semesters} />
      </ScrollArea>
    </div>
  );
}
