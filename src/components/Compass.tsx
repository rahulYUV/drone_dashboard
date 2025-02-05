import React from 'react';
import { motion } from 'framer-motion';

interface CompassProps {
  heading: number;
}

export function Compass({ heading }: CompassProps) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600">
        {directions.map((direction, index) => {
          const angle = index * 45;
          const isMainDirection = index % 2 === 0;
          return (
            <div
              key={direction}
              className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                isMainDirection ? 'font-bold' : 'text-sm text-gray-500'
              }`}
              style={{
                top: '10%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-40px) rotate(-${angle}deg)`,
              }}
            >
              {direction}
            </div>
          );
        })}
      </div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: heading }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-transparent absolute top-0 left-1/2 -translate-x-1/2 origin-bottom" />
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-sm font-mono">{Math.round(heading)}°</div>
      </div>
    </div>
  );
}