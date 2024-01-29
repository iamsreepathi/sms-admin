import { Button } from "./ui/button";

export default function ThePagination({ hasPrev, hasNext, prev, next, count }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button onClick={prev} variant="outline" size="sm" disabled={!hasPrev}>
        Previous
      </Button>
      <Button onClick={next} variant="outline" size="sm" disabled={!hasNext}>
        Next
      </Button>
    </div>
  );
}
