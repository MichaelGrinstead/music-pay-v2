"use client";

import { Button } from "../Ui/Button";
import { Input } from "../Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../Ui/LoadingSpinner";
import PasswordInput from "../Ui/PasswordInput";
import { ClerkError } from "@/types";
import { useToast } from "../../hooks/useToast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";

interface SignInData {
  email: string;
  password: string;
}

const defaultValues: SignInData = {
  email: "",
  password: "",
};

const SignInDataSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function SignInForm() {
  const router = useRouter();
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(SignInDataSchema),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    reset,
  } = methods;
  const { signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const pathname = usePathname();
  console.log("sign in form", pathname);
  console.log("sign in form", isSignedIn);

  const handleSignIn = async () => {
    setIsLoading(true);
    const loginData = getValues();
    try {
      const completeSignIn = await signIn?.create({
        identifier: loginData.email,
        password: loginData.password,
      });

      if (completeSignIn?.status !== "complete") {
        setIsLoading(false);
        console.error(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn?.status === "complete") {
        if (setActive) {
          await setActive({ session: completeSignIn.createdSessionId });
          router.push("/");
          setIsLoading(false);
          reset(defaultValues);
        }
      }
    } catch (e: unknown) {
      console.error("Error:", JSON.stringify(e, null, 2));
      const error = e as ClerkError;
      for (let i = 0; i < error.errors.length; i++) {
        if (error.errors[i]?.message === "Identifier is invalid.") {
          toast({
            title: "Sign Up Error",
            description: "Invalid Email Address",
          });
        } else if (
          error.errors[i]?.message !== "Enter email address." &&
          error.errors[i]?.message !== "Enter password."
        ) {
          toast({
            title: "Sign Up Error",
            description: error.errors[i]?.message,
          });
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col items-center justify-between p-24 mt-32 gap-8"
      >
        <h3 className="text-3xl">Sign In</h3>
        <Input
          {...register("email")}
          className={
            errors.email && "placeholder-white placeholder:font-semibold"
          }
          placeholder={errors.email ? errors.email.message : "Email"}
          onChange={() => clearErrors("email")}
        />
        <PasswordInput
          {...register("password")}
          className={
            errors.password && "placeholder-white placeholder:font-semibold"
          }
          placeholder={errors.password ? errors.password.message : "Password"}
          onChange={() => clearErrors("password")}
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
        />
        <Button variant="defaultMedium">
          {" "}
          {isLoading ? <LoadingSpinner /> : "Sign In"}
        </Button>
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <h3>Don&apos;t have an account?</h3>
          <Link
            className="hover:underline hover:text-white text-sm "
            href={"./sign-up"}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
