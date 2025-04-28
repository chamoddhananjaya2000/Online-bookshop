import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingBookDetails() {
  return (
    <div className="mt-8">
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-24 w-full mb-4" />
      <Skeleton className="h-16 w-full" />
    </div>
  )
}
