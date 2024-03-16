import PageTitle from "@/components/page-title";
import { getDepartments } from "./actions";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import VerticalElipsis from "@/components/icons/vertical-elipsis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DataSearch from "@/components/data-search";
import DialogBox from "@/components/dialog-box";
import AddDepartment from "./add-department";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Departments",
  description: "List of departments",
};

export default async function TheDepartments() {
  const deps = await getDepartments();
  return (
    <div className="space-y-4">
      <PageTitle title="Departments" />
      <div className="md:flex md:items-center md:justify-between space-y-2">
        <DataSearch placeholder="John Doe" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Link href="/semesters">
            <Button className="w-full">List Semesters</Button>
          </Link>
          <DialogBox
            btntext="Add Department"
            description="Add a new department here. Click submit button when you're done."
            title="Create a new department"
            Component={<AddDepartment />}
          />
        </div>
      </div>
      <div className="grid gridcols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deps.map((d) => (
          <Card key={d.id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <CardTitle>{d.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger aria-label="Dropdown menu">
                    <VerticalElipsis className="w-6 h-6 hover:bg-gray-100 rounded-full hover:cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="p-2">
                    <DropdownMenuItem>
                      <Link href={`/departments/${d.id}`}>View Department</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/departments/${d.id}/categories`}>
                        Courses Offered
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{d.shortDesc}</CardDescription>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
