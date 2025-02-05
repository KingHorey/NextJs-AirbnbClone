"use client";

import React, { useEffect, useRef, useState } from "react";
import AirBnbLogo from "./logo";
import Link from "next/link";
import { motion, useInView, useScroll } from "framer-motion";
import { GlobeIcon, Scale } from "lucide-react";
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
import Shortnavbar from "./short-navbar";

const Navbar = () => {
  const [filters, setFilters] = useState<string>("stays");
  const pathname = usePathname();

  const { authModal, toggleAuthModal } = useAppContext();

  window.onbeforeunload =()=>{
    window.scrollTo(0,0);
  }

  const paths = ["/", "/rooms"];
  const allowed_paths = paths.includes(pathname);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const newPositon = Math.ceil(window.scrollY);

      setPosition(newPositon);
    });
  }, [position]);

  return (
    <>
      {position <= 1 ? (
        <header className="sticky top-0  pb-5 flex flex-col gap-3   items-center justify-center z-[999] border-b border-black/10 bg-white mx-auto px-3  ">
          <nav className="flex items-center  justify-between w-[100%] ">
            <div className="">
              <Link
                href="/"
                className="flex items-center gap-x-3 font-semibold text-xl  p-3 h-full"
              >
                <AirBnbLogo />
                <p className="text-red font-extrabold text-2xl lg:block xs:hidden">
                  airbnb
                </p>
              </Link>
            </div>
            <motion.article
            animate={
              {
                scale: position <= 1 ? 1 : 0
              }
            }
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}>
              {allowed_paths && (
                <article className="">
                  <div>
                    <ul className="flex p-5 items-center justify-center text-center gap-x-5">
                      <li
                        className={`cursor-pointer  rounded-full text-black ${
                          filters === "stays"
                            ? "text-black font-semibold"
                            : "hover:bg-slate-400/10 text-black/60 hover:text-black"
                        }`}
                        onClick={() => setFilters("stays")}
                      >
                        Stays
                      </li>
                      <li
                        className={`cursor-pointer rounded-full ${
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
                </article>
              )}
            </motion.article>

            <div className="flex items-center  gap-5    justify-center z-[999]  ">
              <div className=" hover:bg-slate-400/10 rounded-full cursor-pointer">
                <Link href="/host/homes" className="text-sm lg:text-base">
                  Airbnb your home
                </Link>
              </div>
              <div className="  hover:bg-slate-400/10 rounded-full">
                <GlobeIcon size={20} />
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className=" relative hover:shadow-lg shadow-black/40 border rounded-[2rem]   ">
                  <DropdownMenuLabel className="flex items-center  ">
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
                    <DropdownMenuContent className="z-[9999999]  p-0  absolute left-[-13.5rem]  rounded-lg ">
                      <DropdownMenuGroup>
                        <ul className="flex flex-col space-y-3">
                          <li
                            className="hover:bg-gray-300/10 duration-100 transition-all hover:font-bold  p-2 font-normal text-sm cursor-pointer"
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
                          href="/*"
                          className="hover:bg-gray-300/10 duration-100 transition-all w-full p-2 font-normal hover:font-bold  text-sm"
                        >
                          Host an experience
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
          {allowed_paths && (
            <motion.div
            animate={
              {
                scale: position <= 1 ? 1 : 0
              }
            }
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            >
              <NavSearch type={filters} />
            </motion.div>
          )}
        </header>
      ) : (
        <motion.header  animate={
          {
            scale: position <= 1 ? 0 :1
          }
        }
        transition={{
          duration: 0.8,
          delay: 10.5,
          ease: [0, 0.71, 0.2, 1.01],
        }} 
        className="sticky top-0  pb-5  z-[999] border-b border-black/10 bg-white  mx-auto px-3  ">
          <nav className="flex items-center  justify-between w-[100%] ">
            <div className="">
              <Link
                href="/"
                className="flex items-center gap-x-3 font-semibold text-xl  p-3 h-full"
              >
                <AirBnbLogo />
                <p className="text-red font-extrabold text-2xl lg:block xs:hidden">
                  airbnb
                </p>
              </Link>
            </div>
            <motion.article
             
            
            >
              <Shortnavbar />
            </motion.article>

            <div className="flex items-center  gap-5    justify-center z-[999]  ">
              <div className=" hover:bg-slate-400/10 rounded-full cursor-pointer">
                <Link href="/host/homes" className="text-sm lg:text-base">
                  Airbnb your home
                </Link>
              </div>
              <div className="  hover:bg-slate-400/10 rounded-full">
                <GlobeIcon size={20} />
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className=" relative hover:shadow-lg shadow-black/40 border rounded-[2rem]   ">
                  <DropdownMenuLabel className="flex items-center  ">
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
                    <DropdownMenuContent className="z-[9999999]  p-0  absolute left-[-13.5rem]  rounded-lg ">
                      <DropdownMenuGroup>
                        <ul className="flex flex-col space-y-3">
                          <li
                            className="hover:bg-gray-300/10 duration-100 transition-all hover:font-bold  p-2 font-normal text-sm cursor-pointer"
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
                          href="/*"
                          className="hover:bg-gray-300/10 duration-100 transition-all w-full p-2 font-normal hover:font-bold  text-sm"
                        >
                          Host an experience
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
        </motion.header>
      )}
    </>
  );
};

export default Navbar;
