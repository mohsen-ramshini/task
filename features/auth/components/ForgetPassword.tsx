import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "flag-icons/css/flag-icons.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/ui/select";
import { Button } from "../../../src/components/ui/button";
import { countries } from "../../../lib/constants";
import { useForgetPassword } from "../api/use-forget-password";
import { toast } from "sonner";

type Country = typeof countries[number];

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={
      `w-full px-3 py-2 rounded-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 border border-transparent transition-all duration-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none ` +
      className
    }
    {...props}
  />
));

const ForgetPassword = () => {
  const [tab, setTab] = useState<"email" | "mobile">("email");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const forgetPasswordMutation = useForgetPassword();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    let data = { ...values };
    if (tab === "mobile") {
      data.phone = `${selectedCountry.code} ${values.phone?.replace(/\D/g, "")}`;
    }
    await new Promise((res) => setTimeout(res, 2000));
    forgetPasswordMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
      onSuccess: async () => {
        await new Promise((res) => setTimeout(res, 1200));
      },
      onError: async () => {
        await new Promise((res) => setTimeout(res, 1200));
      },
    });
  };

  return (
    <div className="w-5/6 h-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 mt-12 text-left direction-ltr">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-900 font-semibold dark:text-gray-400 mt-2">
          Chose the reset password method and get the code
        </p>
      </div>
      {/* Tab selection for method */}
      <div className="flex mb-6 relative border-b border-gray-200 dark:border-zinc-700">
        <button
          type="button"
          className={`flex-1 py-2 text-center relative bg-transparent focus:outline-none ${
            tab === "email"
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setTab("email")}
        >
          Email
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-center relative bg-transparent focus:outline-none ${
            tab === "mobile"
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-300"
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
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 2.5,
          }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {tab === "email" ? (
          <div>
            <label className="text-gray-600 block mb-1">Email</label>
            <CustomInput
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-xs text-red-500">Required</span>
            )}
          </div>
        ) : (
          <div>
            <label className="text-gray-600 block mb-1">Phone number</label>
            <div className="flex">
              <div className="flex items-center">
                <Select
                  value={selectedCountry.code}
                  onValueChange={(val) => {
                    const country = countries.find((c) => c.code === val);
                    if (country) setSelectedCountry(country);
                  }}
                >
                  <SelectTrigger className="rounded-l-md w-32 min-w-fit px-2 py-2 bg-white dark:bg-zinc-900 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-sm">
                    <span
                      className={`fi fi-${selectedCountry.flag} rounded-full w-5 h-5 mr-2`}
                    />
                    <SelectValue>
                      {selectedCountry.code}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <span
                          className={`fi fi-${country.flag} rounded-full w-5 h-5 mr-2`}
                        />
                        {country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CustomInput
                dir="ltr"
                type="tel"
                placeholder="Enter your mobile number"
                {...register("phone", { required: true })}
                className="rounded-l-none w-full"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-red-500">Required</span>
            )}
          </div>
        )}
        <Button
          type="submit"
          className="w-full text-white font-semibold text-sm mt-4 bg-[#569ce9] hover:bg-[#569ce9] hover:opacity-80 transition-opacity py-3 rounded-lg flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Send Reset Password Code"
          )}
        </Button>
        <div className="flex justify-center items-center gap-2 mt-4 text-sm">
          <span>Back to</span>
          <a
            href="/auth/sign-in"
            className="dark:text-blue-400  hover:underline font-semibold"
            tabIndex={0}
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;