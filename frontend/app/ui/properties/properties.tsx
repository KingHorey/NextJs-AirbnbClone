import React from "react";
import { HeartIcon, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Properties = () => {
  return (
    <div className="rounded-md lg:h-[430px] w-full space-y-5 flex flex-col group">
      <div className="h-[270px] relative">
        <HeartIcon
          className="top-5 right-3 absolute cursor-pointer hover:scale-125 transition-all"
          stroke="white"
          fill="gray"
          size={25}
        />
        <Image
          src="/Services Image container(2).png"
          width={200}
          height={300}
          className="w-full h-full rounded-md"
          alt=""
        />
        <div className="absolute right-2 rounded-full bg-white p-1 top-1/2  opacity-0 group-hover:opacity-100 transition-all duration-200">
          <ChevronRightIcon size={20} />
        </div>
        <div className="rounded-full bg-white p-1 absolute left-2 top-1/2 opacity-0 group-hover:opacity-100 trnaistion-all duration-200">
          <ChevronLeftIcon size={20} />
        </div>
      </div>

      <Link href="#" className="select-none">
        <div className="flex justify-between">
          <h2 className="font-semibold">Aso Rock, Abuja</h2>
        </div>
        <p>Added 9 weeks ago</p>
        <p>Feb 19-24</p>
        <p>$ 300 per night</p>
      </Link>
    </div>
  );
};

export default Properties;
