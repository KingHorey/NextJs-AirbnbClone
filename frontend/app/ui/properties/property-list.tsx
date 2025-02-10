import React from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";

const PropertyList = () => {
  return (
    <main className="px-6  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 xs:grid-cols-1  gap-6 pt-4"></main>
  );
};

export default PropertyList;
