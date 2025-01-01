"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FilterIcon, SearchIcon } from "lucide-react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import React from "react";

const Messages = () => {
  const [filterMessage, setFilterMessage] = React.useState("All");
  const [search, setSearch] = React.useState<boolean>(false);

  return (
    <main className="flex md:flex-row flex-col w-full min-h-screen">
      <div className="flex flex-col items-center border-r lg:w-[30%] space-y-5">
        <div
          id="messge-header"
          className="w-full xs:border-b  xs:border-black/10  p-5  space-y-5 "
        >
          <div className="w-full overflow-hidden ">
            <AnimatePresence mode="wait">
              {search ? (
                <motion.div
                  key="search-header"
                  initial={{ x: "100%" }}
                  animate={{ x: "0" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full space-y-5"
                >
                  <div className="w-full flex gap-x-3 items-center">
                    <input
                      type="text"
                      placeholder="Search messages"
                      className="w-full p-3 border rounded-full"
                    />
                    <div
                      className="hover:bg-gray-200/30 font-semibold p-3 rounded-full duration-100 transition-colors cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setSearch(false);
                      }}
                      onClick={() => setSearch(false)}
                    >
                      Cancel
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default-header"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full space-y-5"
                >
                  <div className="flex items-center w-full justify-between ">
                    <p className="text-2xl font-bold">Messages</p>
                    <div className="flex items-center space-x-3">
                      <div
                        className="rounded-full bg-slate-200/30 p-3 cursor-pointer"
                        onClick={() => setSearch(true)}
                      >
                        <SearchIcon size={20} />
                      </div>
                      <div className="rounded-full bg-slate-200/30 p-3 cursor-pointer">
                        <FilterIcon size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex space-x-3 justify-start w-full">
            <div
              className={`w-[70px] text-sm p-2 rounded-full  border flex items-center justify-center font-semibold  ${
                filterMessage === "All"
                  ? "bg-black border-black border text-white"
                  : "cursor-pointer"
              }`}
              onClick={() => setFilterMessage("All")}
            >
              All
            </div>
            <div
              className={`w-[100px] p-2 text-sm rounded-full border text-center font-semibold cursor-pointer ${
                filterMessage === "unread"
                  ? "bg-black text-white border border-black"
                  : "cursor-pointer"
              }`}
              onClick={() => setFilterMessage("unread")}
            >
              Unread
            </div>
          </div>
        </div>
        <section id="chats" className="min-w-full min-h-full p-5 ">
          <div className="flex items-center space-y-4 flex-col justify-center">
            <ChatBubbleLeftRightIcon className="w-10 h-10 mt-auto" />
            <div className="text-center space-y-2">
              <p className="font-bold text-base">You have no messages</p>
              <p className="text-black/45">
                When you receive a message, it will appear here
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full">
        <div className="py-10 border-b border-black/10"></div>
        <div></div>
      </div>
    </main>
  );
};

export default Messages;
