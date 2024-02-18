import { Save } from "lucide-react";
import { Button } from "../Button";

interface SaveIconProps {
  className?: string;
  onClick: () => void;
}

export default function SaveIcon({ className, onClick }: SaveIconProps) {
  return (
    <Button className={className} onClick={onClick}>
      <Save size={16} />
    </Button>
  );
}
