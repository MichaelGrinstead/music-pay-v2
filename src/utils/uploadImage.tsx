import { PutBlobResult } from "@vercel/blob";
import { ChangeEvent, SyntheticEvent } from "react";

export async function uploadImage(
  e: SyntheticEvent | ChangeEvent<HTMLInputElement>
) {
  let file: File | null = null;
  if (e.nativeEvent instanceof DragEvent) {
    e.preventDefault();
    file = e.nativeEvent.dataTransfer?.files?.[0] || null;
  } else if (e.target instanceof HTMLInputElement) {
    file = e.target.files?.[0] || null;
  }

  if (file) {
    try {
      const response = await fetch(`/api/image?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (response.ok) {
        console.log("result", response);
        const blob = (await response.json()) as PutBlobResult;
        return blob.url;
      }
    } catch (e) {
      console.error(e, "error uploading image");
    }
  }
}
