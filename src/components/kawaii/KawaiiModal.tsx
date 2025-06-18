"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KawaiiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const KawaiiModal: React.FC<KawaiiModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="dialog-overlay-pastel backdrop-blur-sm" />
      <DialogContent className="sm:max-w-lg bg-background rounded-2xl shadow-kawaii-lg p-6 modal-content-boing">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-headline text-primary">{title}</DialogTitle>
        </DialogHeader>
        <div className="text-foreground font-body max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>
        <DialogClose asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 rounded-full h-8 w-8"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default KawaiiModal;

    