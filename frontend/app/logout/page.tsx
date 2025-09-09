"use client";
import React, { useEffect } from "react";
import LoginForm from "@/custom_components/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  });

  return <LoginForm />;
}
