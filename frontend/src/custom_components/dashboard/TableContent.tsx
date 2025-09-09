import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Thread = {
  id: string;
  title: string;
  url: string;
};

interface PublishedThreadsProps {
  threads: Thread[];
}

const TableContent: React.FC<PublishedThreadsProps> = ({ threads }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Published Threads</h2>

      {threads.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center border border-dashed rounded-lg">
          <span className="text-5xl mb-3">📭</span>
          <p className="text-muted-foreground">
            No published threads yet. Once you publish, they’ll show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Card key={thread.id} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-lg">
                  <a
                    href={thread.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {thread.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{thread.url}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableContent;
