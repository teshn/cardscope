"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type CardTiltCanvasProps = {
  imageUrl: string;
  title: string;
};

export function CardTiltCanvas({ imageUrl, title }: CardTiltCanvasProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const transform = useMemo(() => {
    return `perspective(960px) rotateX(${position.y * -8}deg) rotateY(${position.x * 8}deg)`;
  }, [position.x, position.y]);

  return (
    <div className="relative rounded-[2px] border-2 border-[var(--ink)] bg-[var(--paper)] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
        Drag To Inspect Reflection
      </p>
      <div
        className="relative mt-3 h-[320px] w-full cursor-grab overflow-hidden rounded-[2px] border border-[var(--ink)] bg-[var(--paper-strong)] active:cursor-grabbing"
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          const normalizedX = (event.clientX - box.left) / box.width;
          const normalizedY = (event.clientY - box.top) / box.height;
          setPosition({
            x: (normalizedX - 0.5) * 2,
            y: (normalizedY - 0.5) * 2,
          });
        }}
        onPointerLeave={() => setPosition({ x: 0, y: 0 })}
      >
        <div
          className="absolute inset-0 m-auto h-[280px] w-[200px] transition-transform duration-150"
          style={{ transform }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-[2px] border border-[var(--ink)] object-cover"
            sizes="(max-width: 768px) 90vw, 200px"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.12) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
