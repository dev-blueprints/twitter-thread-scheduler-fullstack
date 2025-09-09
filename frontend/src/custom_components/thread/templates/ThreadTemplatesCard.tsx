"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Button from "@/custom_components/ui/Button";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Thread } from "@/types";

interface ThreadTemplate {
  id: string;
  name: string;
  description: string;
  sample: string[];
}

interface ThreadTemplateCardProps {
  template: ThreadTemplate;
  onSelect: (template: ThreadTemplate) => void;
}

const ThreadTemplateCard: React.FC<ThreadTemplateCardProps> = ({ template, onSelect }) => {
  return (
    <Card className="bg-blue-50 border-blue-200 flex flex-col h-full hover:shadow-lg transition-all duration-200 border shadow-sm rounded-2xl transition-transform hover:shadow-md hover:-translate-y-1">
      <CardHeader className="shrink-0 border-b justify-between pb-2 space-y-0 pb-4 bg-green-50 rounded-t-2xl overflow-hidden h-20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{template.name}</h3>
          <SparklesIcon className="w-5 h-5 text-primary-500" />
        </div>
        <p className="text-sm text-gray-500 mt-1">{template.description}</p>
      </CardHeader>

      <CardContent className=" overflow-y-auto flex flex-col flex-1 mt-2 pt-4">
        {/* Preview sample tweets */}
        <div className="space-y-3">
          {template.sample.map((tweet, idx) => (
            <div key={idx} className="text-sm text-gray-700 border-l-2 pl-3 border-primary-200">
              {tweet}
            </div>
          ))}
        </div>

        <div className="mt-auto flex justify-end  pt-4 justify-end">
          <Button size="sm" variant="primary" onClick={() => onSelect(template)}>
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreadTemplateCard;
