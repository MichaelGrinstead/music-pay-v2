import { ChangeEvent, SyntheticEvent, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";
import { Tooltip } from "./Tooltip";
import CameraIcon from "./Icons/CameraIcon";

interface props {
  className?: string;
  className_tooltip?: string;
  uploadFunction: (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>
  ) =>
    | Promise<void>
    | ((e: SyntheticEvent | ChangeEvent<HTMLInputElement>) => void);
  loadingState: boolean;
  fileName?: string;
  innerText?: string;
  tooltipContent?: string;
  errorMessage?: string;
  accept?: string;
  multiple?: boolean;
}

export default function Uploader({
  className,
  className_tooltip,
  uploadFunction,
  loadingState,
  fileName,
  innerText,
  tooltipContent,
  errorMessage,
}: props) {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <label
      className={className}
      onDrop={uploadFunction}
      onDragOver={(e) => e.preventDefault()}
    >
      {errorMessage ? (
        <h3 className="font-bold ml-6 text-black italic">{errorMessage}</h3>
      ) : (
        <h3 className="font-bold ml-2 max-w-40 truncate">
          {fileName ? fileName : innerText}
        </h3>
      )}
      <Tooltip content={tooltipContent} className={className_tooltip}>
        <div className="flex flex-col items-center justify-center h-10 w-10">
          {loadingState ? (
            <LoadingSpinner />
          ) : (
            <div>
              <CameraIcon
                className="border-none bg-transparent hover:bg-transparent"
                size={20}
                onClick={() => fileInput.current?.click()}
              />

              <input
                type="file"
                className="hidden"
                onChange={uploadFunction}
                accept=".jpg, .jpeg, image/jpeg, .png, image/png"
                ref={fileInput}
              />
            </div>
          )}
        </div>
      </Tooltip>
    </label>
  );
}
