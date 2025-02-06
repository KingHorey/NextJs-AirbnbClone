/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseButton from "@/components/ui/closeButton";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { da } from "date-fns/locale";
import { LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "react-hook-form";

type FormValues = {
  [key: string]: string;
};

const Trigger = ({ children }: { children: React.ReactNode }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownMenuTrigger
      className="relative w-full h-full border-none"
      ref={triggerRef}
      asChild
    >
      {children}
    </DropdownMenuTrigger>
  );
};

export const CustomDropDownLabel = React.forwardRef<
  HTMLDivElement,
  {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    form: UseFormReturn<FormValues>;
    placeholder: string;
    updateData: (data: any) => void;
    data: any;
    title: string;
    name: string;
  }
>(({ icon, placeholder, updateData, data, form, name, title }, ref) => {
  return (
    <DropdownMenuLabel
      ref={ref}
      className="flex h-full flex-col w-full items-start justify-center px-5 relative"
    >
      <div className="flex items-center gap-x-2 w-full">
        {React.createElement(icon, { className: "w-4 h-4" })}
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem className="p-0">
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                className="w-full border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 rounded-none h-5"
                onChange={(e) => {
                  field.onChange(e);
                  updateData(e.target.value);
                }}
                value={
                  typeof data === "string"
                    ? data
                    : data?.from
                    ? new Date(new Date(data.from).getTime() + 86400000)
                        .toISOString()
                        .split("T")[0]
                    : data?.to && new Date(data.to).toISOString().split("T")[0]
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {data && <CloseButton func={() => updateData("")} />}
    </DropdownMenuLabel>
  );
});

CustomDropDownLabel.displayName = "CustomDropDownLabel";

export default Trigger;
