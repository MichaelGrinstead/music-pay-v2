import { Dispatch, SetStateAction } from "react";
import { Input } from "./Input";
import ShowPassword from "./ShowPassword";
import React from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isShowPassword: boolean;
  setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ isShowPassword, setIsShowPassword, ...props }, ref) => {
    return (
      <div className="flex flex-row relative">
        <Input
          type={!isShowPassword ? "password" : "text"}
          {...props}
          ref={ref}
        />
        <ShowPassword
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
        />
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
