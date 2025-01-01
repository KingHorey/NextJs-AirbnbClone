"use client";

import React from "react";

import { motion } from "framer-motion";

const Home = () => {
  const heroText = "Airbnb";
  const cards = "gift cards";
  return (
    <div className="overflow-hidden flex items-center justify-center min-h-[50%] flex-col space-y-1 leading-snug py-3">
      <div className="w-3/4 mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            delay: 0.08,
          }}
          className="text-black/80 font-extrabold text-[10rem] h-full"
        >
          {heroText}
        </motion.span>
        <br />
        <div className="overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.08,
            }}
            className="text-black/80 font-extrabold text-[10rem]"
          >
            {cards}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Home;
