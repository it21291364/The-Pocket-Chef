import React from 'react';

const FryingPanIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`inline-block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 16H2V10C2 6.68629 4.68629 4 8 4H16C19.3137 4 22 6.68629 22 10V16H16" strokeWidth="2" />
      <path d="M12 16V19C12 20.1046 11.1046 21 10 21H6C4.89543 21 4 20.1046 4 19V16" strokeWidth="2" fill="hsl(var(--primary))" />
      {/* Smile */}
      <path d="M7 12Q10 13.5 13 12" strokeWidth="1" />
      <circle cx="8" cy="10" r="0.5" fill="hsl(var(--foreground))" stroke="none" />
      <circle cx="12" cy="10" r="0.5" fill="hsl(var(--foreground))" stroke="none" />
    </svg>
  );
};

export default FryingPanIcon;

    