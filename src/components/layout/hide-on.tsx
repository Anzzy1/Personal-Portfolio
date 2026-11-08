"use client";

import { usePathname } from "next/navigation";

/** Renders children everywhere except on the given routes and their sub-pages */
export function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden = paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return hidden ? null : children;
}
