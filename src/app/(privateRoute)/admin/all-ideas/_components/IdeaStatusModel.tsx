"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateIdeaStatus } from "../_actions";

// Spinner component
function Spinner({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} border-white mr-2`}
    />
  );
}

export default function IdeaStatusModal({ title ,id}: { title: string,id: string }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (action === "REJECTED" && feedback.trim() === "") {
      toast.error("Please provide feedback before rejecting.");
      return;
    }
    setLoading(true);

    const payload =
      action === "REJECTED"
        ? { status: "REJECTED", feedback }
        : { status: "APPROVED" };

    try {
      // Simulate sending to backend
      await updateIdeaStatus(id, payload);
      toast.success(`Status ${payload?.status} successfully!`);

      setLoading(false);
      setOpen(false);
      setFeedback("");
      setAction(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const handleAccept = () => {
    setAction("APPROVED");
    handleSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{title}</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {action === null && (
            <div className="flex gap-4">
              <Button onClick={()=>handleAccept()} disabled={loading}>
                {loading && <Spinner />}
                Approved
              </Button>
              <Button
                variant="destructive"
                onClick={() => setAction("REJECTED")}
                disabled={loading}
              >
                Reject
              </Button>
            </div>
          )}

          {action && action === "REJECTED" && (
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e?.target?.value)}
                placeholder="Why is it rejected?"
              />
            </div>
          )}
        </div>

        { action && action === "REJECTED" && (
          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Spinner />}
              Submit
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setAction(null);
                setFeedback("");
                setOpen(false);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
        {action === "APPROVED" && (
          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Spinner />}
              Accepting
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setAction(null);
                setFeedback("");
                setOpen(false);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}