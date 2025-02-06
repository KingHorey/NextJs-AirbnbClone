/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useState } from "react";

import { CustomDropDownLabel } from "../customDropdownTrigger";
import Trigger from "../customDropdownTrigger";

import { Calendar1Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkOutSchema } from "@/lib/definitions";
import { z } from "zod";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";

import { DayPicker, DateRange } from "react-day-picker";

const CheckOut = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const form = useForm<z.infer<typeof checkOutSchema>>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      checkOut: undefined,
    },
  });
  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <Trigger>
        <div>
          <CustomDropDownLabel
            icon={Calendar1Icon}
            title="Check-Out"
            placeholder="Add dates"
            name="checkOut"
            form={form as any}
            data={date}
            updateData={setDate}
          />
        </div>
      </Trigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className=" w-[51rem] h-[29rem]   z-[10000] border shadow-lg mt-2 rounded-3xl absolute right-[-32rem]  bg-white
                        "
          onPointerDownOutside={(e) => {
            console.log("Clicked outside", e);
          }}
        >
          <div className="flex justify-center items-center h-full">
            <DayPicker
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default CheckOut;
