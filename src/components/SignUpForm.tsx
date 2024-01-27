"use client";

import { Button } from "./Ui/Button";
import { Input } from "./Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  code: "",
};

export default function SignUpForm() {
  const router = useRouter();
  const methods = useForm({
    defaultValues,
  });
  const { register, handleSubmit, getValues } = methods;
  const { signUp, setActive } = useSignUp();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSignUp = async () => {
    const loginData = getValues();
    try {
      await signUp?.create({
        username: loginData.username,
        emailAddress: loginData.email,
        password: loginData.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsVerifying(true);
    } catch (e) {
      console.error("Error:", JSON.stringify(e, null, 2));
    }
  };

  const handleVerify = async () => {
    const verificationData = getValues();
    console.log("verificationData", verificationData);
    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: verificationData.code,
      });
      if (completeSignUp?.status !== "complete") {
        throw new Error("Login not complete");
      }

      if (completeSignUp?.status === "complete") {
        if (setActive) {
          await setActive({ session: completeSignUp.createdSessionId });
          router.push("/");
        }
      }
    } catch (e) {
      console.log("Error:", JSON.stringify(e, null, 2));
    }
  };

  return (
    <FormProvider {...methods}>
      {isVerifying ? (
        <form
          onSubmit={handleSubmit(handleVerify)}
          className="flex flex-col items-center justify-between p-24 mt-16 gap-8"
        >
          <h3 className="text-3xl">Verification Code</h3>
          <Input {...register("code")} placeholder="Code" />
          <h3 className="text-gray-500">Enter the code sent to your email</h3>
          <Button variant="defaultMedium">Complete</Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col items-center justify-between p-24 mt-16 gap-8"
        >
          <h3 className="text-3xl">Sign Up</h3>
          <Input {...register("username")} placeholder="Username" />
          <Input {...register("email")} placeholder="Email" />
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
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
