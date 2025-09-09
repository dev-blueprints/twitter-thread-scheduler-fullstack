"use client";
import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="animate-bounce">
        <Image
          src="/logo.png" // replace with your logo
          alt="FinanceThread Logo"
          width={80}
          height={80}
        />
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">FinanceThread</h1>
      <p className="mt-2 text-gray-500 text-sm">Preparing your workspace...</p>
    </div>
  );
}
