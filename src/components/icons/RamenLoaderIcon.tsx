import React from 'react';

const RamenLoaderIcon = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width="100" height="80" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        {/* Bowl */}
        <path d="M10 40 C10 60, 30 75, 50 75 C70 75, 90 60, 90 40 L10 40 Z" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <path d="M10 40 Q50 30, 90 40" stroke="hsl(var(--primary-foreground))" fill="transparent" strokeWidth="1.5"/>
        <path d="M20 45 Q50 35, 80 45" stroke="hsl(var(--primary-foreground))" fill="transparent" strokeWidth="1.5"/>
        
        {/* Steam */}
        <g fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round">
          <path d="M35 35 Q40 25 45 35" className="animate-steam-1" />
          <path d="M50 38 Q55 28 60 38" className="animate-steam-2" />
          <path d="M65 35 Q70 25 75 35" className="animate-steam-3" />
        </g>
         {/* Chopsticks */}
        <line x1="65" y1="15" x2="85" y2="35" stroke="hsl(var(--muted-foreground))" strokeWidth="4" strokeLinecap="round" transform="rotate(10 75 25)" />
        <line x1="70" y1="10" x2="90" y2="30" stroke="hsl(var(--muted-foreground))" strokeWidth="4" strokeLinecap="round" transform="rotate(10 80 20)" />
      </svg>
      <p className="text-sm font-medium text-foreground mt-2 font-body">Mixing up some magic...</p>
    </div>
  );
};

export default RamenLoaderIcon;

    