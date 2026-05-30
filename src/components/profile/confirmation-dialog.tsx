'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog';
import { Input } from '#/components/ui/input';
import { cn } from '#/lib/utils';
import { useState } from 'react';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  requireConfirmation?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = 'Cancel',
  requireConfirmation,
  isDestructive = false,
  isLoading = false,
  onConfirm,
}: ConfirmationDialogProps) {
  const [confirmationInput, setConfirmationInput] = useState('');

  const isConfirmed =
    !requireConfirmation || confirmationInput === requireConfirmation;

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm();
      setConfirmationInput('');
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {requireConfirmation && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">
              Type{' '}
              <span className="font-mono font-semibold">
                {requireConfirmation}
              </span>{' '}
              to confirm:
            </p>
            <Input
              className="w-full"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              autoFocus
            />
          </div>
        )}
        <div className="flex justify-end gap-3">
          <AlertDialogCancel className="rounded-full" disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmed || isLoading}
            className={cn(
              'rounded-full',
              isDestructive
                ? 'bg-red-500 text-white/90 hover:bg-red-600 disabled:bg-red-400'
                : '',
            )}
          >
            {isLoading ? 'Loading...' : confirmText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
