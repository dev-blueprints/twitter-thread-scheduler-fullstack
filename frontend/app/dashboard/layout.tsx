import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/custom_components/auth/ProtectedRoute";
import DashboardLayoutNew from "@/custom_components/dashboard/DashboardLayoutNew";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanceThread - Create Engaging Finance Twitter Threads",
  description:
    "Professional tool for finance creators to build, schedule, and publish Twitter threads with stock data integration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedRoute>
          <DashboardLayoutNew>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
          </DashboardLayoutNew>
        </ProtectedRoute>
      </body>
    </html>
  );
}
