import React from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const TaxFiltering = () => {
  return (
    <div className="flex items-center space-x-2 border rounded-2xl p-3 hover:bg-gray-400/20 cursor-pointer">
      <Label htmlFor="taxes" className="cursor-pointer">
        Display total before taxes
      </Label>
      <Switch id="taxes" />
    </div>
  );
};

export default TaxFiltering;
