import { Camera } from "lucide-react";
import { Button } from "../Button";
import React from "react";

interface CameraIconProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

const CameraIcon = React.forwardRef<HTMLButtonElement, CameraIconProps>(
  ({ className, size, onClick }, ref) => {
    return (
      <Button className={className} onClick={onClick} ref={ref}>
        <Camera size={size} />
      </Button>
    );
  }
);
CameraIcon.displayName = "CameraIcon";

export default CameraIcon;
