import { Edit } from "lucide-react";
import { Button } from "../Button";
import React from "react";

interface EditIconProps {
  className?: string;
  onClick?: () => void;
}

const EditIcon = React.forwardRef<HTMLButtonElement, EditIconProps>(
  ({ className, onClick }, ref) => {
    return (
      <Button className={className} onClick={onClick} ref={ref}>
        <Edit size={16} />
      </Button>
    );
  }
);

EditIcon.displayName = "EditIcon";

export default EditIcon;
