"use client";

import { Button } from "@/components/ui/button";

interface LogoutConfirmDialogProps {
  walletName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmDialog({
  walletName,
  onConfirm,
  onCancel,
}: LogoutConfirmDialogProps) {
  return (
    <div
      className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border-2 border-red-200 rounded-lg shadow-xl z-50"
      onClick={(e) => e.stopPropagation()}
      data-logout-confirm
    >
      <div className="space-y-3">
        <p className="text-sm font-medium text-red-700">
          Are you sure you want to disconnect {walletName}?
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="text-xs px-3 py-1"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            className="text-xs px-3 py-1"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
}
