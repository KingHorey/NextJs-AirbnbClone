"use client";

import { useState, useEffect } from "react";

import { XIcon } from "lucide-react";

import axios from "axios";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

import Modals from "../modals";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { authSchema } from "@/lib/definitions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/app/utils/context";

import { motion } from "framer-motion";

const Authentication = () => {
  const [countryCode, setCountryCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { data } = await axios.get("https://ipapi.co/json");
        setCountryCode(data.country_calling_code);
        setCountry(data.country);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, []);

  const { toggleAuthModal } = useAppContext();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });
  return (
    <Modals>
      <div className="md:w-1/5 lg:w-[35%] bg-white rounded-2xl border">
        <div className="flex items-center border-b border-black/10 p-5">
          <div
            className="rounded-full border p-3"
            onClick={() => toggleAuthModal(false)}
          >
            <XIcon
              size={16}
              tabIndex={0}
              onClick={() => toggleAuthModal(false)}
              className="cursor-pointer"
            />
          </div>
          <p className="text-base font-bold text-center w-full">
            Log in or sign up
          </p>
        </div>
        <div className="overflow-scroll p-5 space-y-5">
          <p className="font-bold text-lg">Welcome to AirBnb</p>
          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="country_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <Select {...field}>
                      <SelectTrigger>{countryCode}</SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country Code</SelectLabel>
                        </SelectGroup>
                        <PhoneInput
                          country={country}
                          value={countryCode}
                          onChange={(code) => {
                            form.setValue("country_code", code);
                            setCountryCode(code);
                          }}
                        />
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex items-center border rounded-lg pl-2 gap-x-2">
                      <div>{countryCode}</div>
                      <FormControl>
                        <Input
                          {...field}
                          className="p-5 text-black text-base font-semibold w-full rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") form.handleSubmit();
                }}
                className="w-full rounded-lg text-white bg-red hover:bg-red/80 transition-colors duration-200 hover:text-white p-5 font-semibold"
              >
                Continue
              </Button>
            </form>
          </Form>
          <div className="flex flex-col space-y-2">
            <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
              Continue with Google
            </Button>
            <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
              Continue with Apple
            </Button>
            <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
              Continue with Email
            </Button>
            <Button className="hover:bg-white/70 bg-white transition-all duration-100 text-black hover:text-black border p-5 hover:font-semibold shadow-none">
              Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
    </Modals>
  );
};

export default Authentication;
