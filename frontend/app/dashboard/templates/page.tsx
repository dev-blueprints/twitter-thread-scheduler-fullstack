"use client";
import React from "react";
import ThreadTemplateList from "@/custom_components/thread/templates/ThreadTemplatesList";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/custom_components/auth/ProtectedRoute";
import DashboardLayout from "@/custom_components/dashboard/DashboardLayout";

const TemplatePage = () => {
  const router = useRouter();

  const handleSelectTemplate = (template: any) => {
    router.push(`/dashboard/threads/new?template=${template.id}`);
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-center mb-8">Choose a Thread Template</h1>
      <ThreadTemplateList onSelectTemplate={handleSelectTemplate} />
    </div>
  );
};

export default TemplatePage;
