"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "@/custom_components/ui/Button";
import ThreadList from "@/custom_components/thread/ThreadList";

export default function ThreadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Threads</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create, schedule, and manage your Twitter threads
          </p>
        </div>
        <Link href="/dashboard/threads/new">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" className="flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              New Thread
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      <ThreadList />
    </div>
  );
}
