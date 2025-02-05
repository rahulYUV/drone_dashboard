import { io } from 'socket.io-client';

export const socket = io('ws://your-backend-url'); // Replace with your actual backend URL

export interface DroneData {
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  battery: number;
  heading: number;
  satellites: number;
  signalStrength: number;
}

export const connectSocket = (callback: (data: DroneData) => void) => {
  socket.on('droneData', callback);
  return () => {
    socket.off('droneData', callback);
  };
};