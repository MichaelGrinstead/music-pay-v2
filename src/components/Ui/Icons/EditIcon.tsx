import { Edit } from "lucide-react";
import { Button } from "../Button";

interface EditIconProps {
  className?: string;
  onClick?: () => void;
}

export default function EditIcon({
  className,

  onClick,
}: EditIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Edit size={16} />
    </Button>
  );
}
