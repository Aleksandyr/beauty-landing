import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface ManusDialogProps {
  title?: string;
  logo?: string;
  open?: boolean;
  onLogin: () => void;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export function ManusDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: ManusDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        bodyScroll={false}
        className="w-[400px] gap-0 rounded-[20px] border border-neutral-700 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-0 py-5 text-center text-neutral-200 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col items-center gap-2 p-5 pt-2">
          {logo ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-none border border-neutral-700 bg-neutral-900">
              <img src={logo} alt="Dialog graphic" className="h-10 w-10 rounded-none" />
            </div>
          ) : null}

          {/* Title and subtitle */}
          {title ? (
            <DialogTitle className="text-xl font-semibold leading-[26px] tracking-[-0.44px] text-neutral-100">
              {title}
            </DialogTitle>
          ) : null}
          <DialogDescription className="text-sm leading-5 tracking-[-0.154px] text-neutral-400">
            Please login with Manus to continue
          </DialogDescription>
        </div>

        <DialogFooter className="px-5 py-5">
          {/* Login button */}
          <Button
            onClick={onLogin}
            className="h-10 w-full rounded-[10px] border border-[#D4AF37] bg-[#D4AF37] text-sm font-medium leading-5 tracking-[-0.154px] text-black hover:border-[#b8941f] hover:bg-[#b8941f] hover:text-white"
          >
            Login with Manus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
