import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "https://twitter.com", label: "Twitter", external: true },
  { href: "https://github.com", label: "GitHub", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tagline */}
          <p className="text-sm text-muted-foreground">
            Built for founders who ship.
          </p>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center sm:text-left">
          <p className="text-xs text-muted-foreground/50">
            &copy; 2024 DOER
          </p>
        </div>
      </div>
    </footer>
  );
}
