import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "flag-icons/css/flag-icons.min.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../src/components/ui/form";
import { Button } from "../../../src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/ui/select";
import { countries } from "../../../lib/constants";
import { useSignup } from "../api/use-sign-up";
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

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [riskChecked, setRiskChecked] = useState(false);
  const [tncChecked, setTncChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const signupMutation = useSignup();

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    const data = {
      ...values,
      phone: selectedCountry.code + " " + (values.phone || ""),
    };
    // مکث ۲ ثانیه‌ای قبل از ارسال
    await new Promise((res) => setTimeout(res, 2000));
    signupMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
      onSuccess: async () => {
        await new Promise((res) => setTimeout(res, 1200));
        window.location.href = '/auth/sign-in';
      },
      onError: async () => {
        await new Promise((res) => setTimeout(res, 1200));
      }
    });
  };

  return (
    <div className="w-5/6 h-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 mt-12 text-left direction-ltr">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">
          Sign Up
        </h1>
        <p>Welcome to the Fortuna Markets</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-gray-600 block mb-1">First Name</label>
            <CustomInput
              {...register("firstName", { required: true })}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="text-xs text-red-500">Required</span>}
          </div>
          <div className="w-1/2">
            <label className="text-gray-600 block mb-1">Last Name</label>
            <CustomInput
              {...register("lastName", { required: true })}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="text-xs text-red-500">Required</span>}
          </div>
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Email</label>
          <CustomInput
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-xs text-red-500">Required</span>}
        </div>
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
            <CustomInput
              dir="ltr"
              type="tel"
              placeholder="Enter your mobile number"
              {...register("phone", { required: true })}
              className="rounded-l-none w-full"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
          </div>
          {errors.phone && <span className="text-xs text-red-500">Required</span>}
        </div>
        <div>
          <label className="text-gray-600 block mb-1">Password</label>
          <div className="relative">
            <CustomInput
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600 dark:text-gray-400"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.password && <span className="text-xs text-red-500">Required</span>}
        </div>
        <div className="space-y-2 mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={riskChecked}
              onChange={e => setRiskChecked(e.target.checked)}
              required
            />
            I have read and agree to the <a href="#" className="text-blue-600 underline">RISK DISCLAIMER</a>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={tncChecked}
              onChange={e => setTncChecked(e.target.checked)}
              required
            />
            I have read and agree to the <a href="#" className="text-blue-600 underline">T&Cs</a>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={marketingChecked}
              onChange={e => setMarketingChecked(e.target.checked)}
            />
            I would like to receive news, analysis, marketing, etc.<br/>( optional )
          </label>
        </div>
        <Button
          type="submit"
          className="w-full text-white font-semibold text-lg mt-4 bg-[#569ce9] hover:bg-[#569ce9] hover:opacity-80 transition-opacity py-3 rounded-lg flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Create Account"
          )}
        </Button>
        <div className="flex justify-center items-center gap-2 mt-4 text-sm">
          <span>Already have an account?</span>
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

export default SignupForm;