"use client";

import React from "react";

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
} from "@/components/ui/dropdown-menu";

import {
  SearchIcon,
  MapPinHouseIcon,
  Calendar1Icon,
  User2Icon,
} from "lucide-react";

import { searchSchema } from "../../lib/definitions";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NavSearch = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  return (
    <div className="mx-auto relative lg:min-w-[850px] xs:max-w-full lg:max-w-[900px] z-[100000000%] bg-white">
      <Form {...form}>
        <form className="w-full rounded-full hover:shadow-md  p-0 h-[70px] flex  justify-between border px-0 overflow-hidden shadow-lg">
          <div className=" min-h-full w-full flex items-center px-0  gap-x-2">
            <div className="w-full hover:bg-gray-400/30 h-full px-10 rounded-full relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="left-0 absolute w-full h-full border-none">
                  <DropdownMenuLabel className="flex items-center justify-center gap-x-3">
                    <MapPinHouseIcon />
                    <p>Where</p>
                  </DropdownMenuLabel>
                  <DropdownMenuContent className="border-none w-full">
                    <FormField
                      name="destination"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className=" w-full min-h-full flex items-center ">
                          <FormControl> </FormControl>
                        </FormItem>
                      )}
                    />
                  </DropdownMenuContent>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
            {type === "stays" ? (
              <>
                <div className="w-full hover:bg-gray-400/30 h-full px-10 rounded-full ">
                  <DropdownMenu>
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
                              <FormControl> </FormControl>
                            </FormItem>
                          )}
                        />
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
                <div className="w-full hover:bg-gray-400/30 h-full px-10 rounded-full ">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full h-full border-none">
                      <DropdownMenuLabel className="flex items-center justify-center">
                        <Calendar1Icon />
                        <p>Check out</p>
                      </DropdownMenuLabel>
                      <DropdownMenuContent className="border-none w-full">
                        <FormField
                          name="destination"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className=" w-full min-h-full flex items-center ">
                              <FormControl> </FormControl>
                            </FormItem>
                          )}
                        />
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <div className="w-full hover:bg-gray-400/30 h-full px-10 rounded-full cursor-pointer">
                  <DropdownMenu>
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
            <div className="w-full hover:bg-gray-400/30 h-full px-10 rounded-full ">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full h-full border-none cursor-pointer">
                  <DropdownMenuLabel className="flex items-center justify-center gap-x-1">
                    <User2Icon />
                    <p>Who</p>
                  </DropdownMenuLabel>
                  <DropdownMenuContent className="border-none w-full">
                    <FormField
                      name="destination"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className=" w-full min-h-full flex items-center ">
                          <FormControl> </FormControl>
                        </FormItem>
                      )}
                    />
                  </DropdownMenuContent>
                </DropdownMenuTrigger>
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
