import { X } from "lucide-react";
import { Button } from "../Button";

import React from "react";

interface XIconProps {
  className?: string;
  onClick?: () => void;
}

const XIcon = React.forwardRef<HTMLButtonElement, XIconProps>(
  ({ className, onClick }, ref) => {
    return (
      <Button className={className} onClick={onClick} ref={ref}>
        <X size={20} />
      </Button>
    );
  }
);

XIcon.displayName = "XIcon";

export default XIcon;
