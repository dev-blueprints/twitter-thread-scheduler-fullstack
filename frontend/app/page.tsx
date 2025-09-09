"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Button from "@/custom_components/ui/Button";
import {
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Hero from "@/custom_components/Hero";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
  ssr: false,
});

const features = [
  {
    name: "Finance Templates",
    description:
      "Pre-built templates for company threads, earnings commentary, and portfolio updates — polished and compliance-ready.",
    icon: DocumentTextIcon,
  },
  {
    name: "Live Market Data",
    description: "Embed real-time prices, charts, and market snapshots directly into your threads.",
    icon: ChartBarIcon,
  },
  {
    name: "Smart Scheduling",
    description: "Queue and schedule posts for peak engagement with timezone-aware publishing.",
    icon: ClockIcon,
  },
  {
    name: "Compliance Ready",
    description:
      "Built-in disclaimers, record-keeping, and template controls to help you stay compliant.",
    icon: ShieldCheckIcon,
  },
];

const testimonials = [
  {
    name: "Sarah Lee",
    title: "Equity Analyst",
    text: "FinanceThread reduced my production time and helped me publish compliant, high-quality threads consistently.",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
  },
  {
    name: "David Kim",
    title: "Investment Blogger",
    text: "The templates and scheduling features drove higher engagement and saved hours every week.",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    name: "Priya Sharma",
    title: "Wealth Advisor",
    text: "Seamless data integrations and clean, readable output — perfect for client-facing insights.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans">
      {/* HEADER */}
      <header className="bg-white/70 backdrop-blur-md border-b border-slate-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg  flex items-center justify-center shadow-md">
                <span className="sr-only">FinanceThread</span>
                <Image src="/fintwit.png" alt="FinanceThread" width={32} height={32} />
              </div>

              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  FinanceThread
                </span>
              </h1>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-xl font-semibold text-slate-600 hover:text-slate-900"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-xl font-semibold text-slate-600 hover:text-slate-900"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-xl font-semibold text-slate-600 hover:text-slate-900"
              >
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login" className="inline-flex">
                  <Button variant="outline" className="h-10 px-5 text-sm font-semibold">
                    Sign In
                  </Button>
                </Link>

                <Link href="/register" className="inline-flex">
                  <Button variant="primary" className="h-10 px-5 text-sm font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((s) => !s)}
              >
                {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden py-3 border-t border-slate-100">
              <div className="flex flex-col space-y-2 px-1">
                <Link
                  href="#features"
                  className="px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  Pricing
                </Link>
                <div className="flex items-center gap-3 px-1 pt-3">
                  <Link href="/login" className="w-full">
                    <Button variant="ghost" className="w-full h-11">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button variant="primary" className="w-full h-11">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-32 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
              Everything for finance creators — polished.
            </h2>
            <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-12">
              Templates, live market data, and scheduling built for clarity and compliance — so you
              can focus on insights.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, idx) => (
                <MotionDiv
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.06, duration: 0.42 }}
                  className="rounded-2xl p-6 md:p-8 border border-slate-100 bg-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-tr from-blue-50 to-indigo-50 mx-auto">
                    <feature.icon className="w-7 h-7 text-blue-600" aria-hidden />
                  </div>

                  <h3 className="mt-6 text-lg leading-6 font-semibold text-slate-900 text-center">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 text-center">{feature.description}</p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-center text-4xl font-extrabold text-slate-900 mb-4">
              Loved by finance creators
            </h2>
            <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-12">
              Real creators, measurable results — see why professionals prefer FinanceThread.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, idx) => (
                <MotionDiv
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform"
                  aria-label={`Testimonial from ${t.name}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 relative rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.title}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-slate-700 leading-relaxed text-base">“{t.text}”</p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-center py-20"
        >
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to create your first thread?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join creators who publish faster, look professional, and stay compliant.
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link href="/register">
                <Button
                  variant="primary"
                  className="px-6 py-3 rounded-lg shadow-md text-sm font-semibold"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/demo" className="self-center">
                <Button variant="ghost" className="px-5 py-3 text-sm">
                  Request a demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg  flex items-center justify-center">
                <Image src="/favicon.png" alt="FinanceThread" width={32} height={32} />
              </div>
              <p className="text-slate-700 font-semibold">FinanceThread</p>
            </div>

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} FinanceThread. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
