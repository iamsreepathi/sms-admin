import TheUsers from "@/components/icons/user";
import UserGroup from "@/components/icons/user-group";
import PageTitle from "@/components/page-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCardData, getUpcomingEvents } from "./actions";
import BuildingLibrary from "@/components/icons/building-library";
import BookOpen from "@/components/icons/book-open";
import { Calendar } from "@/components/ui/calendar";
import CalendarDays from "@/components/icons/calendar-days";
import { ScrollArea } from "@/components/ui/scroll-area";

const icons = {
  categories: <TheUsers className="w-5 h-5 text-gray-400" />,
  courses: <BookOpen className="w-5 h-5 text-gray-400" />,
  departments: <BuildingLibrary className="w-5 h-5 text-gray-400" />,
  teachers: <UserGroup className="w-5 h-5 text-gray-400" />,
  students: <UserGroup className="w-5 h-5 text-gray-400" />,
};

export const metadata = {
  title: "SMS Dashboard",
  description: "Shool management system dashboard",
};

export default async function Home() {
  const cards = await getCardData();
  const events = await getUpcomingEvents();
  return (
    <div className="space-y-4">
      <PageTitle title="Dashboard" />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <Card key={i}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total {c.model}
              </CardTitle>
              {icons[c.model] ?? (
                <UserGroup className="w-5 h-5 text-gray-400" />
              )}
            </CardHeader>
            <CardContent>
              <h2 className="font-bold text-xl">+{c.count.toString()}</h2>
              <CardDescription>{c.shortDesc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>List of upcoming events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-0 md:flex md:items-start md:justify-start md:space-x-4">
            <ScrollArea className="h-96 w-full md:w-2/3 pr-3">
              <ul className="text-xs grid grid-cols-1 gap-2">
                {events.map((e, i) => (
                  <li
                    className="border rounded-md hover:bg-gray-50 hover:cursor-pointer flex items-center divide-x"
                    key={i}
                  >
                    <div className="p-2 flex flex-col items-center w-20">
                      <CalendarDays />
                      <p className="text-black">{e.monthDay}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-gray-500">{e.start.toDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <div className="flex">
              <Calendar
                mode="single"
                className="rounded-md border shadow"
                selected={new Date()}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
