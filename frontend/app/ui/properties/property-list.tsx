import React from "react";

const PropertyList = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid w-full lg:grid-cols-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-10">
      {children}
    </main>
  );
};

export default PropertyList;
