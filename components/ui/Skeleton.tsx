import { cn } from "@/lib/cn"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white/10",
        className
      )}
      {...props}
    />
  )
}

export function WishSkeleton() {
  return (
    <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-md p-6 space-y-3">
      <div className="flex gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}
