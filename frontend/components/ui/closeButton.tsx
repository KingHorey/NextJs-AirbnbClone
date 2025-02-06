import { XIcon } from "lucide-react";
import { Button } from "./button";

const CloseButton = ({ func }: { func: () => void }) => {
  return (
    <Button
      variant="ghost"
      className="rounded-full p-1 cursor-pointer absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4"
      onClick={() => {
        func();
      }}
    >
      <XIcon size={14} className="stroke-2" />
    </Button>
  );
};

export default CloseButton;
