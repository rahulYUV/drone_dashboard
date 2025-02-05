import { useState, useEffect } from "react";
import { Bone as Drone } from "lucide-react";
import { MapComponent } from "./components/MapComponent";
import { Dashboard } from "./components/Dashboard";
import { ThemeToggle } from "./components/ThemeToggle";
import { Navbar } from "./components/Navbar";
import { Compass } from "./components/Compass"; // Import Compass Component
import { connectSocket, DroneData } from "./lib/socket";
import { motion } from "framer-motion";

const initialDroneData: DroneData = {
  latitude: 18.51957000,
  longitude: 73.85535000,
  altitude: 0,
  speed: 0,
  battery: 100,
  heading: 0,
  satellites: 0,
  signalStrength: 0,
};

function App() {
  const [droneData, setDroneData] = useState<DroneData>(initialDroneData);
  const [isDark, setIsDark] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);

  useEffect(() => {
    // Set the page title
    document.title = "Drone Tracker :: Dashboard";
  }, []);

  useEffect(() => {
    const cleanup = connectSocket((data) => {
      setDroneData(data);
      setHasNewData(true);
      setTimeout(() => setHasNewData(false), 1000);
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <div className="ml-[72px] lg:ml-[240px]">
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Drone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-xl font-bold dark:text-white">
                  Drone Tracker
                </span>
              </motion.div>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 h-[600px]">
              <MapComponent
                latitude={droneData.latitude}
                longitude={droneData.longitude}
                altitude={droneData.altitude}
                hasNewData={hasNewData}
              />
            </div>
            <div className="lg:col-span-1">
              <Dashboard data={droneData} hasNewData={hasNewData} />

              {/* Compass Component - Added Here */}
              <div className="mt-6 flex justify-center">
                <Compass heading={droneData.heading} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
