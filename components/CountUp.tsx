"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LangProvider";
import { formatNumber } from "@/lib/format";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({ value, prefix = "", suffix = "", className, duration = 950 }: CountUpProps) {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);
  const latestDisplay = useRef(0);
  latestDisplay.current = display;

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      previous.current = value;
      return;
    }

    const from = previous.current;
    if (from === value) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = from + (value - from) * eased;
      setDisplay(currentVal);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        previous.current = value;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      previous.current = latestDisplay.current;
    };
  }, [duration, reduceMotion, value]);

  return (
    <span className={className}>
      {prefix}
      {formatNumber(display, lang)}
      {suffix}
    </span>
  );
}
