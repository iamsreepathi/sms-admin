import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DetailCard({ detail, columns }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 items-center">
          <div>
            <img
              src="/images/profile.jpg"
              alt={detail.name}
              className="rounded-t"
            />
          </div>
          <div className="flex">
            <ul className="space-y-3 text-sm">
              {columns.map((c, idx) => (
                <li key={idx} className="grid grid-cols-3 md:grid-cols-2">
                  <p className="font-semibold col-span-2 md:col-span-1">
                    {c.header}:
                  </p>
                  <p>
                    {typeof detail[c.accessorKey] === "object"
                      ? detail[c.accessorKey].toDateString()
                      : detail[c.accessorKey]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul>
            <li className="flex justify-between">
              <p className="font-semibold">Overall Garde:</p>
              <p>3.4 GPA</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
