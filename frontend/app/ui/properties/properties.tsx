"use client";

import React, { useState } from "react";
import { HeartIcon, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";

const Properties = ({
  images,
  rating,
  bookmarked,
  id,
  location,
  price_per_night,
}: {
  images: string[];
  rating: number;
  bookmarked: boolean;
  id: string;
  location: string;

  price_per_night: string;
}) => {
  const [image, setImages] = useState<string[]>(images);

  const switchImages = () => {
    // handle image switching
  };
  return (
    <Link
      href={`/rooms/${id}`}
      className="rounded-md lg:h-[430px] w-full space-y-5 flex flex-col group"
    >
      <div className="h-[270px] relative">
        <HeartIcon
          className="top-5 right-3 absolute cursor-pointer hover:scale-125 transition-all"
          stroke="white"
          fill={bookmarked ? "red" : "gray"}
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

      <div className="select-none space-y-3 font-normal text-sm">
        <div className="flex justify-between">
          <h2 className="font-semibold">{location}</h2>
          <div className="flex items-center gap-1">
            <StarIcon size={16} fill="black" />
            <span>{rating}</span>
          </div>
        </div>
        <p>Added 9 weeks ago</p>
        <p>{price_per_night} night</p>
      </div>
    </Link>
  );
};

export default Properties;
