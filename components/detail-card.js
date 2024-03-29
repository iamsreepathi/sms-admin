import Image from "next/image";
import { Card, CardContent } from "./ui/card";

export default function DetailCard({ detail, columns }) {
  return (
    <Card className="xl:col-span-2">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 items-center">
        <div>
          <Image
            src="/images/profile.jpg"
            alt={detail.name}
            width={400}
            height={0}
            className="rounded"
          />
        </div>
        <div>
          <ul className="space-y-3 text-sm">
            {columns.map((c, idx) => (
              <li key={idx} className="flex">
                <p className="font-semibold w-1/2">{c.header}:</p>
                <p className="break-words w-1/2">
                  {!c.avg
                    ? typeof detail[c.accessorKey] === "object"
                      ? detail[c.accessorKey].toDateString()
                      : detail[c.accessorKey]
                    : Math.round(
                        (detail[c.accessorKey] / detail[c.avgKey]) * 100
                      ) / 100}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
