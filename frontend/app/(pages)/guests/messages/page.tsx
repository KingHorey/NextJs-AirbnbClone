import React from "react";

import type { Metadata } from "next";
import Messages from "./messages";

export const metadata: Metadata = {
  title: "Messages",
};

const Page = () => {
  return (
    <div>
      <Messages />
    </div>
  );
};

export default Page;
