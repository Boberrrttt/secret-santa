"use client";

import { useEffect } from "react";

// Mirrors scroll position into --sy (unitless px) so CSS can drive parallax layers.
// ponytail: one root variable, capped past the hero; per-section vars if more parallax lands lower down
export function ScrollVar() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      document.documentElement.style.setProperty("--sy", String(Math.min(scrollY, innerHeight * 1.5)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
