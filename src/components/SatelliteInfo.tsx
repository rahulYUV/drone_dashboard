import React from 'react';
import { Satellite, Signal } from 'lucide-react';
import { motion } from 'framer-motion';

interface SatelliteInfoProps {
  satellites: number;
  signalStrength: number;
}

export function SatelliteInfo({ satellites, signalStrength }: SatelliteInfoProps) {
  const getSignalColor = (strength: number) => {
    if (strength > 80) return 'text-green-500';
    if (strength > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Satellite className="w-5 h-5 text-blue-500" />
          <span className="font-semibold dark:text-white">Satellite Status</span>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm"
        >
          {satellites} Connected
        </motion.div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Signal Strength</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                initial={{ height: 0 }}
                animate={{ height: 16 }}
                className={`w-2 rounded-t-sm ${
                  signalStrength >= level * 25
                    ? getSignalColor(signalStrength)
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={{ transition: 'background-color 0.3s' }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Signal className={`w-4 h-4 ${getSignalColor(signalStrength)}`} />
          <span className="text-sm font-mono">{signalStrength}%</span>
        </div>
      </div>
    </div>
  );
}