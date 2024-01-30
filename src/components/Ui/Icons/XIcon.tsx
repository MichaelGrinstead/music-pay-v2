import { XCircleIcon } from "lucide-react";
import { Button } from "../Button";

interface XIconProps {
  className?: string;
  className_span?: string;
  onClick: () => void;
}

export default function XIcon({
  className,
  className_span,
  onClick,
}: XIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <XCircleIcon size={20} />
      <span className={className_span}>close</span>
    </Button>
  );
}
