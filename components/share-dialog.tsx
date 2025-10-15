"use client";

import * as React from "react";
import { CopyIcon, Link2Icon, Share2Icon, CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ShareDialog = ({ slug }: { slug: string }) => {
  const shareUrl = `https://shrly.cc/${slug}`;

  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 2000);
  }, [shareUrl]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="size-8">
          <Share2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <Link2Icon className="size-5" aria-hidden="true" />
            Share Link
          </DialogTitle>
          <DialogDescription>
            Copy the link below to share with others
          </DialogDescription>
        </DialogHeader>
        <Input readOnly value={shareUrl} className="font-mono select-all" />
        <DialogFooter>
          <Button onClick={handleCopy}>
            {copied ? (
              <>
                <CheckIcon className="size-4" aria-hidden="true" /> Copied!
              </>
            ) : (
              <>
                <CopyIcon className="size-4" aria-hidden="true" />
                Copy Link
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
