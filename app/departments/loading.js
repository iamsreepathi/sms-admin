import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(12)].map((e, i) => (
        <div key={i}>
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
