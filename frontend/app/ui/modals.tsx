import React from "react";
import { motion } from "framer-motion";

const Modals = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="min-w-[100vw] min-h-screen backdrop-blur-xs top-0 left-0 fixed flex items-center justify-center z-[9999999]"
    >
      {children}
    </motion.div>
  );
};

export default Modals;
