"use client";
2;
import React from "react";

const GiftcardStyle = ({ video, alt }: { video: string; alt: string }) => {
  return (
    <div className="rounded-2xl w-full h-[250px]">
      <video
        playsInline={true}
        preload="auto"
        loop={true}
        aria-label={alt}
        className="w-full h-full object-cover rounded-md cursor-pointer"
        onMouseEnter={(e) => e.currentTarget.play()}
        onMouseLeave={(e) => e.currentTarget.pause()}
        autoPlay={(e) => e.currentTarget.pause()}
        muted
      >
        <source src={video} className="" />
      </video>
    </div>
  );
};

export default GiftcardStyle;
