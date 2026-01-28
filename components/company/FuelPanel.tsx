"use client";

import { useState } from "react";
import { Company, FuelContribution } from "@/types";
import { FuelModal } from "./FuelModal";

interface FuelPanelProps {
  company: Company;
  contributions: FuelContribution[];
}

function formatTotal(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

export function FuelPanel({ company, contributions }: FuelPanelProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-card/50 border border-border/50 rounded-xl p-5">
        {/* Header */}
        <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
          Fuel
        </span>

        {/* Total */}
        <div className="mt-2">
          <span className="font-mono-nums text-3xl text-amber-400 text-glow-fuel">
            {formatTotal(company.fuel_total)}
          </span>
        </div>

        {/* Backer count */}
        <p className="text-sm text-muted-foreground mt-1">
          {company.fuel_count} backers
        </p>

        {/* Add Fuel button */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 rounded-lg px-4 py-2 text-sm font-medium w-full mt-4 transition-colors"
        >
          Add Fuel
        </button>

        {/* Recent contributions */}
        {contributions.length > 0 && (
          <div className="mt-5">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Recent
            </span>
            <div className="mt-2">
              {contributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <div>
                    <span className="text-sm text-foreground">
                      {contribution.is_public && contribution.user
                        ? contribution.user.full_name || contribution.user.username
                        : "Anonymous"}
                    </span>
                    {contribution.message && (
                      <p className="text-xs text-muted-foreground italic mt-0.5">
                        {contribution.message}
                      </p>
                    )}
                  </div>
                  <span className="font-mono-nums text-sm text-amber-400 shrink-0 ml-3">
                    ${contribution.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FuelModal
        companyName={company.name}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
