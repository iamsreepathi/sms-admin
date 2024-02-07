import PageTitle from "@/components/page-title";
import { getAvailableHods, getDepartments } from "./actions";
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

export default async function TheDepartments() {
  const deps = await getDepartments();
  const teachers = await getAvailableHods();
  return (
    <div className="space-y-4">
      <PageTitle title="Departments" />
      <div className="flex items-center justify-between">
        <DataSearch placeholder="John Doe" />
        <DialogBox
          btntext="Add Department"
          description="Add a new department here. Click submit button when you're done."
          title="Create a new department"
          Component={<AddDepartment teachers={teachers} />}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {deps.map((d) => (
          <Card key={d.id} className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <CardTitle>{d.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
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
