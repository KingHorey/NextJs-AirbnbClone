"use client";

import CategoriesFilter from "./ui/categories-fIlter";
import Filters from "./ui/filters";
import TaxFiltering from "./ui/tax-filtering";
import PropertyList from "./ui/properties/property-list";
import Properties from "./ui/properties/properties";

export default function Home() {
  return (
    <main className="w-11/12 mx-auto relative">
      <div className="flex items-center lg:space-x-16 xs:flex-col lg:flex-row sticky top-28">
        <CategoriesFilter />
        <Filters />
        <TaxFiltering />
      </div>

      <PropertyList>
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
        <Properties />
      </PropertyList>
    </main>
  );
}
