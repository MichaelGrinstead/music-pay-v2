import { Dispatch, SetStateAction } from "react";
import { Input } from "./Input";
import ShowPassword from "./ShowPassword";
import { useFormContext } from "react-hook-form";

interface PasswordInputProps {
  isShowPassword: boolean;
  setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordInput({
  isShowPassword,
  setIsShowPassword,
}: PasswordInputProps) {
  const { register } = useFormContext();
  return (
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
  );
}
