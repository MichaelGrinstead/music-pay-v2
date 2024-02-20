import { Tooltip } from "@/components/Ui/Tooltip";
import EyeIcon from "./Icons/EyeIcon";
import { Dispatch, SetStateAction } from "react";

interface ShowPasswordProps {
  isShowPassword: boolean;
  setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}

export default function ShowPassword({
  isShowPassword,
  setIsShowPassword,
}: ShowPasswordProps) {
  return (
    <div className="absolute flex items-center justify-center right-0 top-1 hover">
      <Tooltip content="Show Password">
        <EyeIcon
          className="border-none h-6 w-6 p-0 rounded-full"
          size={16}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </Tooltip>
    </div>
  );
}
