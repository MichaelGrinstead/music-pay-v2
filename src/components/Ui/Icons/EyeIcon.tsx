import { Eye } from "lucide-react";
import { Button } from "../Button";

interface EyeIconProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function EyeIcon({ className, size, onClick }: EyeIconProps) {
  return (
    <Button type="button" className={className} onClick={onClick}>
      <Eye size={size} />
    </Button>
  );
}
