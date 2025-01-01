/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  {
    image: "/categories-image/beach.png",
    text: "beach",
  },
  {
    image: "/categories-image/arctic.png",
    text: "arctic",
  },
  {
    image: "/categories-image/beachfront.png",
    text: "beachfront",
  },
  {
    image: "/categories-image/cities.png",
    text: "cities",
  },
  {
    image: "/categories-image/design.png",
    text: "design",
  },
  {
    image: "/categories-image/icons.png",
    text: "icons",
  },
  {
    image: "/categories-image/island.png",
    text: "island",
  },
  {
    image: "/categories-image/lakefront.png",
    text: "lakefront",
  },
  {
    image: "/categories-image/luxe.png",
    text: "luxe",
  },
  {
    image: "/categories-image/mansions.png",
    text: "mansions",
  },
  {
    image: "/categories-image/new.png",
    text: "new",
  },
  {
    image: "/categories-image/pools.png",
    text: "pools",
  },
  {
    image: "/categories-image/rooms.png",
    text: "rooms",
  },
  {
    image: "/categories-image/trending.png",
    text: "trending",
  },
];

const CategoriesFilter = () => {
  const [selected, setSelected] = useState<string>("");
  return (
    <div className="w-2/3 p-3 pl-16">
      <Carousel>
        <CarouselPrevious className="hover:shadow-md duration-200 transition-all" />
        <CarouselContent>
          {categories.map(({ image, text }, index: number) => (
            <CarouselItem
              key={index}
              className="flex flex-col items-center justify-center w-6 h-full basis-36 gap-x-5 cursor-pointer group p-2"
              onClick={() =>
                selected === text ? setSelected("") : setSelected(text)
              }
            >
              <img
                src={image}
                alt={text}
                className={`w-6 h-6 group-hover:opacity-100 ${
                  selected === text ? "group:opacity-100" : "opacity-50"
                }`}
              />
              <p
                className={`group-hover:after:border-b-2 hover:after:border-b-black transition-colors hover:after:inline-block after:left-0 after: ${
                  selected === text ? "text-black" : "text-black/60"
                } group-hover:text-black duration-100`}
              >
                {text}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hover:shadow-md duration-200 transition-all" />
      </Carousel>
    </div>
  );
};

export default CategoriesFilter;
