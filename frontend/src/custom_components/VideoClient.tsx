"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((m) => m.motion.div), { ssr: false });

export default function VideoClient() {
  const [open, setOpen] = useState(false);

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Watch how FinanceThread works</h3>
        <p className="mt-2 text-gray-600">
          Short demo of the workflow — templates, scheduling, and publishing.
        </p>

        <div className="mt-8 relative max-w-3xl mx-auto">
          <Image
            src="/video-thumb.webp"
            width={1200}
            height={675}
            alt="video thumb"
            className="rounded-xl shadow-lg"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="play demo"
          >
            <div className="bg-white/90 rounded-full p-4 shadow hover:scale-105 transition-transform">
              ▶
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-3xl mx-4 bg-black/90 rounded-md overflow-hidden">
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Demo video"
                allow="autoplay; fullscreen"
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </MotionDiv>
  );
}
