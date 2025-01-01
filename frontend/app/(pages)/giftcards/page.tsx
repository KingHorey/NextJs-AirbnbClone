import Home from "@/app/ui/giftcards/home";
import { Button } from "@/components/ui/button";
import React from "react";

import Image from "next/image";
import AirBnbLogo from "@/app/ui/logo";
import Link from "next/link";
import GiftcardStyle from "@/app/ui/giftcards/giftcard-style";

const giftcards = [
  {
    video:
      "https://stream.media.muscache.com/AC1nglJqMoJDPvX2N01G8AfusWgwNnny01gUzxXk3T01fk.mp4?v_q=low",
    label:
      "Gift card illustration of two people cuddle on a couch in front of a floor-to-ceiling window, while watching fireworks burst above a city skyline with skyscrapers in the background. A white Airbnb logo is in the center",
  },
  {
    video:
      "https://stream.media.muscache.com/1TYkvpzD7k5lSTDRnxdpRsbyINlLF00ASlVeTlzHEtRs.mp4?v_q=low",
    label: "",
  },
  {
    label:
      "Gift card with an illustration of a  white Airbnb logo in the center of a solid red background",
    video:
      "https://stream.media.muscache.com/uE02h8HF1502wxWefmrCQFSSZCIeE6L2uylaQeJs5hs1A.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of three people in a paddle boat floating across a small body of water towards a small house in the distance. Underneath a pink sky, trees rise out of the water and lanterns float on the surface. The Airbnb logo is in the center.",
    video:
      "https://stream.media.muscache.com/dKZ02Kegi3Ip8K5wbaMHdQbNPN01OTbLcCxhj2tXiiXvw.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of two people standing outside at dusk surrounded by trees and succulents. They are hanging lanterns in the largest tree. The Airbnb logo is in the center.",
    video:
      "https://stream.media.muscache.com/VEAwNHCSPZGuJBtUDNaO5zrXt413Vmap1RB7ICKAgEE.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of three houses on pylons surrounded by water with clouds overhead in the sky. People sit on lawn chairs on their decks as seagulls fly overhead. The Airbnb logo is in the center.",
    video:
      "https://stream.media.muscache.com/cld02CThFwZ024C7veQ01Ns1tuIgrxwS01RiZzJ00B6NHPIs.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of a person on a dog sled being pulled by 6 dogs across a snowy landscape. In the background are pine trees, four igloos and some snowy mountains. The Airbnb logo is in the center.",
    video:
      "https://stream.media.muscache.com/Hj36haiI4IbYNq2K02VTKQzn02E8xAS5ApVpG4H8dTrzc.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of five people sitting in a natural hot spring surrounded by rocks and rising green hills. A bamboo spout drips water into the spring and a bathhouse can be seen in the distance. The Airbnb logo is in the center.",
    video:
      "https://stream.media.muscache.com/9SK8y1ILEuOV0202zENbFoEWNZJnOIi7JKnxZc7soXRig.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of a person on a horse in the middle of a grassy plain under a blue sky. The rider is looking forward towards two yurts, another horse and a grassy hill. A bird flies overhead. The Airbnb",
    video:
      "https://stream.media.muscache.com/cp02n9s4vqs00AHpu6TU00F01Aljgh4NXytm7mpGOBI2TCQ.mp4?v_q=low",
  },
  {
    label:
      "Gift card illustration of four people, two sitting in lawn chairs, one sitting on a towel poolside and the fourth is jumping into the pool. Behind them is a three-story house and some trees. The Airbnb logo is in the center.",
    video:
      "https://stream.media.muscache.com/Nu8UQRKvUe2vBIR6HvOkfnqICtBiWsEBEs28J0035Xek.mp4?v_q=low",
  },
];
const Page = () => {
  return (
    <main className="flex flex-col justify-center">
      <Home />
      <div>
        <div className="mx-auto w-4/5 text-center p-5">
          <Button className="w-fit bg-red rounded-full p-8 font-semibold text-base">
            Buy now
          </Button>
        </div>
      </div>

      <section className="space-y-5 text-center p-10">
        <div className="w-4/5 mx-auto">
          <h2 className="text-6xl w-fit mx-auto font-extrabold pb-10 px-5">
            You give. They go.
          </h2>
          <div className="space-y-3">
            <p className="p-3 text-base">
              Bring the world of Airbnb to friends and family. Celebrate
              holidays, recognize important moments, and inspire travel. Help
              them go wherever, whenever, since they never expire.
              <br />
              <br />
              Purchasing for business?
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="underline hover:bg-gray-300/50 p-3 rounded-md duration-150 font-semibold"
        >
          Buy gift cards in bulks
        </Link>
      </section>
      <section className="text-center p-10">
        <h2 className="text-3xl w-fit mx-auto font-extrabold pb-10 px-5">
          Pick your design
        </h2>
        <div className="grid grid-cols-3 gap-10 grid-rows-4">
          {giftcards.map(({ video, label }, index: number) => (
            <GiftcardStyle video={video} alt={label} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
