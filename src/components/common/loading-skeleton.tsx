"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?:
    | "credit-score"
    | "credit-cards"
    | "risk-alert"
    | "dialog-tabs"
    | "table"
    | "card-grid"
    | "list";
  className?: string;
  count?: number;
}

/**
 * Unified loading skeleton component for consistent loading states across the application.
 *
 * Variants:
 * - credit-score: Loading state for credit score display with spinner and centered layout
 * - credit-cards: Loading state for credit information cards (2-column grid)
 * - risk-alert: Loading state for risk alert section
 * - dialog-tabs: Loading state for dialog content with tabs
 * - table: Loading state for table rows
 * - card-grid: Loading state for card grid layouts
 * - list: Loading state for simple list items
 */
export function LoadingSkeleton({
  variant = "list",
  className,
  count = 3,
}: LoadingSkeletonProps) {
  if (variant === "credit-score") {
    return (
      <div className={cn("text-center mb-8", className)}>
        <div className="flex items-center justify-center mb-4">
          <Spinner className="w-16 h-16 text-blue-600" />
        </div>
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-16 w-32 mx-auto mb-2" />
        <Skeleton className="h-6 w-40 mx-auto mb-4" />
        <Skeleton className="h-2 w-32 mx-auto mb-4" />
        <Skeleton className="h-6 w-64 mx-auto" />
      </div>
    );
  }

  if (variant === "credit-cards") {
    return (
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", className)}
      >
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "risk-alert") {
    return (
      <div
        className={cn(
          "bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8",
          className,
        )}
      >
        <Skeleton className="h-6 w-40 mb-3" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    );
  }

  if (variant === "dialog-tabs") {
    return (
      <div className={cn("space-y-4", className)}>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-2", className)}>
        {[...Array(count)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (variant === "card-grid") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  // Default: list variant
  return (
    <div className={cn("space-y-2", className)}>
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
}
