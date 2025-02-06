"use client";

import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MapPinHouseIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { searchSchema } from "@/lib/definitions";

import { locations } from "./location";
import Image from "next/image";

const LocationSelect = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="relative w-full h-full border-none"
        asChild
      >
        <DropdownMenuLabel className="flex flex-col w-full items-start justify-center gap-x-3 px-5">
          <div className="flex items-center gap-x-2 w-full">
            <MapPinHouseIcon size={16} />
            <p>Where</p>
          </div>
          <Form {...form}>
            <FormField
              name="destination"
              control={form.control}
              render={({ field }) => (
                <FormItem className="p-0">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search Destinations"
                      className="w-full border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="w-[25rem] top-5 bg-white z-[100000000] border shadow-lg mt-2 rounded-3xl absolute right-[-19rem] cursor-pointer scrollbar p-5 max-h-[500px] overflow-y-auto"
          onPointerDownOutside={(e) => {
            console.log("Clicked outside", e);
          }}
        >
          {locations.map((location, index: number) => (
            <div
              className="flex items-center gap-3 py-2 px-3 hover:bg-gray-400/10 hover:rounded-lg"
              key={index}
            >
              <Image
                src={location.imageSrc}
                width={50}
                height={0}
                alt={location.alt}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-sm">{location.country}</h3>
                <p className="text-sm font-light">{location.description}</p>
              </div>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default LocationSelect;
