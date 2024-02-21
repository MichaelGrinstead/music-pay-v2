"use client";

import { Button } from "./Ui/Button";
import { Input } from "./Ui/Input";
import { useForm, FormProvider } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addNewUser } from "@/utils/addNewUser";
import PasswordInput from "./Ui/PasswordInput";
import { LoadingSpinner } from "./Ui/LoadingSpinner";

interface SignUpData {
  username: string;
  email: string;
  password: string;
  code: string;
}

const defaultValues: SignUpData = {
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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          addNewUser(signUpData.username);
          setIsLoading(false);
          router.push("/");
        }
      }
    } catch (e) {
      console.error("Error:", JSON.stringify(e, null, 2));
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
          <Button variant="defaultMedium">
            {isLoading ? <LoadingSpinner /> : "Complete"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col items-center justify-between p-24 mt-16 gap-8"
        >
          <h3 className="text-3xl">Sign Up</h3>
          <Input {...register("username")} placeholder="Username" />
          <Input {...register("email")} placeholder="Email" />
          <PasswordInput
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
