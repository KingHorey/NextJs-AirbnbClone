"use client";

import React, { useRef, useState } from "react";

import LocationSelect from "../customComponents/bookingFilter/locationSelect";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import {
  SearchIcon,
  MapPinHouseIcon,
  Calendar1Icon,
  User2Icon,
  CirclePlus,
  CircleMinus,
} from "lucide-react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { searchSchema } from "../../lib/definitions";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NavSearch = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const [option, setOption] = useState("Dates");

  const list = ["Dates", "Months", "Flexible"];
  const days = ["Exact dates", "1 day", "2 day", "3 day", "7 day", "14 day"];

  const [moreOptions, setMoreOptions] = useState("Exact dates");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const totalGuest = 16;

  const [selected, setSelected] = useState<Date[] | undefined>();

  return (
    <div className="mx-auto relative  lg:min-w-[850px] xs:max-w-full lg:max-w-[900px]  z-[100000000%] ">
      <Form {...form}>
        <form className="w-full rounded-full hover:shadow-md transition-all duration-300 h-[70px]  grid border px-0 overflow-hidden shadow-lg">
          <div className=" min-h-full w-full flex items-center px-0  gap-x-2">
            <div className="w-full hover:bg-gray-400/10 h-full px-0 rounded-full relative">
              <LocationSelect />
            </div>
            {type === "stays" ? (
              <>
                <div className="w-full hover:bg-gray-400/10 h-full px-0 rounded-full ">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full h-full border-none">
                      <DropdownMenuLabel className="flex items-center justify-center">
                        <Calendar1Icon />
                        <p>Check in</p>
                      </DropdownMenuLabel>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className=" w-[51rem] h-[29rem]   z-[10000] border shadow-lg mt-2 rounded-3xl absolute right-[-32rem]  bg-white
                        "
                      onPointerDownOutside={(e) => {
                        console.log("Clicked outside", e);
                      }}
                    >
                      <FormField
                        name="destination"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="px-2  overflow-y-scroll scrollbar h-[410px]">
                            <section className=" ">
                              <section className="grid mt-3 gap-4 place-items-center  h-[410px]">
                                <div className="rounded-full flex gap-3 justify-between items-center text-sm font-semibold bg-gray-400/10 py-1 w-[280px] px-1">
                                  {list.map((d, index) => {
                                    return (
                                      <div key={index}>
                                        <button
                                          className={
                                            option === d
                                              ? "rounded-full bg-white py-2 px-5 "
                                              : " py-2 px-5 hover:bg-gray-400/10 hover:rounded-full"
                                          }
                                          onClick={() => setOption(d)}
                                        >
                                          {d}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div>
                                  <div className="">
                                    <DayPicker
                                      mode="range"
                                      selected={selected}
                                      onSelect={setSelected}
                                      numberOfMonths={2}
                                      disabled={{ before: new Date() }}
                                    />
                                  </div>
                                </div>
                              </section>
                              <div className="flex mt-3 gap-3 px-16">
                                {days.map((day, index) => {
                                  return (
                                    <div key={index}>
                                      <button
                                        className={
                                          moreOptions === day
                                            ? "flex px-3 border py-1 rounded-full border-black hover:bg-gray-400/30"
                                            : "flex px-3 border py-1 rounded-full  hover:bg-gray-400/30"
                                        }
                                        onClick={() => setMoreOptions(day)}
                                      >
                                        {day}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </section>
                          </FormItem>
                        )}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="w-full hover:bg-gray-400/10 h-full px-0 rounded-full ">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full h-full border-none">
                      <DropdownMenuLabel className="flex items-center justify-center">
                        <Calendar1Icon />
                        <p>Check out</p>
                      </DropdownMenuLabel>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className=" w-[51rem] h-[29rem]  bg-white z-[10000] border shadow-lg mt-2 rounded-3xl absolute right-[-19rem]
                       scrollbar "
                      onPointerDownOutside={(e) => {
                        console.log("Clicked outside", e);
                      }}
                    >
                      <FormField
                        name="destination"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="px-2  overflow-y-scroll scrollbar h-[410px]">
                            <section className=" ">
                              <section className="grid mt-3 gap-4 place-items-center  h-[410px]">
                                <div className="rounded-full flex gap-3 justify-between items-center text-sm font-semibold bg-gray-400/10 py-1 w-[280px] px-1">
                                  {list.map((d, index) => {
                                    return (
                                      <div key={index}>
                                        <button
                                          className={
                                            option === d
                                              ? "rounded-full bg-white py-2 px-5 "
                                              : " py-2 px-5 hover:bg-gray-400/30 hover:rounded-full"
                                          }
                                          onClick={() => setOption(d)}
                                        >
                                          {d}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div>
                                  <div className="">
                                    <DayPicker
                                      mode="range"
                                      selected={selected}
                                      onSelect={setSelected}
                                      numberOfMonths={2}
                                      disabled={{ before: new Date() }}
                                    />
                                  </div>
                                </div>
                              </section>
                              <div className="flex mt-3 gap-3 px-16">
                                {days.map((day, index) => {
                                  return (
                                    <div key={index}>
                                      <button
                                        className={
                                          moreOptions === day
                                            ? "flex px-3 border py-1 rounded-full border-black hover:bg-gray-400/30"
                                            : "flex px-3 border py-1 rounded-full  hover:bg-gray-400/30"
                                        }
                                        onClick={() => setMoreOptions(day)}
                                      >
                                        {day}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </section>
                          </FormItem>
                        )}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <div className="w-full hover:bg-gray-400/10 h-full px-10 rounded-full cursor-pointer">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="w-full h-full border-none">
                      <DropdownMenuLabel className="flex items-center justify-center">
                        <Calendar1Icon />
                        <p>Check in</p>
                      </DropdownMenuLabel>
                      <DropdownMenuContent className="border-none w-full">
                        <FormField
                          name="destination"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className=" w-full min-h-full flex items-center ">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
              </>
            )}
            <div className="w-full hover:bg-gray-400/10 h-full px-0 rounded-full ">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="w-full h-full border-none cursor-pointer">
                  <DropdownMenuLabel className="flex items-center justify-center gap-x-1">
                    <User2Icon />
                    <p>Who</p>
                  </DropdownMenuLabel>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className=" w-[25rem] h-[23rem]  bg-white z-[10000] border shadow-lg mt-2 rounded-3xl absolute right-[-7rem]
                       scrollbar "
                  onPointerDownOutside={(e) => {
                    console.log("Clicked outside", e);
                  }}
                >
                  <FormField
                    name="destination"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <section className=" flex flex-col gap-5 pl-6 pr-10 py-7  divide-y ">
                            <article className="flex items-center justify-between ">
                              <div>
                                <h3>Adults</h3>
                                <p className=" text-[16px] font-normal text-gray-500/95">
                                  Ages 13 or above
                                </p>
                              </div>

                              <div>
                                <div className="flex items-center justify-between gap-3 ">
                                  <button
                                    className={
                                      adults <= 1
                                        ? "cursor-not-allowed"
                                        : "hover:border-black"
                                    }
                                    onClick={() =>
                                      adults >= 2 ? setAdults(adults - 1) : null
                                    }
                                  >
                                    {adults <= 1 ? (
                                      <CircleMinus
                                        size={34}
                                        color="#cecece"
                                        strokeWidth={0.3}
                                      />
                                    ) : (
                                      <CircleMinus
                                        size={34}
                                        color="#cecece"
                                        strokeWidth={0.9}
                                        className="hover:border-black"
                                      />
                                    )}
                                  </button>
                                  <p className="text-[17px] font-normal  w-5 text-center">
                                    {adults}
                                  </p>
                                  <button
                                    onClick={() =>
                                      adults + children == totalGuest
                                        ? null
                                        : setAdults(adults + 1)
                                    }
                                  >
                                    {adults + children == totalGuest ? (
                                      <CirclePlus
                                        size={34}
                                        color="#cecece"
                                        strokeWidth={0.3}
                                      />
                                    ) : (
                                      <CirclePlus
                                        size={34}
                                        color="#cecece"
                                        strokeWidth={0.9}
                                      />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </article>
                            <article className="flex items-center  justify-between pt-3 ">
                              <div>
                                <h3>Children</h3>
                                <p className=" text-[16px] font-normal text-gray-500/95">
                                  Ages 2 - 12
                                </p>
                              </div>

                              <div className="flex items-center gap-3  ">
                                <button
                                  onClick={() =>
                                    children >= 1
                                      ? setChildren(children - 1)
                                      : null
                                  }
                                >
                                  {children <= 0 ? (
                                    <CircleMinus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.3}
                                    />
                                  ) : (
                                    <CircleMinus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.9}
                                    />
                                  )}
                                </button>
                                <p className="text-[17px] font-normal  w-5 text-center">
                                  {children}
                                </p>
                                <button
                                  onClick={() =>
                                    adults + children == totalGuest
                                      ? null
                                      : setChildren(children + 1)
                                  }
                                >
                                  {adults + children == totalGuest ? (
                                    <CirclePlus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.3}
                                    />
                                  ) : (
                                    <CirclePlus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.9}
                                    />
                                  )}
                                </button>
                              </div>
                            </article>
                            <article className="flex items-center justify-between pt-3 ">
                              <div>
                                <h3>Infants</h3>
                                <p className=" text-[16px] font-normal text-gray-500/95">
                                  Under 2
                                </p>
                              </div>

                              <div className="flex items-center gap-3 ">
                                <button
                                  className={
                                    infants >= 1 ? "" : " cursor-not-allowed"
                                  }
                                  onClick={() =>
                                    infants >= 1
                                      ? setInfants(infants - 1)
                                      : null
                                  }
                                >
                                  {infants <= 0 ? (
                                    <CircleMinus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.3}
                                    />
                                  ) : (
                                    <CircleMinus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.9}
                                    />
                                  )}
                                </button>
                                <p className="text-[17px] font-normal  w-5 text-center">
                                  {infants}
                                </p>

                                <button
                                  className={
                                    infants === 5 ? "cursor-not-allowed" : ""
                                  }
                                  disabled={infants === 5}
                                  onClick={() =>
                                    infants === 5
                                      ? null
                                      : setInfants(infants + 1)
                                  }
                                >
                                  {infants === 5 ? (
                                    <CirclePlus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.3}
                                    />
                                  ) : (
                                    <CirclePlus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.9}
                                    />
                                  )}
                                </button>
                              </div>
                            </article>
                            <article className="flex items-center justify-between pt-3 ">
                              <div>
                                <h3>Pets</h3>
                                <p className="text-sm font-semibold  underline text-gray-500/95 cursor-pointer ">
                                  Bringing a service animal?
                                </p>
                              </div>

                              <div className="flex items-center gap-3 ">
                                <button
                                  className={
                                    pets >= 1 ? "" : " cursor-not-allowed"
                                  }
                                  onClick={() =>
                                    pets >= 1 ? setPets(pets - 1) : null
                                  }
                                >
                                  {pets <= 0 ? (
                                    <CircleMinus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.3}
                                    />
                                  ) : (
                                    <CircleMinus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.9}
                                    />
                                  )}
                                </button>
                                <p className="text-[17px] font-normal  w-5 text-center">
                                  {" "}
                                  {pets}{" "}
                                </p>
                                <button
                                  className={
                                    pets === 5 ? "cursor-not-allowed" : ""
                                  }
                                  disabled={pets === 5}
                                  onClick={() =>
                                    pets === 5 ? null : setPets(pets + 1)
                                  }
                                >
                                  {pets === 5 ? (
                                    <CirclePlus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.3}
                                    />
                                  ) : (
                                    <CirclePlus
                                      size={34}
                                      color="#cecece"
                                      strokeWidth={0.9}
                                    />
                                  )}
                                </button>
                              </div>
                            </article>
                          </section>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="bg-red p-3 rounded-full absolute right-5 cursor-pointer">
              <SearchIcon stroke="white" />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NavSearch;
