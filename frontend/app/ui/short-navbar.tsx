"use client";

import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
function Shortnavbar() {
  return (
    <motion.div
      className="bg-white w-96 h-11 rounded-full shadow-md border flex items-center cursor-pointer  justify-between divide-x hover:shadow-lg "
      transition={{
        duration: 0.9,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.0,
        shadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="pl-4 font-semibold text-sm ">Anywhere</h2>
      <h2 className="pl-8 font-semibold text-sm  ">Any week</h2>
      <div className="flex items-center gap-3 pr-2 pl-3 text-sm">
        <h2 className="text-gray-400">Add guests</h2>{" "}
        <div className="bg-red h-5 w-5 flex items-center justify-center rounded-full cursor-pointer">
          <SearchIcon stroke="white" height={10} />
        </div>
      </div>
    </motion.div>
  );
}

export default Shortnavbar;
