import React from "react";

import Image from "next/image";
import { StarIcon } from "lucide-react";

const LandlordImageCard = () => {
  return (
    <div className="rounded-2xl shadow-2xl shadow-slate-600/10 border flex justify-between p-10 max-w-[380px]">
      <div className="h-full w-3/5">
        <div className="w-full h-full space-y-5 flex flex-col items-center">
          <Image
            src="/360_F_601171827_GwbDHEuhisbGFXRfIpXFhtf7wAvsbLut.jpg"
            alt=""
            className="rounded-full h-28 w-28 object-cover"
            width={100}
            height={100}
          />
          <h2 className="font-bold text-base text-center">Username</h2>
        </div>
      </div>
      <div className="h-full space-y-5">
        <div>
          <span className="font-bold text-xl">100</span>
          <p className="text-sm ">Reviews</p>
        </div>
        <div>
          <span className="font-bold text-lg flex items-center">
            <StarIcon size={18} stroke="black" fill="black" />
          </span>
          <p className="text-sm font-light">Rating</p>
        </div>
        <div>
          <span className="font-bold text-lg">6</span>
          <p className="text-sm ">years hosting</p>
        </div>
      </div>
    </div>
  );
};

export default LandlordImageCard;
