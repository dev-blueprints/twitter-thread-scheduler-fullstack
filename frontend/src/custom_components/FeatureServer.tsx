import React from "react";
import {
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Finance Templates",
    description: "Ready-made thread templates for analysis & commentary.",
    icon: DocumentTextIcon,
  },
  {
    name: "Live Stock Data",
    description: "Embed real-time prices and charts into your threads.",
    icon: ChartBarIcon,
  },
  {
    name: "Smart Scheduling",
    description: "Queue and schedule threads for peak engagement.",
    icon: ClockIcon,
  },
  {
    name: "Compliance Ready",
    description: "Auto-disclaimers and compliance workflow built-in.",
    icon: ShieldCheckIcon,
  },
];

export default function FeaturesServer() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        Everything you need for finance content
      </h2>
      <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
        Powerful tools designed specifically for finance Twitter creators.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.name}
            className="text-center px-4 py-6 bg-white rounded-lg border border-gray-50 shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto">
              <f.icon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="mt-4 font-medium text-gray-900">{f.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
