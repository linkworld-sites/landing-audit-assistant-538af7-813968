"use client";

import { useEffect } from "react";
import { track } from "@/lib/funnel";

export function PricingViewTracker() {
  useEffect(() => {
    track("pricing_view");
  }, []);
  return null;
}
