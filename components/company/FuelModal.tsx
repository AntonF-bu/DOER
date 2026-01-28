"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FuelModalProps {
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNT_OPTIONS = [5, 25, 100];

export function FuelModal({ companyName, isOpen, onClose }: FuelModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [message, setMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // TODO: API call to submit fuel contribution
    onClose();
    setSelectedAmount(25);
    setMessage("");
    setIsPublic(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto mt-[20vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium text-foreground">
            Add Fuel to {companyName}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Amount buttons */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {AMOUNT_OPTIONS.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`border rounded-lg py-4 text-center font-mono-nums text-lg transition-all cursor-pointer ${
                selectedAmount === amount
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 glow-box-fuel"
                  : "bg-secondary border-border/50 text-foreground hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* Message input */}
        <div className="mb-4">
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Message (optional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Keep building..."
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>

        {/* Public toggle */}
        <label className="flex items-center gap-2.5 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 rounded border-border bg-secondary accent-amber-500"
          />
          <span className="text-sm text-muted-foreground">
            Show my name publicly
          </span>
        </label>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedAmount}
          className="bg-amber-500 text-black font-medium rounded-lg px-6 py-2.5 w-full hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add ${selectedAmount || 0} Fuel
        </button>
      </div>
    </div>
  );
}
