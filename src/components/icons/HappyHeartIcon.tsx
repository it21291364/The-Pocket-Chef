import React from 'react';
import { Heart } from 'lucide-react';

const HappyHeartIcon = ({ className }: { className?: string }) => {
  return (
     <Heart size={22} className={`inline-block text-pink-500 fill-pink-300 ${className}`} />
  );
};
export default HappyHeartIcon;

    