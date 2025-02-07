"use client";

import React, { useState } from "react";
import { useModalContext } from "@/app/utils/context";
import { filterSchema } from "@/lib/definitions";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon, ZapIcon, KeyRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterProperty = () => {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });

  const [beds, setBeds] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  function increaseInfo(x: string) {
    switch (x) {
      case "beds":
        setBeds(beds + 1);
        break;
      case "rooms":
        setRooms(rooms + 1);
        break;
      case "guests":
        setGuests(guests + 1);
        break;
      default:
        break;
    }
  }

  function decreaseInfo(x: string) {
    switch (x) {
      case "beds":
        setBeds(beds - 1);
        break;
      case "rooms":
        setRooms(rooms - 1);
        break;
      case "guests":
        setGuests(guests - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="max-h-[55vh] overflow-y-auto px-5">
      <Form {...form}>
        <form className="space-y-10">
          <div className="flex gap-x-10">
            <FormField
              name="price.min"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel htmlFor="price.min">Min Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="price.max"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price.min">Max Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <hr />
          <div className="space-y-5">
            <p className="font-semibold text-lg">Rooms, Beds and Guests</p>
            <FormItem className="flex items-center gap-x-10 space-y-0">
              <FormLabel
                htmlFor="rooms"
                className="font-normal text-base flex-1"
              >
                Rooms
              </FormLabel>
              <div className="flex items-center gap-x-5 w-fit">
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => decreaseInfo("rooms")}
                >
                  <MinusIcon size={16} />
                </div>

                <FormField
                  name="rooms"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[50px] flex items-center justify-center font-semibold shadow-none"
                        value={rooms}
                      />
                    </FormControl>
                  )}
                />
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => increaseInfo("rooms")}
                >
                  <PlusIcon size={16} />
                </div>
              </div>
            </FormItem>
            <FormItem className="flex items-center gap-x-10 space-y-0">
              <FormLabel
                htmlFor="beds"
                className="font-normal text-base flex-1"
              >
                Beds
              </FormLabel>
              <div className="flex items-center gap-x-5 w-fit">
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => decreaseInfo("beds")}
                >
                  <MinusIcon size={16} />
                </div>
                <FormField
                  name="beds"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[50px] flex items-center justify-center font-semibold shadow-none"
                        value={beds}
                      />
                    </FormControl>
                  )}
                />
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => increaseInfo("beds")}
                >
                  <PlusIcon size={16} />
                </div>
              </div>
            </FormItem>
            <FormItem className="flex items-center gap-x-10 space-y-0">
              <FormLabel
                htmlFor="guests"
                className="font-normal text-base flex-1 capitalize"
              >
                Guests
              </FormLabel>
              <div className="flex items-center gap-x-5 w-fit">
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => decreaseInfo("guests")}
                >
                  <MinusIcon size={16} />
                </div>

                <FormField
                  name="guests"
                  control={form.control}
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[50px] flex items-center justify-center font-semibold shadow-none"
                        value={guests}
                      />
                    </FormControl>
                  )}
                />
                <div
                  className="flex items-center rounded-full border p-2 hover:bg-gray-100 transition"
                  onClick={() => increaseInfo("guests")}
                >
                  <PlusIcon size={16} />
                </div>
              </div>
            </FormItem>
          </div>
          <hr />
          <p>Booking Options</p>
          <div className="flex gap-x-5">
            <FormField
              name="booking_type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      {...field}
                      value="instant"
                      variant={
                        field.value === "instant" ? "default" : "outline"
                      }
                      className="flex items-center p-5 gap-x-2 shadow-none rounded-3xl"
                      type="button"
                      onClick={() => field.onChange("instant")}
                    >
                      <ZapIcon />
                      <span>Instant</span>
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="booking_type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      {...field}
                      value="request"
                      variant={
                        field.value === "request" ? "default" : "outline"
                      }
                      className="flex items-center p-5 gap-x-2 shadow-none rounded-3xl"
                      type="button"
                      onClick={() => field.onChange("request")}
                    >
                      <KeyRoundIcon />
                      <span>Request</span>
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FilterProperty;
