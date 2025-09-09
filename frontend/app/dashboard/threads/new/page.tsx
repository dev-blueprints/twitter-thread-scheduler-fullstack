"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/custom_components/dashboard/DashboardLayout";
import ThreadEditor from "@/custom_components/thread/ThreadEditor";
import ProtectedRoute from "@/custom_components/auth/ProtectedRoute";
import { Thread } from "@/types";

export default function NewThreadPage() {
  const router = useRouter();

  const handleSave = (thread: Thread) => {
    router.push("/dashboard/threads");
  };

  return (
    <div className="space-y-6">
      <ThreadEditor onSave={handleSave} />
    </div>
  );
}
