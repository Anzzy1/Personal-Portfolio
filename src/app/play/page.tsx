import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Tetris } from "@/components/play/tetris";

export const metadata: Metadata = {
  title: "Play",
  description: "Take a break and play a round of Tetris.",
};

export default function PlayPage() {
  return (
    <>
      <PageHeader
        eyebrow="Play"
        title="Take a quick"
        accent="break."
        description="A classic round of Tetris. Stack smart, clear lines, and try to beat your best score."
      />
      <Reveal>
        <div className="mt-10">
          <Tetris />
        </div>
      </Reveal>
    </>
  );
}
