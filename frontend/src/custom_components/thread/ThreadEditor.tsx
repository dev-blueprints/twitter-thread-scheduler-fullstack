"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, TrashIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { Card, CardContent } from "../ui/Card";
import { Thread, TweetContent, StockData } from "../../types";
import { useThreadStore } from "../../store/threadStore";
import { financeApi } from "../../lib/api";
import toast from "react-hot-toast";

interface ThreadEditorProps {
  thread?: Thread;
  onSave?: (thread: Thread) => void;
}

interface ThreadFormData {
  title: string;
  tweets: { content: string }[];
  scheduled_at?: string;
}

const ThreadEditor: React.FC<ThreadEditorProps> = ({ thread, onSave }) => {
  const { createThread, updateThread, updateCurrentThreadContent } = useThreadStore();
  const [stockData, setStockData] = useState<Record<string, StockData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ThreadFormData>({
    defaultValues: {
      title: thread?.title || "",
      tweets: thread?.content?.map((tweet) => ({ content: tweet.content })) || [{ content: "" }],
      scheduled_at: thread?.scheduled_at || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tweets",
  });

  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);
  const tweetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (lastAddedIndex !== null && tweetRefs.current[lastAddedIndex]) {
      tweetRefs.current[lastAddedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setLastAddedIndex(null); // reset so it won't re-run
    }
  }, [fields, lastAddedIndex]);

  useEffect(() => {
    if (thread) {
      reset({
        title: thread.title || "",
        tweets: thread.content?.map((tweet) => ({ content: tweet.content })) || [{ content: "" }],
        scheduled_at: thread.scheduled_at || "",
      });
    }
  }, [thread, reset]);

  const watchedTweets = watch("tweets");

  // Auto-fetch stock data
  useEffect(() => {
    const extractStockSymbols = (text: string) => {
      const regex = /\$([A-Z]{1,5})/g;
      const matches = text.match(regex);
      return matches ? matches.map((m) => m.slice(1)) : [];
    };

    const allContent = watchedTweets.map((t) => t.content).join(" ");
    const symbols = extractStockSymbols(allContent);

    if (symbols.length > 0) {
      const newSymbols = symbols.filter((s) => !stockData[s]);
      if (newSymbols.length > 0) {
        financeApi
          .getMultipleStocks(newSymbols)
          .then((res) => {
            setStockData((prev) => ({ ...prev, ...res.data }));
          })
          .catch((err) => console.error("Error fetching stock data:", err));
      }
    }
  }, [watchedTweets, stockData]);

  const onSubmit = async (data: ThreadFormData) => {
    setIsLoading(true);
    try {
      const threadContent: TweetContent[] = data.tweets.map((tweet, i) => ({
        id: `tweet-${i}`,
        content: tweet.content,
        order: i,
        type: "text",
      }));

      const threadData = {
        title: data.title,
        content: threadContent,
        scheduled_at: data.scheduled_at || null,
      };

      let savedThread;
      if (thread?.id) {
        await updateThread(thread.id, threadData);
        savedThread = { ...thread, ...threadData };
      } else {
        savedThread = await createThread(threadData);
      }

      if (savedThread) {
        updateCurrentThreadContent(threadContent);
        onSave?.(savedThread);
        toast.success(thread?.id ? "Thread updated!" : "Thread created!");
      }
    } catch {
      toast.error("Failed to save thread");
    } finally {
      setIsLoading(false);
    }
  };

  const addTweet = () => {
    append({ content: "" });
    setLastAddedIndex(fields.length); // the new index

    setTimeout(() => {
      const lastField = document.querySelector(
        `[name="tweets.${fields.length}.content"]`
      ) as HTMLElement;
      if (lastField) {
        lastField.scrollIntoView({ behavior: "smooth", block: "center" });
        lastField.focus();
      }
    }, 50);
  };
  const removeTweet = (i: number) => fields.length > 1 && remove(i);

  const insertStockData = (symbol: string, idx: number) => {
    const stock = stockData[symbol];
    if (stock) {
      const current = watchedTweets[idx].content;
      const stockInfo = `${stock.symbol}: ${stock.price} (${
        stock.change >= 0 ? "+" : ""
      }${stock.change_percent.toFixed(2)}%)`;
      setValue(`tweets.${idx}.content`, current + " " + stockInfo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl mx-auto p-6"
    >
      {/* ✅ Page Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {thread?.id ? "Edit Thread" : "Create New Thread"}
        </h1>
        <Button type="button" variant="outline" onClick={addTweet}>
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Tweet
        </Button>
      </div>

      <Card className="shadow-sm border rounded-2xl">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Thread Title</label>
              <input
                type="text"
                placeholder="A descriptive title for your thread"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            {/* Tweets Section */}
            <div className="space-y-6">
              <label className="block text-sm font-medium text-gray-600">Thread Content</label>

              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    ref={(el) => {
                      tweetRefs.current[index] = el;
                    }}
                    initial={
                      index === lastAddedIndex
                        ? { opacity: 0, y: 12, scale: 0.95, backgroundColor: "#fef9c3" }
                        : { opacity: 1, y: 0, scale: 1, backgroundColor: "#ffffff" }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1, backgroundColor: "#ffffff" }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      backgroundColor: { duration: 1.5 },
                    }}
                    className="relative rounded-lg p-2"
                  >
                    <div className="flex items-start space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-medium"
                      >
                        {index + 1}
                      </motion.div>

                      <div className="flex-1 space-y-2">
                        <textarea
                          placeholder={
                            index === 0 ? "Start your thread..." : "Continue your thread..."
                          }
                          rows={3}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          {...register(`tweets.${index}.content`, {
                            required: "Tweet content is required",
                            maxLength: {
                              value: 280,
                              message: "Tweet must be 280 characters or less",
                            },
                          })}
                        />
                        {errors.tweets?.[index]?.content && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.tweets[index]?.content?.message}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{watchedTweets[index]?.content?.length || 0}/280 characters</span>
                          {fields.length > 1 && (
                            <motion.div whileTap={{ scale: 0.9 }}>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTweet(index)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          )}
                        </div>

                        {/* Stock data suggestions */}
                        {Object.keys(stockData).length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(stockData).map(([symbol, data]) => (
                              <motion.button
                                key={symbol}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => insertStockData(symbol, index)}
                                className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition"
                              >
                                <ChartBarIcon className="w-3 h-3 mr-1" />${symbol}: ${data.price} (
                                {data.change >= 0 ? "+" : ""}
                                {data.change_percent.toFixed(2)}%)
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Schedule Publication (Optional)
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                {...register("scheduled_at")}
              />
              <p className="text-xs text-gray-400 mt-1">Leave empty to save as draft</p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ✅ Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-56 right-0 bg-white border-t shadow-md py-3 px-6 flex justify-between items-center">
        <div className="flex items-baseline gap-1">
          <span className="text-gray-500 text-sm font-medium">Total tweets:</span>
          <span className="text-gray-900 text-base font-semibold">3</span>
        </div>
        <div className="flex space-x-3">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {thread?.id ? "Update Thread" : "Save Thread"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreadEditor;
