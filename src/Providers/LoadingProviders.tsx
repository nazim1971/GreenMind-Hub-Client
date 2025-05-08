"use client";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export default function WithSuspense({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}