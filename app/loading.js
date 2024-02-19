import CardSkeleton from "@/components/skeleton-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((c, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>List of upcoming events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((c, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardSkeleton />
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
