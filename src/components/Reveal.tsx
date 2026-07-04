"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "left" | "right" | "zoom";
  as?: "div" | "section" | "figure" | "span";
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
