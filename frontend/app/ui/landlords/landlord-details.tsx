import React from "react";

import {
  GlobeIcon,
  PawPrintIcon,
  MusicIcon,
  GraduationCapIcon,
  BookOpenIcon,
  LightbulbIcon,
  ClockIcon,
  CakeIcon,
  LanguagesIcon,
  BriefcaseIcon,
} from "lucide-react";

const userDetails = [
  {
    icon: <GlobeIcon size={22} />,
    text: "Loves to travel the world",
  },
  {
    icon: <PawPrintIcon size={22} />,
    text: "Has a pet dog named Max",
  },
  {
    icon: <MusicIcon size={22} />,
    text: "Enjoys playing the guitar",
  },
  {
    icon: <GraduationCapIcon size={22} />,
    text: "Graduated from Harvard University",
  },
  {
    icon: <BookOpenIcon size={22} />,
    text: "Avid reader of mystery novels",
  },
  {
    icon: <LightbulbIcon size={22} />,
    text: "Innovative thinker and problem solver",
  },
  {
    icon: <ClockIcon size={22} />,
    text: "Punctual and values time management",
  },
  {
    icon: <CakeIcon size={22} />,
    text: "Loves baking cakes and pastries",
  },
  {
    icon: <LanguagesIcon size={22} />,
    text: "Speaks five different languages",
  },
];

const LandlordDetails = () => {
  return (
    <div className="space-y-10 w-full p-10 min-h-full max-h-full overflow-scroll border-b border-black/10">
      <h2 className="text-3xl font-bold">About User</h2>
      <div className="flex p-2 gap-x-5">
        <div className="flex items-center gap-x-2 w-full">
          <BriefcaseIcon size={20} />
          <p>Works as a CEO:</p>
        </div>
        <div className="flex items-center gap-x-2 w-full">
          <GlobeIcon />
          <p>Lives in Lagos, Nigeria</p>
        </div>
      </div>
      <p className="w-full line-clamp-5 font-normal text-lg">
        I was born and raised in Florence, in the historic center, in Via dei
        Tavolini, in the middle between the Duomo and Palazzo Vecchio. Where I
        played football was Piazza Signoria and it was perfectly normal for me
        and my friends to use the base of the statue with the horse as one of
        the two doors. The policemen tried to send us away, but we always came
        back, because that was our square where to play football and the base of
        the statue with the horse was our door. Only many years later I
        discovered…
      </p>
      <div className="grid grid-cols-2 gap-5">
        {userDetails.map((detail, index: number) => (
          <div className="flex items-center gap-x-3" key={index}>
            {detail.icon}
            <p>{detail.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandlordDetails;
