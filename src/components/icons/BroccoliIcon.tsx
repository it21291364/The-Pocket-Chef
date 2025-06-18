import React from 'react';

const BroccoliIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`inline-block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="hsl(var(--foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 12.5C14.5 10.2909 16.2909 8.5 18.5 8.5C20.7091 8.5 22.5 10.2909 22.5 12.5C22.5 13.4351 22.1893 14.2915 21.666 15H17.334C16.8107 14.2915 16.5 13.4351 16.5 12.5Z" fill="#A7E9C4" />
      <path d="M7.5 12.5C7.5 10.2909 9.29086 8.5 11.5 8.5C13.7091 8.5 15.5 10.2909 15.5 12.5C15.5 13.4351 15.1893 14.2915 14.666 15H10.334C9.81071 14.2915 9.5 13.4351 9.5 12.5Z" fill="#A7E9C4" />
      <path d="M11 15.5C11 13.8431 12.3431 12.5 14 12.5C15.6569 12.5 17 13.8431 17 15.5C17 16.1956 16.7893 16.8377 16.428 17.334H13.572C13.2107 16.8377 13 16.1956 13 15.5Z" fill="#A7E9C4" />
      <line x1="12" y1="17" x2="12" y2="22" strokeWidth="2" />
      {/* Winking eye */}
      <circle cx="10" cy="11.5" r="0.5" fill="hsl(var(--foreground))" stroke="none"/>
      <path d="M13.5 11 H 15" strokeWidth="1" />
    </svg>
  );
};

export default BroccoliIcon;

    