import { notFound } from "next/navigation";
import { getCompanyBySlug, getCompanyLogs, getTeamMembers, mockProfiles } from "@/lib/mock-data";
import { CompanyProfile } from "@/components/company/CompanyProfile";
import { CompanyTimeline } from "@/components/company/CompanyTimeline";
import { Separator } from "@/components/ui/separator";

interface CompanyPageProps {
  params: { slug: string };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = getCompanyBySlug(params.slug);

  if (!company) {
    notFound();
  }

  const logs = getCompanyLogs(company.id);
  const teamMembers = getTeamMembers(company.id);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <CompanyProfile company={company} teamMembers={teamMembers} />
      <Separator />
      <CompanyTimeline logs={logs} />
    </div>
  );
}
