import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOER — Visibility is earned",
  description: "The live execution layer for startups. Log what you ship. Build in public.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
