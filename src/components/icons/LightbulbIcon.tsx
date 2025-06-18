import React from 'react';
import { Lightbulb } from 'lucide-react';

const HappyLightbulbIcon = ({ className }: { className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <Lightbulb size={24} className="text-yellow-400 fill-yellow-200" />
       {/* Simple smile overlay - adjust positioning as needed */}
      <svg viewBox="0 0 24 24" width="12" height="12" className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2" fill="hsl(var(--foreground))">
         <path d="M3 7 Q6 9 9 7" stroke="hsl(var(--foreground))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default HappyLightbulbIcon;

    