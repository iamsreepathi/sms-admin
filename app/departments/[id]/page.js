import PageTitle from "@/components/page-title";
import { notFound } from "next/navigation";
import { getDepartment } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThePhone from "@/components/icons/phone";
import TheEnvelope from "@/components/icons/envelope";
import RightArrow from "@/components/icons/right-arrow";

export default async function TheDepartment({ params }) {
  const depId = Number(params.id);
  if (!depId) return notFound();
  const dept = await getDepartment(depId);
  if (!dept) return notFound();
  return (
    <div className="space-y-4">
      <section className="bg-[url('/images/department-cover.jpg')] flex items-center justify-center h-96">
        <div className="space-y-4 w-1/2">
          <PageTitle
            className="text-white text-2xl"
            title={`${dept.name} Department`}
          />
          <p className="text-white text-sm">{dept.description}</p>
          <Button variant="secondary">
            <Link href={`/departments/${depId}/categories`}>View Courses</Link>
          </Button>
        </div>
      </section>
      <section className="space-y-4">
        <PageTitle title="Contact Us" />
        <div className="grid gap-2 grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>{dept.line1}</li>
                <li>{dept.line2}</li>
                <li>
                  {dept.city}, {dept.region}
                </li>
                <li>{dept.postalCode}</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li>Monday - Friday</li>
                <li>8:00 AM - 5.00 PM</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex space-x-2 items-center">
                  <ThePhone className="w-4 h-4" />
                  <Link href={`tel:${dept.email}`} className="hover:underline">
                    +1 {dept.phone}
                  </Link>
                </li>
                <li className="flex space-x-2 items-center">
                  <TheEnvelope className="w-4 h-4" />
                  <Link
                    href={`mailto:${dept.email}`}
                    className="hover:underline"
                  >
                    {dept.email}
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Programmes Offered</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-6 gap-4">
            {dept.categories.map((c) => (
              <Button
                key={c.id}
                className="rounded-full flex justify-between"
                variant="secondary"
              >
                <span>{c.name}</span>
                <RightArrow className="w-6 h-6 p-1 rounded-full hover:bg-gray-300" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}