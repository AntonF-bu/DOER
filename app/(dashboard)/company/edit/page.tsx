"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockCurrentUser, getUserCompanies } from "@/lib/mock-data";
import { INDUSTRIES, COMPANY_STAGES } from "@/lib/constants";

export default function CompanyEditPage() {
  const router = useRouter();
  const companies = getUserCompanies(mockCurrentUser.id);
  const company = companies[0];
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: company?.name || "",
    oneLiner: company?.one_liner || "",
    description: company?.description || "",
    stage: company?.stage || "idea",
    industry: company?.industry || "",
    location: company?.location || "",
    websiteUrl: company?.website_url || "",
    isOpenToInvestors: company?.is_open_to_investors || false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    if (!company) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Edit Company</h1>
        <p className="text-muted-foreground">Update your company details.</p>
      </div>

      <div className="bg-card/50 border border-border/50 rounded-xl p-6 space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm text-muted-foreground mb-1.5">
            Company name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your company name"
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* One-liner */}
        <div>
          <label htmlFor="oneLiner" className="block text-sm text-muted-foreground mb-1.5">
            One-liner
          </label>
          <input
            id="oneLiner"
            type="text"
            value={formData.oneLiner}
            onChange={(e) => handleChange("oneLiner", e.target.value)}
            placeholder="Describe your company in one sentence"
            maxLength={140}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
          <p className="text-xs text-muted-foreground mt-1">{formData.oneLiner.length}/140</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm text-muted-foreground mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Tell the story of what you're building..."
            rows={4}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none"
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm text-muted-foreground mb-1.5">
            Industry
          </label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50"
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Stage */}
        <div>
          <label htmlFor="stage" className="block text-sm text-muted-foreground mb-1.5">
            Stage
          </label>
          <select
            id="stage"
            value={formData.stage}
            onChange={(e) => handleChange("stage", e.target.value)}
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50"
          >
            {Object.entries(COMPANY_STAGES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="websiteUrl" className="block text-sm text-muted-foreground mb-1.5">
            Website
          </label>
          <input
            id="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => handleChange("websiteUrl", e.target.value)}
            placeholder="https://yourcompany.com"
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm text-muted-foreground mb-1.5">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, Country"
            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Open to investors toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.isOpenToInvestors}
              onChange={(e) => handleChange("isOpenToInvestors", e.target.checked)}
            />
            <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
          <div>
            <p className="text-sm font-medium text-foreground">Open to investors</p>
            <p className="text-xs text-muted-foreground">
              Signal that you are open to investor conversations
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving || !formData.name}
          className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
