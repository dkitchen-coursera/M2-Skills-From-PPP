import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { SegmentsScreen } from "@/components/segments/segments-screen";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  if (!params.persona) {
    const preserved = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") preserved.set(key, value);
    }
    return <SegmentsScreen preservedQuery={preserved.toString()} />;
  }

  return (
    <Suspense>
      <AppShell />
    </Suspense>
  );
}
