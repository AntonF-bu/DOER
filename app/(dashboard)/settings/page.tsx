"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCurrentUser, getUserCompanies } from "@/lib/mock-data";
import { Save, Loader2, Link as LinkIcon, Github, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const user = mockCurrentUser;
  const companies = getUserCompanies(user.id);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" defaultValue={user.full_name || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={user.username} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" defaultValue={user.bio || ""} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue={user.role}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="talent">Talent</SelectItem>
                <SelectItem value="collaborator">Collaborator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Company Settings */}
      {companies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company</CardTitle>
            <CardDescription>Edit your company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.stage}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/company/edit">Edit</a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Integrations</CardTitle>
          <CardDescription>Connect external services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: Github, name: "GitHub", desc: "Auto-log commits and deployments", connected: false },
            { icon: CreditCard, name: "Stripe", desc: "Share revenue metrics", connected: false },
            { icon: LinkIcon, name: "Linear", desc: "Sync project milestones", connected: false },
          ].map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <integration.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">{integration.desc}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notifications</CardTitle>
          <CardDescription>Manage email preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "New followers",
            "Comments on your logs",
            "Feedback poll results",
            "Weekly execution digest",
          ].map((pref) => (
            <div key={pref} className="flex items-center justify-between">
              <span className="text-sm">{pref}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
