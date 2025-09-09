"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log("logging in using firebase auth");
    // const ret = await signInWithEmailAndPassword(getAuth(firebaseapp), data.username, data.password);
    // console.log("login done, ret is : ", ret);
    const success = await login(data);
    console.log("LoginForm :: success after login call is : ", success);
    if (success) {
      console.log("LoginForm :: router push to /dashboard");
      router.push("/dashboard");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border"
      >
        <h2 className="text-xl font-semibold text-center mb-2">
          Sign in to <span className="text-indigo-600">FinanceThread</span>
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Create and schedule professional finance threads
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
              })}
              error={errors.username?.message}
            />
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />
          </div>

          {/* <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-indigo-600 text-white py-2 rounded-md shadow hover:shadow-md transition"
          >
            Sign In
          </motion.button> */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full py-3 text-base"
            isLoading={false}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account? &nbsp;
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
