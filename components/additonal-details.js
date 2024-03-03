import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function AdditionalDetails({ title, cols = [], data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <ul className="space-y-1">
          {cols.map((c, idx) => (
            <li key={idx} className="flex justify-between">
              <p className="font-semibold">{c.header}:</p>
              <p className="break-words">
                {typeof data[c.accessorKey] === "object"
                  ? data[c.accessorKey].toDateString()
                  : data[c.accessorKey]}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
