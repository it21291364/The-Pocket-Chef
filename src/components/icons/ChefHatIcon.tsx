import React from 'react';

const ChefHatIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 100 100"
      className={`inline-block animate-chef-hat-wobble ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M78,45 C78,35.0589 70.9411,28 62,28 C60.4089,28 58.8919,28.2558 57.4729,28.7246 C57.1309,23.4495 52.9257,19 47.5,19 C42.0743,19 37.8691,23.4495 37.5271,28.7246 C36.1081,28.2558 34.5911,28 33,28 C24.0589,28 17,35.0589 17,45 C17,45.3332 17.0155,45.661 17.0452,45.9844 C17.0155,46.3078 17,46.6356 17,46.9688 C17,56.9101 24.0589,64 33,64 L62,64 C70.9411,64 78,56.9101 78,46.9688 C78,46.6356 77.9845,46.3078 77.9548,45.9844 C77.9845,45.661 78,45.3332 78,45Z" stroke="hsl(var(--foreground))" strokeWidth="3" fill="hsl(var(--background))"/>
      <rect x="15" y="60" width="65" height="15" rx="5" ry="5" stroke="hsl(var(--foreground))" strokeWidth="3" fill="hsl(var(--primary))" />
      {/* Smile */}
      <path d="M35 50 Q47.5 55 60 50" stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="38" cy="42" r="3" fill="hsl(var(--foreground))" />
      <circle cx="57" cy="42" r="3" fill="hsl(var(--foreground))" />
    </svg>
  );
};

export default ChefHatIcon;

    