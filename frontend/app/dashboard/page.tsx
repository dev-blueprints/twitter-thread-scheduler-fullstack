"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CalendarClock,
  FileText,
  Send,
  ClipboardPlusIcon,
  FolderSearchIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const stats = [
    {
      title: "Drafts",
      value: 12,
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      bg: "bg-blue-100",
      accent: "text-blue-700",
    },
    {
      title: "Published",
      value: 45,
      icon: <Send className="h-5 w-5 text-green-600" />,
      bg: "bg-green-100",
      accent: "text-green-700",
    },
    {
      title: "Scheduled",
      value: 8,
      icon: <CalendarClock className="h-5 w-5 text-purple-600" />,
      bg: "bg-purple-100",
      accent: "text-purple-700",
    },
    // {
    //   title: "Missed",
    //   value: 3,
    //   icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    //   bg: "bg-red-100",
    //   accent: "text-red-700",
    // },
  ];

  const options = [
    {
      title: "Create New",
      icon: <ClipboardPlusIcon className="h-6 w-6 text-indigo-600" />,
      gradient: "from-indigo-500 to-blue-600",
      border: "border-indigo-200",
      text: "text-gray-50",
    },
    {
      title: "Browse Templates",
      icon: <FolderSearchIcon className="h-6 w-6 text-gray-600" />,
      gradient: "from-gray-800 to-black",
      border: "border-gray-200",
      text: "text-gray-50",
    },
  ];

  // const threads = [{ id: "1", title: "Thread 1", url: "" }];
  const threads: any[] = [];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your content, track performance, and take action quickly.
          </p>
        </motion.div>

        {/* Stats Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
                <Card className="rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition bg-white">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className={`text-sm font-semibold ${stat.accent}`}>
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-gray-900 text-center">
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {stat.value > 1 ? `Total ${stat.title.toLowerCase()}` : `1 ${stat.title}`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Action Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {options.map((option, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <Card
                  className={`bg-gradient-to-r ${option.gradient} bg-white rounded-xl shadow-sm border ${option.border} hover:shadow-md transition`}
                >
                  <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="p-3 rounded-lg bg-gray-50 flex items-center justify-center">
                      {option.icon}
                    </div>
                    <span className={`text-base font-medium tracking-wide ${option.text}`}>
                      {option.title}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Threads Section */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">
            Published Threads
          </h2>

          {threads.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-white shadow-sm">
              <span className="text-5xl mb-4">📭</span>
              <p className="text-gray-500 text-lg max-w-md">
                No published threads yet. Once you publish, they’ll show up here.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-4"
            >
              {threads.map((thread) => (
                <motion.div key={thread.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Card className="hover:shadow-md transition rounded-xl border border-gray-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        <a
                          href={thread.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-indigo-600"
                        >
                          {thread.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-500">
                      {thread.url || "No URL available"}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
