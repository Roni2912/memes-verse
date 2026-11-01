import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, ROUTES, SITE } from '../../config/site';
import ThemeToggle from './ThemeToggle';
import ProfileMenu from './ProfileMenu';

const navClass = ({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link to={ROUTES.home} className="font-display text-xl font-semibold tracking-tight">
          {SITE.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map(({ label, to, end }) => (
            <NavLink key={to} to={to} end={end} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <ProfileMenu />
          <button
            type="button"
            className="btn-icon md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="animate-pop border-t border-line bg-background md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map(({ label, to, end, icon: Icon }) => (
              <NavLink key={to} to={to} end={end} className={navClass}>
                <span className="flex items-center gap-3 py-0.5">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
