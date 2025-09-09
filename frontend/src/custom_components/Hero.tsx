import { useEffect, useState } from "react";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 py-20">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
            <span className="font-semibold">Create</span>{" "}
            <span className="text-primary">Professional Finance Threads</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            Build engaging threads with live market data, professional templates, and built-in
            compliance. Everything you need to grow your financial audience.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium shadow hover:shadow-lg transition">
              Start Creating
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
              Sign In
            </button>
          </div>
        </div>

        <div
          className="relative w-full h-[500px] flex justify-center items-center"
          style={{
            transform: `translateY(${offsetY * 0.2}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <img
            src="/hero-mockup.png"
            alt="FinanceThread preview"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
