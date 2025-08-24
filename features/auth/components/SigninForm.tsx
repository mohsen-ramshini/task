import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../src/components/ui/form";
import { Button } from "../../../src/components/ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "../types/schema";
import type { LoginFormValues } from "../types/auth";
import { motion } from "framer-motion";
import "flag-icons/css/flag-icons.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/ui/select";
import { countries } from "../../../lib/constants";
import { useSignIn } from "../api/use-sign-in";


type Country = typeof countries[number];

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={
      `w-full px-3 py-2 rounded-xl bg-[#f5f5f5] dark:bg-[#404040] text-gray-900 dark:text-gray-100 border border-transparent transition-all duration-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none ` +
      className
    }
    {...props}
  />
));

export const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState<"email" | "mobile">("email");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const loginMutation = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    let data = { ...values };
    if (tab === "mobile") {
      data.username = `${selectedCountry.code} ${values.username.replace(/\D/g, "")}`;
    }
    await new Promise((res) => setTimeout(res, 2000));
    loginMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
      onSuccess: async (result: any) => {
        if (result?.access_token) {
          localStorage.setItem('access_token', result.access_token);
        }
        if (result?.refresh_token) {
          localStorage.setItem('refresh_token', result.refresh_token);
        }
        await new Promise((res) => setTimeout(res, 1200));
        window.location.href = '/dashboard';
      },
      onError: async () => {
        await new Promise((res) => setTimeout(res, 1200));
      }
    });
  };
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="w-5/6 h-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 mt-12 text-left direction-ltr">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">
          Sign In
        </h1>
        <p className="text-sm text-gray-900 font-semibold dark:text-gray-400 mt-2">
          Please enter your credentials to sign in!
        </p>
      </div>

      {/* Tab selection for login method with underline */}
      <div className="flex mb-6 relative border-b border-gray-200 dark:border-zinc-700">
        <button
          type="button"
          className={`flex-1 py-2 text-center relative bg-transparent focus:outline-none ${
            tab === "email" ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setTab("email")}
        >
          Email
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-center relative bg-transparent focus:outline-none ${
            tab === "mobile" ? "text-blue-600" : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setTab("mobile")}
        >
          Phone
        </button>
        <motion.div
          layout
          layoutId="tab-underline"
          className={`absolute bottom-0 h-[3px] bg-blue-600 rounded-t transition-all`}
          style={{
            left: tab === "email" ? "0%" : "50%",
            width: "50%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30, duration: 2.5 }}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          {/* Email or Mobile field based on tab selection */}
          {tab === "email" ? (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Email</FormLabel>
                  <FormControl>
                    <CustomInput
                      dir="ltr"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Phone number</FormLabel>
                  <FormControl>
                    <div className="flex">
                      {/* shadcn Select for country */}
                      <div className="flex items-center">
                        <Select
                          value={selectedCountry.code}
                          onValueChange={(val) => {
                            const country = countries.find((c) => c.code === val);
                            if (country) setSelectedCountry(country);
                          }}
                        >
                          <SelectTrigger className="rounded-l-md w-32 min-w-fit px-2 py-2 bg-white dark:bg-zinc-900 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm">
                            <span className={`fi fi-${selectedCountry.flag} rounded-full w-5 h-5 mr-2`} />
                            <SelectValue>
                              {selectedCountry.code}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent side="bottom">
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <span className={`fi fi-${country.flag} rounded-full w-5 h-5 mr-2`} />
                                {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Phone Input (custom input) */}
                      <CustomInput
                        dir="ltr"
                        type="tel"
                        placeholder="Enter your mobile number"
                        {...field}
                        value={field.value.replace(/^\+\d+\s?/, "")}
                        onChange={e => {
                          // Always keep the value as country code + phone
                          field.onChange(`${selectedCountry.code} ${e.target.value.replace(/\D/g, "")}`);
                        }}
                        className="rounded-l-none w-full"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CustomInput
                      dir="ltr"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 dark:text-gray-400"
                      tabIndex={-1}
                    >
                      {!showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <a
            href="/auth/forget-password"
            className="block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline text-right"
          >
            Forgot password?
          </a>

          <Button
            type="submit"
            className="w-full text-white font-semibold mt-2 bg-[#569ce9] hover:bg-[#569ce9] hover:opacity-80 transition-opacity flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              `Sign In with ${tab === "email" ? "Email" : "Phone"}`
            )}
          </Button>
          <div className="flex justify-center items-center gap-2 mt-4 text-sm">
            <span>Don’t have an account yet?</span>
            <a
              href="/auth/sign-up"
              className=" dark:text-blue-400 hover:underline font-semibold"
              tabIndex={0}
            >
              Sign Up
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
};