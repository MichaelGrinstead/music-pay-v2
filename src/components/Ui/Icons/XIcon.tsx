import { X } from "lucide-react";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

interface XIconProps {
  className?: string;
  onClick?: () => void;
}

export default function XIcon({ className, onClick }: XIconProps) {
  return (
    <Tooltip content={"Remove banner"} className="mt-4">
      <Button className={className} onClick={onClick}>
        <X size={20} />
      </Button>
    </Tooltip>
  );
}
