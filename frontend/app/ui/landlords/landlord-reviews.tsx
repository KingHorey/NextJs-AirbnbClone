import React from "react";

import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

const LandlordReviews = () => {
  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center min-w-full">
        <h3 className="font-bold text-xl">User Reviews</h3>
        <div className="flex items-center gap-x-3">
          <div className="rounded-full border border-black/10 cursor-pointer hover:scale-150 duration-100 transition-all"               tabIndex={0}>
            <ChevronLeftIcon
              size={20}
              className="text-black/30 hover:text-black/60  transition-all duration-200"
            />
          </div>
          <div className="rounded-full border border-black/10 cursor-pointer hover:scale-150 duration-100 transition-all"  tabIndex={0} >
            <ChevronRightIcon tabIndex={0} size={20} className="text-black/30 hover:text-black/60 transition-all duration-200"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordReviews;
