import { Suspense } from "react";
import PropertyList from "@/app/ui/properties/property-list";

export default function HomePage() {
  return (
    <Suspense fallback={}>
      <PropertyList />
    </Suspense>
  );
}
