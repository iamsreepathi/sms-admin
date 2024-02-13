import CardSkeleton from "@/components/skeleton-card";
import { Card, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardSkeleton></CardSkeleton>
            </CardHeader>
          </Card>
        </CardHeader>
      </Card>
    </div>
  );
}
