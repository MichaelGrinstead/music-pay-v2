import { Camera } from "lucide-react";
import { Button } from "../Button";

interface CameraIconProps {
  className?: string;
  className_span?: string;
  onClick: () => void;
}

export default function CameraIcon({
  className,
  className_span,
  onClick,
}: CameraIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Camera size={20} />
      <span className={className_span}>edit</span>
    </Button>
  );
}
