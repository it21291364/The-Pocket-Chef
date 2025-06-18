import React from 'react';

const JuiceBoxIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`inline-block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="hsl(var(--primary))" 
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      {/* Straw */}
      <line x1="15" y1="3" x2="18" y2="1" />
      <line x1="18" y1="1" x2="18" y2="6" />
      {/* Smile */}
      <path d="M9 14 Q12 16 15 14" strokeWidth="1" />
      <circle cx="9" cy="11" r="0.5" fill="hsl(var(--primary-foreground))" stroke="none" />
      <circle cx="15" cy="11" r="0.5" fill="hsl(var(--primary-foreground))" stroke="none" />
      {/* Label decoration */}
      <path d="M7 7 H 17" strokeDasharray="2 2" strokeWidth="1" />
      <path d="M12 8 L 12 10 M10 9 L 14 9" strokeWidth="1" />
    </svg>
  );
};

export default JuiceBoxIcon;

    