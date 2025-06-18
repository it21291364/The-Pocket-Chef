import React from 'react';

const AnimatedChefCharacterIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="50"
      height="70"
      viewBox="0 0 50 70"
      className={`inline-block animate-chef-sway ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chef Hat */}
      <path
        d="M25 0 C15 0, 10 5, 10 15 Q10 25, 15 25 L35 25 Q40 25, 40 15 C40 5, 35 0, 25 0 Z"
        fill="hsl(var(--background))"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />
      <rect x="10" y="22" width="30" height="8" rx="2" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="1.5"/>

      {/* Head */}
      <circle cx="25" cy="38" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5"/>

      {/* Eyes */}
      <circle cx="21" cy="36" r="1.5" fill="hsl(var(--foreground))" />
      <circle cx="29" cy="36" r="1.5" fill="hsl(var(--foreground))" />

      {/* Smile */}
      <path d="M22 41 Q25 44 28 41" stroke="hsl(var(--foreground))" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* Body */}
      <ellipse cx="25" cy="58" rx="12" ry="10" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="1.5"/>
    </svg>
  );
};

export default AnimatedChefCharacterIcon;
