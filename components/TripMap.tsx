"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { Day } from "@/lib/types";
import { useLang } from "@/i18n/LangProvider";

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
  loading: () => <MapSkeleton />
});

function MapSkeleton() {
  const { t } = useLang();
  return (
    <div className="glass flex h-[520px] items-center justify-center rounded-[1.75rem] p-4 print:hidden">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-teal/30 bg-teal/10 text-teal">
          <Loader2 size={22} className="animate-spin" aria-hidden="true" />
        </span>
        <p className="text-xs font-medium text-white/55">{t.result.map.loading}</p>
        <div className="skeleton h-2 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function TripMap({ days }: { days: Day[] }) {
  return <MapClient days={days} />;
}
