"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayoutNew from "@/custom_components/dashboard/DashboardLayoutNew";
import ThreadEditor from "@/custom_components/thread/ThreadEditor";
import ProtectedRoute from "@/custom_components/auth/ProtectedRoute";
import { Thread } from "@/types";
import { useThreadStore } from "@/store/threadStore";
import ThreadView from "@/custom_components/thread/ThreadView";

export default function NewThreadPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [selectedThread, setSelectedThread] = useState<Thread | undefined>();

  const { threads } = useThreadStore();

  useEffect(() => {
    const thread = threads.find((item) => item.id.toString() === id);
    setSelectedThread(thread);
  }, [threads]);

  useEffect(() => {}, [selectedThread]);

  const handleSave = (thread: Thread) => {
    router.push("/dashboard/threads");
  };

  return (
    <div className="space-y-6">
      <ThreadView />
    </div>
  );
}
