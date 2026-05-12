import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 60%)`,
        mixBlendMode: "screen",
      }}
      aria-hidden
    />
  );
}
