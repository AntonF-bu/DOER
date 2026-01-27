import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOER - Where Builders Ship in Public",
  description:
    "The live execution platform for startups. Visibility is earned through logged action, not content performance.",
  openGraph: {
    title: "DOER - Where Builders Ship in Public",
    description:
      "The live execution platform for startups. Visibility is earned through logged action, not content performance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
