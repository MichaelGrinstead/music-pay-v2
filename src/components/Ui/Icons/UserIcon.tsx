import { CircleUserIcon } from "lucide-react";
import { Button } from "../Button";
import React from "react";

interface UserIconProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

const UserIcon = React.forwardRef<HTMLButtonElement, UserIconProps>(
  ({ className, size, onClick }, ref) => {
    return (
      <Button className={className} onClick={onClick} ref={ref}>
        <CircleUserIcon size={size} />
      </Button>
    );
  }
);
UserIcon.displayName = "UserIcon";

export default UserIcon;
