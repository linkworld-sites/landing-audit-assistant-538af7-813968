"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Two stacked copies of the same clip crossfade into each other just before
 * the playing copy ends, so the loop never shows the hard cut a bare `loop`
 * attribute produces on non-loop-perfect generated footage.
 */
export function VideoLoop({ src, className = "" }: { src: string; className?: string }) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const [aActive, setAActive] = useState(true);
  const switching = useRef(false);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    const handle = () => {
      const active = aActive ? a : b;
      const idle = aActive ? b : a;
      if (switching.current || !active.duration) return;
      if (active.currentTime >= active.duration - 1) {
        switching.current = true;
        idle.currentTime = 0;
        void idle.play();
        setAActive((v) => !v);
        window.setTimeout(() => {
          active.pause();
          active.currentTime = 0;
          switching.current = false;
        }, 900);
      }
    };
    a.addEventListener("timeupdate", handle);
    b.addEventListener("timeupdate", handle);
    return () => {
      a.removeEventListener("timeupdate", handle);
      b.removeEventListener("timeupdate", handle);
    };
  }, [aActive]);

  return (
    <div className={className}>
      <video
        ref={aRef}
        src={src}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
        style={{ opacity: aActive ? 1 : 0 }}
      />
      <video
        ref={bRef}
        src={src}
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
        style={{ opacity: aActive ? 0 : 1 }}
      />
    </div>
  );
}
