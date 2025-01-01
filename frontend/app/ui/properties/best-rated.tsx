import { StarIcon } from "lucide-react";
import React from "react";

import Image from "next/image";

const BestRated = () => {
  return (
    <div className="rounded-2xl flex p-5 space-x-5 border">
      <div className="flex gap-x-5 items-center">
        <div className="flex gap-x-2">
          <Image
            src="/svg/crown.svg"
            alt="award_left"
            width={20}
            height={20}
            className="-scale-x-100 text-black"
          />
          <div className="text-base font-semibold text-center">
            Guest <br />
            Favorite
          </div>
          <Image
            src="/svg/crown.svg"
            alt="award_left"
            width={20}
            height={20}
            className=""
          />
        </div>
        <div className="text-sm font-bold w-3/5 mx-auto text-center">
          One of the most loved homes on AirBnb, according to guests
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-xl">5.0</p>
        <div className="flex gap-x-1">
          {Array.from({ length: 5 }).map((_, index: number) => (
            <StarIcon size={13} key={index} stroke="black" fill="black" />
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-xl">453</p>
        <p className="text-sm text-gray-400 underline">reviews</p>
      </div>
    </div>
  );
};

export default BestRated;
