import { Camera } from "lucide-react";
import { Button } from "../Button";

interface CameraIconProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function CameraIcon({
  className,
  size,
  onClick,
}: CameraIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Camera size={size} />
    </Button>
  );
}
