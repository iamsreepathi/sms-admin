import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TheLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
        {[...Array(15)].map((i, idx) => (
          <Card key={idx}>
            <CardHeader>
              <Skeleton className="h-4" />
              <Skeleton className="h-4 " />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
