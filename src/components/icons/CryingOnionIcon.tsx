import React from 'react';

const CryingOnionIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      className={`inline-block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="hsl(var(--destructive))" 
      stroke="hsl(var(--destructive-foreground))"
      strokeWidth="1"
    >
      <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 18 12 22C15.3137 18 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z" />
      {/* Eyes */}
      <line x1="9" y1="9" x2="10" y2="10" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="9" x2="9" y2="10" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="9" x2="15" y2="10" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="9" x2="14" y2="10" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Mouth */}
      <path d="M9 14 Q12 13 15 14" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Tears */}
      <circle cx="8" cy="12" r="1" fill="hsl(200 100% 70%)" className="animate-cry" style={{ animationDelay: '0s' }} stroke="none" />
      <circle cx="16" cy="12" r="1" fill="hsl(200 100% 70%)" className="animate-cry" style={{ animationDelay: '0.3s' }} stroke="none" />
    </svg>
  );
};

export default CryingOnionIcon;

    