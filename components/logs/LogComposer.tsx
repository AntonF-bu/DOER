"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogTypeSelector } from "./LogTypeSelector";
import { LOG_TYPES, LogType } from "@/lib/constants";
import { mockCompanies, mockCurrentUser } from "@/lib/mock-data";

interface LogComposerProps {
  companyId?: string;
  defaultType?: LogType;
}

export function LogComposer({
  companyId,
  defaultType = "shipped",
}: LogComposerProps) {
  const router = useRouter();
  const [type, setType] = useState<LogType>(defaultType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState(companyId ?? "");
  const [submitting, setSubmitting] = useState(false);

  const userCompanies = mockCompanies.filter(
    (c) => c.owner_id === mockCurrentUser.id
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    // TODO: API call to create log
    await new Promise((r) => setTimeout(r, 1000));
    const company = mockCompanies.find((c) => c.id === selectedCompanyId);
    if (company) {
      router.push(`/company/${company.slug}`);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Log type selector */}
        <div>
          <LogTypeSelector selected={type} onSelect={setType} />
        </div>

        {/* Company selector if no companyId prop */}
        {!companyId && userCompanies.length > 1 && (
          <div>
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="" className="bg-card text-muted-foreground">
                Select a company
              </option>
              {userCompanies.map((company) => (
                <option
                  key={company.id}
                  value={company.id}
                  className="bg-card text-foreground"
                >
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Title input */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your log a title..."
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
            required
          />
        </div>

        {/* Content textarea */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={LOG_TYPES[type].prompt}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors min-h-[120px] resize-y"
          />
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="bg-primary text-primary-foreground rounded-lg px-6 py-2 font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Logging..." : "Log it"}
          </button>
        </div>
      </form>
    </div>
  );
}
