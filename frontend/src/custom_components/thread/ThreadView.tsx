"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/custom_components/ui/Card";
import { Thread, TweetContent } from "@/types";
import Button from "@/custom_components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { CalendarIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useThreadStore } from "@/store/threadStore";
import { motion } from "framer-motion";

const ThreadView: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { threads } = useThreadStore();
  const [thread, setThread] = useState<Thread | undefined>();

  useEffect(() => {
    const found = threads.find((item) => item.id.toString() === id);
    setThread(found);
  }, [threads, id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-3xl mx-auto p-4"
    >
      {/* Back + Title */}
      <motion.div variants={itemVariants} className="flex items-center mb-6 space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back
        </Button>
        {thread && (
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{thread.title}</h2>
        )}
      </motion.div>

      {/* Thread Card */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-sm hover:shadow-md transition-shadow rounded-2xl">
          <CardHeader>
            {thread?.scheduled_at && (
              <motion.div
                variants={itemVariants}
                className="flex items-center text-sm text-gray-500"
              >
                <CalendarIcon className="w-4 h-4 mr-1" />
                Scheduled for{" "}
                {new Date(thread.scheduled_at).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </motion.div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Tweets */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {thread?.content?.map((tweet: TweetContent, index: number) => (
                <motion.div
                  key={tweet.id}
                  variants={itemVariants}
                  className="flex items-start space-x-3 border-b pb-4 last:border-none last:pb-0"
                >
                  {/* Tweet index bubble */}
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm">
                    {index + 1}
                  </div>

                  {/* Tweet content */}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap text-gray-800 hover:text-gray-900 transition-colors text-base leading-relaxed">
                      {tweet.content}
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      {tweet.content.length}/280 chars
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tweet Count */}
            <motion.div variants={itemVariants} className="pt-2 text-sm text-gray-500 text-right">
              Total tweets: {thread?.content?.length || 0}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sticky Action Bar */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-0 left-56 right-0 border-t bg-white shadow-lg p-4 flex items-center justify-end space-x-3 z-50"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/threads/${thread?.id || 0}/edit`)}
          >
            Edit Thread
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => thread && console.log("Publish thread:", thread.id)}
          >
            {thread?.scheduled_at ? "Update Schedule" : "Publish"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ThreadView;
