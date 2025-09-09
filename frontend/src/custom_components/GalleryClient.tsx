"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((m) => m.motion.div), { ssr: false });

const IMAGES = ["/gallery/s1.webp", "/gallery/s2.webp", "/gallery/s3.webp"];

export default function GalleryClient() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIdx((i) => (i + 1) % IMAGES.length),
    onSwipedRight: () => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length),
    trackMouse: true,
  });

  return (
    <div {...handlers}>
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src={IMAGES[idx]}
            width={1200}
            height={720}
            alt={`screenshot-${idx}`}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              aria-label={`go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`w-3 h-3 rounded-full ${i === idx ? "bg-primary-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </MotionDiv>
    </div>
  );
}
