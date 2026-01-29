import { notFound } from "next/navigation";
import {
  getCompanyBySlug,
  getCompanyLogs,
  getTeamMembers,
  getCompanyFuel,
  mockProfiles,
} from "@/lib/mock-data";
import { CompanyProfile } from "@/components/company/CompanyProfile";

interface CompanyPageProps {
  params: { slug: string };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = getCompanyBySlug(params.slug);

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Company not found
          </h1>
          <p className="text-muted-foreground">
            The company you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Wire up owner
  const owner = mockProfiles.find((p) => p.id === company.owner_id);
  const companyWithOwner = { ...company, owner };

  const logs = getCompanyLogs(company.id);
  const teamMembers = getTeamMembers(company.id);
  const fuelContributions = getCompanyFuel(company.id);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <CompanyProfile
        company={companyWithOwner}
        logs={logs}
        fuelContributions={fuelContributions}
        teamMembers={teamMembers}
      />
    </div>
  );
}
