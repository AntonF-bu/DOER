"use client";

import { useState } from "react";
import { mockCurrentUser } from "@/lib/mock-data";
import { INDUSTRIES, COMPANY_STAGES } from "@/lib/constants";

export default function SettingsPage() {
  const user = mockCurrentUser;
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-card/50 border border-border/50 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm text-muted-foreground mb-1.5">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              defaultValue={user.full_name || ""}
              placeholder="Your full name"
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm text-muted-foreground mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              defaultValue={user.username}
              placeholder="username"
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm text-muted-foreground mb-1.5">
              Bio
            </label>
            <textarea
              id="bio"
              defaultValue={user.bio || ""}
              placeholder="Tell the world about yourself"
              rows={3}
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Company Section */}
      <div className="bg-card/50 border border-border/50 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Company</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm text-muted-foreground mb-1.5">
              Company name
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="Your company name"
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="oneLiner" className="block text-sm text-muted-foreground mb-1.5">
              One-liner
            </label>
            <input
              id="oneLiner"
              type="text"
              placeholder="What does your company do?"
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm text-muted-foreground mb-1.5">
              Industry
            </label>
            <select
              id="industry"
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
          <div>
            <label htmlFor="stage" className="block text-sm text-muted-foreground mb-1.5">
              Stage
            </label>
            <select
              id="stage"
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50"
            >
              {Object.entries(COMPANY_STAGES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-medium text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back.
        </p>
        <button className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm hover:bg-red-500/20 transition-colors">
          Delete Account
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
