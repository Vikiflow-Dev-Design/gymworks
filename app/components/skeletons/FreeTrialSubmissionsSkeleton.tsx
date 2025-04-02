import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FreeTrialSubmissionsSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Search bar skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 flex-1" />
        </div>

        {/* Table header skeleton */}
        <div className="grid grid-cols-5 gap-4 py-3 border-b">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-4 w-24" />
            ))}
        </div>

        {/* Table rows skeleton */}
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 py-4 border-b">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
      </div>
    </Card>
  );
}
