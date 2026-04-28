import React from 'react';
import { MapPin as PinIcon } from 'lucide-react';

const MapPin = ({ color = '#3730A3' }) => {
  return (
    <div className="relative flex items-center justify-center">
      <PinIcon size={32} color={color} fill={color} fillOpacity={0.2} />
      <div className="absolute -bottom-1 w-2 h-1 bg-black/20 rounded-full blur-[1px]"></div>
    </div>
  );
};

export default MapPin;
