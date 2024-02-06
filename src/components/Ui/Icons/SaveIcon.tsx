import { Save } from "lucide-react";
import { Button } from "../Button";

interface SaveIconProps {
  className?: string;
  className_span?: string;
  onClick: () => void;
}

export default function SaveIcon({
  className,
  className_span,
  onClick,
}: SaveIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Save size={16} />
    </Button>
  );
}
