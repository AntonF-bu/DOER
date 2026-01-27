"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogTypeSelector } from "./LogTypeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LOG_TYPES, LogType } from "@/lib/constants";
import { mockCompanies, mockCurrentUser } from "@/lib/mock-data";
import { Send, Loader2 } from "lucide-react";

export function LogComposer() {
  const router = useRouter();
  const [type, setType] = useState<LogType>("shipped");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userCompanies = mockCompanies.filter(
    (c) => c.owner_id === mockCurrentUser.id
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !companyId) return;

    setSubmitting(true);
    // TODO: API call to create log
    await new Promise((r) => setTimeout(r, 1000));
    const company = mockCompanies.find((c) => c.id === companyId);
    if (company) {
      router.push(`/company/${company.slug}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>What type of update is this?</Label>
            <LogTypeSelector value={type} onChange={setType} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Select value={companyId} onValueChange={setCompanyId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {userCompanies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">{LOG_TYPES[type].prompt}</Label>
            <Input
              id="title"
              placeholder="Give your log a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Details (optional)</Label>
            <Textarea
              id="content"
              placeholder="Share more context, learnings, or details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting || !title.trim() || !companyId}
            className="w-full sm:w-auto gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Publish Log
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
