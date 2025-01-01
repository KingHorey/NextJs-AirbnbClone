import React from "react";
import FooterComponent from "./show/[id]/custom-footer";
import "../../globals.css";

import { manRope } from "@/app/utils/font";
import Navbar from "@/app/ui/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${manRope.className} max-w-[1500px]`}>
        <Navbar />
        <div>
          {children}
          <FooterComponent />
        </div>
      </body>
    </html>
  );
}
