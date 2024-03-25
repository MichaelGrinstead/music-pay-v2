"use client";

import { Button } from "../Ui/Button";
import { Input } from "../Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAddNewUser } from "@/hooks/useAddNewUser";
import PasswordInput from "../Ui/PasswordInput";
import { LoadingSpinner } from "../Ui/LoadingSpinner";
import { ClerkError } from "@/types";
import { useToast } from "@/hooks/useToast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignUpData {
  username: string;
  email: string;
  password: string;
  code: string;
}

const SignUpDataSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const CodeSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

const defaultValues: SignUpData = {
  username: "",
  email: "",
  password: "",
  code: "",
};

export default function SignUpForm() {
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(false);

  const methods = useForm({
    defaultValues,
    resolver: zodResolver(isVerifying ? CodeSchema : SignUpDataSchema),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    reset,
  } = methods;

  const { signUp, setActive } = useSignUp();
  const { isSignedIn } = useUser();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { addNewUser } = useAddNewUser();

  const handleSignUp = async () => {
    const signUpData = getValues();
    try {
      await signUp?.create({
        username: signUpData.username,
        emailAddress: signUpData.email,
        password: signUpData.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsVerifying(true);
    } catch (e) {
      console.error("Error:", JSON.stringify(e, null, 2));
      const error = e as ClerkError;
      for (let i = 0; i < error.errors.length; i++) {
        if (error.errors[i]?.message === "is invalid") {
          toast({
            title: "Sign Up Error",
            description: "Invalid Email Address",
          });
        } else if (
          error.errors[i]?.message !== "Enter email address." &&
          error.errors[i]?.message !== "Enter username." &&
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

  const handleVerify = async () => {
    setIsLoading(true);
    const signUpData = getValues();

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: signUpData.code,
      });
      if (completeSignUp?.status !== "complete") {
        setIsLoading(false);
        throw new Error("Login not complete");
      }

      if (completeSignUp?.status === "complete") {
        if (setActive) {
          await setActive({ session: completeSignUp.createdSessionId });
          await addNewUser(signUpData.username);
          setIsLoading(false);
          reset(defaultValues);
          router.push("/");
        }
      }
    } catch (e) {
      console.error("Error:", JSON.stringify(e, null, 2));

      const error = e as ClerkError;
      toast({
        title: "Sign Up Error",
        description: error.errors[0]?.message,
      });
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
      {isVerifying ? (
        <form
          onSubmit={handleSubmit(handleVerify)}
          className="flex flex-col items-center justify-between p-24 mt-32 gap-8"
        >
          <h3 className="text-3xl">Verification Code</h3>
          <Input
            {...register("code")}
            className={
              errors.code && "placeholder-white placeholder:font-semibold"
            }
            placeholder={errors.code ? errors.code.message : "Code"}
            onChange={() => clearErrors("code")}
          />
          <h3 className="text-gray-500">Enter the code sent to your email</h3>
          <Button variant="defaultMedium">
            {isLoading ? <LoadingSpinner /> : "Complete"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col items-center justify-between p-24 mt-32 gap-8"
        >
          <h3 className="text-3xl">Sign Up</h3>
          <Input
            {...register("username")}
            className={
              errors.username && "placeholder-white placeholder:font-semibold"
            }
            placeholder={errors.username ? errors.username.message : "Username"}
            onChange={() => clearErrors("username")}
          />
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
          <Button variant="defaultMedium">Sign Up</Button>
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <h3>Already have an account?</h3>
            <Link
              className="hover:underline hover:text-white text-sm "
              href={"./sign-in"}
            >
              Sign In
            </Link>
          </div>
        </form>
      )}
    </FormProvider>
  );
}
