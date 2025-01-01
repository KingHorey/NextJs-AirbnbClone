"use client";

import { AnimatePresence } from "framer-motion";
import Authentication from "./authentication";
import { useAppContext } from "@/app/utils/context";

const AuthDisplay = () => {
  const { authModal } = useAppContext();

  return (
    <AnimatePresence mode="wait">
      {authModal && <Authentication />}
    </AnimatePresence>
  );
};

export default AuthDisplay;
