import { Edit } from "lucide-react";
import { Button } from "../Button";

interface EditIconProps {
  className?: string;
  className_span?: string;
  onClick: () => void;
}

export default function EditIcon({
  className,
  className_span,
  onClick,
}: EditIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Edit size={16} />
    </Button>
  );
}
