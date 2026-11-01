import { Link } from 'react-router-dom';
import { NAV_LINKS, ROUTES, SITE } from '../../config/site';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to={ROUTES.home} className="font-display text-lg font-semibold">
            {SITE.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-1 text-sm text-muted">{SITE.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} className="text-muted transition-colors hover:text-foreground">
              {label}
            </Link>
          ))}
          <a
            href={SITE.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            Source
          </a>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-4 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.author}. Meme templates by Imgflip.
        </p>
      </div>
    </footer>
  );
}
