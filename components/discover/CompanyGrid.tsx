import { Company } from "@/types";
import { CompanyCard } from "@/components/company/CompanyCard";

interface CompanyGridProps {
  companies: Company[];
}

export function CompanyGrid({ companies }: CompanyGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
