"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ThreadTemplateCard from "./ThreadTemplatesCard";

const templates = [
  {
    id: "finance",
    name: "Finance Analysis",
    description: "Structure for market updates, stock breakdowns, or financial insights.",
    sample: [
      "📊 Market Update: Key highlights for today",
      "$AAPL closed strong with +3% gains",
      "My take: Why tech stocks might rally this week",
    ],
  },
  {
    id: "listicle",
    name: "Listicle Thread",
    description: "Perfect for sharing curated lists, tips, or resources.",
    sample: [
      "💡 7 tips that made me a better programmer",
      "1. Write code for humans, not just machines",
      "2. Learn how to debug effectively",
    ],
  },
  {
    id: "story",
    name: "Storytelling",
    description: "Narrative-driven format to explain lessons through stories.",
    sample: [
      "A few years ago, I made a huge mistake in my startup journey...",
      "It cost us $50,000, but here’s what I learned 🧵",
    ],
  },
  {
    id: "educational",
    name: "Educational",
    description: "Step-by-step breakdown for teaching or explaining a concept.",
    sample: [
      "Ever wondered how blockchain works? Let’s break it down 👇",
      "1. It’s a distributed ledger...",
      "2. Each block is cryptographically linked...",
    ],
  },
];

interface ThreadTemplateListProps {
  onSelectTemplate: (template: any) => void;
}

const ThreadTemplateList: React.FC<ThreadTemplateListProps> = ({ onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {templates.map((tpl, index) => (
        <motion.div
          key={tpl.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: index * 0.1, // stagger animation
            duration: 0.4,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl shadow-sm bg-white"
        >
          <ThreadTemplateCard template={tpl} onSelect={onSelectTemplate} />
        </motion.div>
      ))}
    </div>
  );
};

export default ThreadTemplateList;
