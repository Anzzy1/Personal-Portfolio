"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlayIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Wraps a project cover with a "Play video demo" button. Clicking it plays the
 * video in place over the cover; when it ends (or is closed) the cover returns.
 * The video only starts downloading once someone presses play.
 */
export function VideoCover({
  video,
  title,
  children,
}: {
  video: { src: string; poster: string; duration?: string };
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    ref.current?.play().catch(() => {});
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <div className="relative">
      {children}

      <AnimatePresence>
        {playing ? (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 overflow-hidden rounded-[12px] bg-black"
          >
            <video
              ref={ref}
              src={video.src}
              poster={video.poster}
              controls
              playsInline
              onEnded={() => setPlaying(false)}
              className="size-full object-contain"
              aria-label={`${title} demo video`}
            />
            <button
              type="button"
              onClick={() => setPlaying(false)}
              aria-label="Close video"
              className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              <XIcon weight="bold" className="size-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="play"
            type="button"
            onClick={() => setPlaying(true)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label={`Play the ${title} video demo`}
            className="group absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-black/70 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgb(0_0_0/0.7)] ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/85 sm:bottom-5"
          >
            <span className="relative grid size-8 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2s]" />
              <span className="relative grid size-8 place-items-center rounded-full bg-white text-[#141416] transition-transform duration-300 group-hover:scale-110">
                <PlayIcon weight="fill" className="ml-0.5 size-3.5" />
              </span>
            </span>
            Play video demo
            {video.duration && <span className="font-normal text-white/65">· {video.duration}</span>}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
