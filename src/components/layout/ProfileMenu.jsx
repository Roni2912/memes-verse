import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { PROFILE_MENU } from '../../config/site';
import { selectProfile } from '../../store/profileSlice';
import { useClickOutside } from '../../hooks/useClickOutside';
import Avatar from '../ui/Avatar';

export default function ProfileMenu() {
  const profile = useSelector(selectProfile);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open profile menu"
        className="flex items-center gap-1.5 rounded-full p-1 pr-2 transition-colors hover:bg-subtle"
      >
        <Avatar name={profile.name} src={profile.avatar} size="sm" />
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="animate-pop absolute right-0 mt-2 w-60 rounded-card border border-line bg-surface p-1.5 shadow-pop"
        >
          <div className="border-b border-line px-3 pb-3 pt-2">
            <p className="truncate font-medium">{profile.name}</p>
            <p className="truncate text-sm text-muted">@{profile.username}</p>
          </div>
          <div className="pt-1.5">
            {PROFILE_MENU.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} role="menuitem" onClick={close} className="menu-item">
                <Icon className="h-4 w-4 text-muted" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
