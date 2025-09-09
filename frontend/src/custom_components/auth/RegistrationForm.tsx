// src/components/auth/RegisterForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Card, CardContent, CardHeader } from "../ui/Card";
import Link from "next/link";
import { motion } from "framer-motion";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  full_name?: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { isLoading } = useAuthStore();
  const { register: registerUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const watchPassword = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...userData } = data;
    const success = await registerUser(userData);
    if (success) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg p-10 bg-white shadow-xl rounded-2xl border border-gray-100"
      >
        <div className="w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
            <p className="mt-3 text-base text-gray-600">
              Join the community of finance content creators
            </p>
          </div>

          {/* Form Card */}
          <Card className="shadow-md border border-gray-100">
            {/* <CardHeader className="pb-3">
              <h3 className="text-xl font-semibold text-gray-900">Sign Up</h3>
            </CardHeader> */}
            <CardContent className="pt-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                />

                <Input
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  error={errors.username?.message}
                />

                <Input
                  label="Full Name (Optional)"
                  type="text"
                  placeholder="Enter your full name"
                  {...register("full_name")}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={errors.password?.message}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === watchPassword || "Passwords do not match",
                  })}
                  error={errors.confirmPassword?.message}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full py-3 text-base"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
