import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(8)].map((e, i) => (
              <div key={i}>
                <Skeleton className="h-14 rounded-xl" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
