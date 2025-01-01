import LandlordDetails from "@/app/ui/landlords/landlord-details";
import LandlordImageCard from "@/app/ui/landlords/landlord-image-card";
import LandlordListings from "@/app/ui/landlords/landlord-listings";
import LandlordReviews from "@/app/ui/landlords/landlord-reviews";
import { FlagIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="p-10">
      <section className="flex items-center gap-x-5 min-h-svh max-h-svh overflow-scroll">
        <section
          id="user-information"
          className="min-w-[380px] max-w-[380px] flex-auto space-y-5 sticky top-0"
        >
          <LandlordImageCard />
          <div className="flex items-center justify-center">
            <FlagIcon size={20} />
            <Link href="#" className="underline font-semibold">
              Report this profile
            </Link>
          </div>
        </section>
        <section className="w-full overflow-scroll">
          <LandlordDetails />
          <LandlordReviews />
        </section>
      </section>
    </main>
  );
};

export default Page;
