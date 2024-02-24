import { Eye } from "lucide-react";
import { Button } from "../Button";
import React from "react";

interface EyeIconProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

const EyeIcon = React.forwardRef<HTMLButtonElement, EyeIconProps>(
  ({ className, size, onClick }, ref) => {
    return (
      <Button type="button" className={className} onClick={onClick} ref={ref}>
        <Eye size={size} />
      </Button>
    );
  }
);

EyeIcon.displayName = "EyeIcon";

export default EyeIcon;
