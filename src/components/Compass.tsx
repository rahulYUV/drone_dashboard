import React from "react";
import { motion } from "framer-motion";

interface CompassProps {
  heading: number;
}

export function Compass({ heading }: CompassProps) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outer Compass Circle */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-center justify-center">
        {directions.map((direction, index) => {
          const angle = index * 45;
          const isMainDirection = index % 2 === 0;
          return (
            <div
              key={direction}
              className={`absolute font-mono ${
                isMainDirection ? "font-bold text-lg" : "text-xs text-gray-500"
              }`}
              style={{
                transform: `rotate(${angle}deg) translate(0, -60px) rotate(-${angle}deg)`,
              }}
            >
              {direction}
            </div>
          );
        })}
      </div>

      {/* Compass Needle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: heading }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-transparent absolute top-[16px] left-1/2 -translate-x-1/2 origin-bottom" />
      </motion.div>

      {/* Heading Value Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-sm font-mono bg-white px-2 py-1 rounded shadow-md">
          {Math.round(heading)}°
        </div>
      </div>
    </div>
  );
}
