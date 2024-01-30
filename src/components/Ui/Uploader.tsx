import { ChangeEvent, SyntheticEvent } from "react";
import { FiUpload } from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";

interface props {
  className?: string;
  className_span?: string;
  uploadFunction: (
    e: SyntheticEvent | ChangeEvent<HTMLInputElement>
  ) =>
    | Promise<void>
    | ((e: SyntheticEvent | ChangeEvent<HTMLInputElement>) => void);
  loadingState: boolean;
  fileName?: string;
  innerText?: string;
  spanText?: string;
  errorMessage?: string;
  accept?: string;
  multiple?: boolean;
}

export default function Uploader({
  className,
  className_span,
  uploadFunction,
  loadingState,
  fileName,
  innerText,
  spanText,
  errorMessage,
}: props) {
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
      <div className="flex flex-col items-center justify-center h-10 w-10">
        <span
          className={`absolute flex flex-col top-full text-center mt-2 hidden group-hover:block text-sm ${className_span}`}
        >
          {spanText}
        </span>
        {loadingState ? (
          <LoadingSpinner />
        ) : (
          <div>
            <FiUpload className="h-6 w-6" />

            <input
              type="file"
              className="hidden"
              onChange={uploadFunction}
              accept=".jpg, .jpeg, image/jpeg, .png, image/png"
            />
          </div>
        )}
      </div>
    </label>
  );
}
