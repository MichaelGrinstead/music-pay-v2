"use client";

import { Button } from "./Ui/Button";
import { Input } from "./Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import ShowPassword from "./Ui/ShowPassword";
import { LoadingSpinner } from "./Ui/LoadingSpinner";

export default function SignInForm() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, getValues } = methods;
  const { signIn, setActive } = useSignIn();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        }
      }
    } catch (e) {
      console.error(JSON.stringify(e, null, 2));
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col items-center justify-between p-24 mt-16 gap-8"
      >
        <h3 className="text-3xl">Sign In</h3>
        <Input {...register("email")} placeholder="Email" />
        <div className="flex flex-row relative">
          <Input
            {...register("password")}
            placeholder="Password"
            type={!isShowPassword ? "password" : "text"}
          />
          <ShowPassword
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
          />
        </div>
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
