"use client";

import React from "react";

import { SlidersHorizontalIcon } from "lucide-react";

const Filters = () => {
  return (
    <div className="p-3 border rounded-2xl cursor-pointer hover:bg-gray-400/20">
      <div className="flex items-center justify-center gap-x-3 font-semibold text-sm">
        <SlidersHorizontalIcon size={16} /> Filter
      </div>
    </div>
  );
};

export default Filters;
