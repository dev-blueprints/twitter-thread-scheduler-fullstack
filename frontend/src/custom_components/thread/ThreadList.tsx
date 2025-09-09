"use client";
import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Thread } from "../../types";
import { useThreadStore } from "../../store/threadStore";

const ThreadList: React.FC = () => {
  const { threads, isLoading, fetchThreads, publishThread } = useThreadStore();

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusIcon = (status: Thread["status"]) => {
    switch (status) {
      case "draft":
        return <PencilIcon className="w-4 h-4 text-gray-500" />;
      case "scheduled":
        return <ClockIcon className="w-4 h-4 text-blue-500" />;
      case "published":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case "publishing":
        return (
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        );
      case "failed":
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Thread["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "scheduled":
        return "bg-indigo-100 text-indigo-700";
      case "published":
        return "bg-green-100 text-green-700";
      case "publishing":
        return "bg-indigo-100 text-indigo-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handlePublish = async (threadId: number) => {
    await publishThread(threadId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            {/* Custom SVG illustration (feather + paper) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-full h-full text-indigo-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 48 L56 8" strokeLinecap="round" />
              <path d="M8 56 L56 16" strokeLinecap="round" />
              <path d="M12 60 L52 20" strokeLinecap="round" />
              <circle cx="20" cy="44" r="3" fill="currentColor" />
            </svg>
          </motion.div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">No threads yet</h3>
          <p className="text-gray-500 mb-6">Start creating your first thread today 🚀</p>
          <Link href="/dashboard/threads/new">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary">Create Thread</Button>
            </motion.div>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div className="space-y-4" variants={listVariants} initial="hidden" animate="visible">
      {threads.map((thread) => (
        <motion.div key={thread.id} variants={cardVariants}>
          <Card className="hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{thread.title}</h3>

                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        thread.status
                      )}`}
                    >
                      {getStatusIcon(thread.status)}
                      <span className="ml-1 capitalize">{thread.status}</span>
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {thread.content[0]?.content || "No content"}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{thread.content.length} tweets</span>
                    <span>•</span>
                    <span>Created {formatDistanceToNow(new Date(thread.created_at))} ago</span>
                    {thread.scheduled_at && (
                      <>
                        <span>•</span>
                        <span>
                          Scheduled for {formatDistanceToNow(new Date(thread.scheduled_at))}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Link href={`/dashboard/threads/${thread.id}`}>
                    <Button variant="ghost" size="sm">
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href={`/dashboard/threads/${thread.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                  </Link>

                  {thread.status === "draft" && (
                    <Button variant="primary" size="sm" onClick={() => handlePublish(thread.id)}>
                      Publish
                    </Button>
                  )}

                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ThreadList;
