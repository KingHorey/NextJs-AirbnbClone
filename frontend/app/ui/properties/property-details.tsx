/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  ShareIcon,
  HeartIcon,
  StarIcon,
  FanIcon,
  FlameIcon,
  CalendarIcon,
  FlagIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BestRated from "./best-rated";

const PropertyDetails = () => {
  return (
    <main className="w-11/12 mx-auto space-y-10 min-h-screen py-10 ">
      <div className="flex justify-between md:flex-row xs:flex-col items-center">
        <h1 className="text-2xl font-bold">
          StayVista at Ekaa House w/ BBQ, WiFi, Lawn
        </h1>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <ShareIcon size={20} />
            <p className="font-semibold underline text-sm">Share</p>
          </div>
          <div className="flex space-x-2">
            <HeartIcon size={20} />
            <p className="underline font-semibold">Save</p>
          </div>
        </div>
      </div>
      <section className="rounded-md grid h-[400px]">
        <img
          src="/Services Image container(2).png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" /> */}
      </section>
      <div
        className="flex justify-between flex-row overflow-scroll custom_height"
        id="room-info"
      >
        <section className="space-y-10 overflow-y-scroll max-h-[80vh] p-2 lg:w-3/5">
          <section className="space-y-3 border-b pb-10">
            <h2 className="text-2xl font-bold">
              Entire home in Tambon Ko Chang, Thailand
            </h2>
            <p>10 Bedrooms - 5 guests</p>
            <div className="flex gap-x-2 items-center">
              <StarIcon size={18} />
              <p className="font-bold text-base">New</p>
            </div>
          </section>
          <BestRated />
          <section
            className="flex items-center space-x-5 border-b pb-10"
            id="host details"
          >
            <div className="h-14 w-14">
              <Image
                src="/Services Image container(2).png"
                width={60}
                height={20}
                alt=""
                className="rounded-[50%] h-full w-full max-w-[1500px]"
              />
            </div>
            <div>
              <h3 className="font-bold">Hosted by Admin</h3>
              <p className="text-sm text-gray-400 font-semibold">Lorem Ipsum</p>
            </div>
          </section>
          <section
            id="room-details"
            className="space-y-5 pb-10 border-b border-black/10"
          >
            <div className="flex items-center space-x-3">
              <FanIcon fill="skyblue" className="animate-spin duration-5000" />
              <div>
                <h4 className="font-bold text-base">Designed to stay cool</h4>
                <p className="text-sm">
                  Beat the heat with the AC and ceiling fan.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FlameIcon fill="orange" stroke="black" className="" />
              <div>
                <h4 className="font-bold text-base">Outdoor Entertainment</h4>
                <p className="text-sm">
                  The sun beds, pool, alfresco dining, and bbq area are great
                  for summer trips.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CalendarIcon />
              <div>
                <h4 className="font-bold text-base">
                  Free cancellation for 48 hours
                </h4>
                <p className="text-sm">
                  Get a full refund if you change your mind.
                </p>
              </div>
            </div>
          </section>
          <section id="room-description">
            <p className="line-clamp-6 text-wrap text-ellipsis">
              Ekaa House is a 5-minute walk from the city center and 3 minutes
              walk from the airport. It's perfect for families and friends who
              enjoy a relaxing and comfortable stay. Ekaa House is a cozy and
              welcoming place with a warm, inviting atmosphere. It has a private
              entrance with a view of
            </p>
          </section>
        </section>
        <aside className=" bg-white max-h-screen flex items-center justify-center flex-col">
          <section
            id="reservation"
            className="rounded-2xl shadow-xl w-full border p-10 max-h-4/5 min-h-[80%]"
          >
            <h2 className="font-bold text-xl">$300 per night</h2>
            <div>
              <Button className="bg-red w-full rounded-lg text-white font-semibold hover:bg-red/80 ">
                Reserve
              </Button>
              <p>You are not being charged yet</p>
            </div>
            <div>
              <p>Total</p>
            </div>
            <div className="flex items-center justify-center sapce-x-3 mt-auto">
              <FlagIcon size={16} stroke="gray" />
              <p className="text-gray-300 font-semibold text-sm">
                Report this listing
              </p>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default PropertyDetails;
