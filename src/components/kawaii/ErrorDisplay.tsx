import React from 'react';
import CryingOnionIcon from '@/components/icons/CryingOnionIcon';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      className="bg-destructive/20 border border-destructive text-destructive-foreground p-4 rounded-2xl flex items-center gap-3 my-6 shadow-kawaii"
      role="alert"
    >
      <CryingOnionIcon className="h-10 w-10 shrink-0" />
      <p className="font-medium text-destructive font-body">{message}</p>
    </div>
  );
};

export default ErrorDisplay;

    