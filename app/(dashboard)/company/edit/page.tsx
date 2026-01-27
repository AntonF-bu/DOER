"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCurrentUser, getUserCompanies } from "@/lib/mock-data";
import { COMPANY_STAGES, INDUSTRIES } from "@/lib/constants";
import { Save, Loader2, Plus } from "lucide-react";

export default function CompanyEditPage() {
  const router = useRouter();
  const companies = getUserCompanies(mockCurrentUser.id);
  const company = companies[0];
  const [saving, setSaving] = useState(false);
  const isNew = !company;

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
    if (isNew) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{isNew ? "Create Company" : "Edit Company"}</CardTitle>
          <CardDescription>
            {isNew
              ? "Set up your company profile to start building in public"
              : "Update your company details"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="oneLiner">One-liner</Label>
            <Input
              id="oneLiner"
              value={formData.oneLiner}
              onChange={(e) => handleChange("oneLiner", e.target.value)}
              placeholder="Describe your company in one sentence"
              maxLength={140}
            />
            <p className="text-xs text-muted-foreground">{formData.oneLiner.length}/140</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Tell the story of what you're building..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Stage</Label>
              <Select value={formData.stage} onValueChange={(v) => handleChange("stage", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(COMPANY_STAGES).map(([key, val]) => (
                    <SelectItem key={key} value={key}>{val.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={formData.industry} onValueChange={(v) => handleChange("industry", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website</Label>
            <Input
              id="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => handleChange("websiteUrl", e.target.value)}
              placeholder="https://yourcompany.com"
            />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isOpenToInvestors}
                onChange={(e) => handleChange("isOpenToInvestors", e.target.checked)}
              />
              <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <div>
              <p className="text-sm font-medium">Open to investors</p>
              <p className="text-xs text-muted-foreground">
                Signal that you are open to investor conversations
              </p>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving || !formData.name} className="gap-2">
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isNew ? (
              <Plus className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isNew ? "Create Company" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
