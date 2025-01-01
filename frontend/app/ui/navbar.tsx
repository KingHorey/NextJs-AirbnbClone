"use client";

import React, { useState } from "react";
import AirBnbLogo from "./logo";
import Link from "next/link";
import { GlobeIcon } from "lucide-react";
import { usePathname } from "next/navigation";

// custom user context
import { useAppContext } from "@/app/utils/context";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Menu } from "lucide-react";
import NavSearch from "./nav-search";

const Navbar = () => {
  const [filters, setFilters] = useState<string>("stays");
  const pathname = usePathname();

  const { authModal, toggleAuthModal } = useAppContext();

  const paths = ["/", "/rooms"];
  const allowed_paths = paths.includes(pathname);

  return (
    <header className="w-full sticky top-0 mx-auto flex flex-col pb-5 bg-white items-center justify-center z-[999] border-b border-black/10 max-w-[1500px]">
      <nav className="flex w-screen p-3 px-5 font-semibold items-center gap-x-2 h-full relative justify-between">
        <Link
          href="/"
          className="flex items-center gap-x-3 font-semibold text-xl w-1/4 p-3 h-full"
        >
          <AirBnbLogo />
          <p className="text-red font-extrabold text-2xl lg:block xs:hidden">
            airbnb
          </p>
        </Link>
        {allowed_paths && (
          <div className="top-0 left-0 right-0  flex flex-col items-center  max-w-[850px] mx-auto justify-center relative">
            <ul className="flex p-5 gap-x-5">
              <li
                className={`cursor-pointer p-4 rounded-full text-black ${
                  filters === "stays"
                    ? "text-black font-semibold"
                    : "hover:bg-slate-400/10 text-black/60 hover:text-black"
                }`}
                onClick={() => setFilters("stays")}
              >
                Stays
              </li>
              <li
                className={`cursor-pointer p-4  rounded-full ${
                  filters === "experiences"
                    ? "text-black font-semibold"
                    : "hover:bg-slate-400/10 text-black/60 hover:text-black"
                }`}
                onClick={() => setFilters("experiences")}
              >
                Experiences
              </li>
            </ul>
          </div>
        )}
        <div className="flex items-center gap-x-3 w-1/3 justify-center z-[999]">
          <div className="p-4  hover:bg-slate-400/10 rounded-full cursor-pointer">
            <Link href="/host/homes" className="text-sm lg:text-base">
              Airbnb your home
            </Link>
          </div>
          <div className="p-2 lg:p-4  hover:bg-slate-400/10 rounded-full">
            <GlobeIcon size={20} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:shadow-lg shadow-black/40 border rounded-[2rem] lg:px-2 gap-x-4 ">
              <DropdownMenuLabel className="flex items-center">
                <Menu />
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback className="bg-black text-white">
                    O
                  </AvatarFallback>
                </Avatar>
                <DropdownMenuContent className="z-[9999999] flex flex-col space-y-2 p-0 w-[250px] py-2 rounded-lg mr-5">
                  <DropdownMenuGroup>
                    <ul className="flex flex-col space-y-3">
                      <li
                        className="hover:bg-gray-300/10 duration-100 transition-all hover:font-bold w-full p-2 font-normal text-sm cursor-pointer"
                        onClick={() => toggleAuthModal(true)}
                      >
                        Login
                      </li>
                      <li
                        className="hover:bg-gray-300/10 duration-100 transition-all hover:font-bold w-full p-2 font-normal text-sm cursor-pointer"
                        onClick={() => toggleAuthModal(true)}
                      >
                        Sign Up
                      </li>
                    </ul>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="flex flex-col space-y-3">
                    <Link
                      href="/giftcards"
                      className="hover:bg-gray-300/10 duration-100 transition-all hover:font-bold w-full p-2 font-normal text-sm"
                    >
                      Giftcards
                    </Link>
                    <Link
                      href="/host/homes"
                      className="hover:bg-gray-300/10 duration-100 transition-all w-full p-2 font-normal hover:font-bold text-sm"
                    >
                      Host your home
                    </Link>
                    <Link
                      href="/help"
                      className="hover:bg-gray-300/10 duration-100 transition-all w-full p-2 font-normal hover:font-bold  text-sm"
                    >
                      Help
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenuLabel>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </nav>
      {allowed_paths && <NavSearch type={filters} />}
    </header>
  );
};

export default Navbar;
