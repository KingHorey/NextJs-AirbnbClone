/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";

import { reqFlow } from "@/lib/axiosApi";
import endpoints from "@/config/endpoints";
import PropertySkeleton from "./propertySkeleton";
import Properties from "./properties";

const PropertyList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => reqFlow(endpoints.properties.ALL_PROPERTIES(""), "GET"),
  });
  if (isLoading) {
    return <PropertySkeleton />;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return (
    <main className="px-6  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 xs:grid-cols-1  gap-6 pt-4">
      {data.data.map((property: any) => (
        <Properties
          key={property.id}
          id={property.id}
          rating={property.rating}
          images={property.images}
          bookmarked={property.bookmarked}
          location={`${property.address.town.name}, ${property.address.town.state.country.name}`}
          price_per_night={property.price_per_night}
        />
      ))}
    </main>
  );
};

export default PropertyList;
