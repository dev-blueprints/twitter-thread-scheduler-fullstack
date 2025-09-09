"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((m) => m.motion.div), { ssr: false });

export default function HeroClient() {
  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <section className="bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10 py-20">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              Create Professional <span className="text-primary-600">Finance Threads</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Build engaging Twitter threads with real-time stock data, templates, scheduling and
              compliance management — made for finance creators.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <Link
                href="/register"
                className="inline-flex items-center px-5 py-3 rounded-md bg-primary-600 text-white font-medium shadow"
              >
                Start creating
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-5 py-3 rounded-md border border-gray-200"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/hero-mockup.webp"
              alt="FinanceThread mockup"
              width={640}
              height={420}
              priority
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>
    </MotionDiv>
  );
}
