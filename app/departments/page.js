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

export default async function TheDepartments() {
  const deps = await getDepartments();
  return (
    <div className="space-y-4">
      <PageTitle title="Departments" />
      <div className="grid grid-cols-3 gap-4">
        {deps.map((d) => (
          <Card key={d.id} className="flex p-4 items-start space-x-2">
            <div className="space-y-2">
              <CardTitle>{d.name}</CardTitle>
              <CardDescription>{d.shortDesc}</CardDescription>
            </div>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
