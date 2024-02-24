import { Save } from "lucide-react";
import { Button } from "../Button";
import React from "react";

interface SaveIconProps {
  className?: string;
  onClick: () => void;
}

const SaveIcon = React.forwardRef<HTMLButtonElement, SaveIconProps>(
  ({ className, onClick }, ref) => {
    return (
      <Button className={className} onClick={onClick} ref={ref}>
        <Save size={16} />
      </Button>
    );
  }
);

SaveIcon.displayName = "SaveIcon";

export default SaveIcon;
