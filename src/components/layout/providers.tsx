"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { ChatProvider } from "@/components/ai/chat-provider";
import { PointerEffects } from "@/components/ui/pointer-effects";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <PointerEffects />
        <ChatProvider>{children}</ChatProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
