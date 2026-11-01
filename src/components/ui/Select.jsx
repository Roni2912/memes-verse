import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

/**
 * Accessible custom dropdown (listbox pattern) that matches the app theme.
 * options: [{ id, label }]
 */
export default function Select({ value, onChange, options, label, placeholder = 'Select', className = '' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close, open);

  const selectedIndex = options.findIndex((o) => o.id === value);
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    setActive(Math.max(selectedIndex, 0));
  }, [open, selectedIndex]);

  // keep the highlighted option visible in long lists
  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const choose = (option) => {
    onChange(option.id);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(options[active]);
    } else if (e.key === 'Tab') {
      close();
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="input flex items-center justify-between gap-3 text-left"
      >
        <span className={`truncate ${selected ? '' : 'text-muted/70'}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          className="animate-pop absolute left-0 right-0 z-30 mt-2 max-h-64 min-w-max overflow-y-auto rounded-card border border-line bg-surface p-1.5 shadow-pop"
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={option.id === value}
              onMouseEnter={() => setActive(index)}
              onClick={() => choose(option)}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-control px-3 py-2 text-sm ${
                index === active ? 'bg-subtle' : ''
              } ${option.id === value ? 'font-medium text-accent' : ''}`}
            >
              {option.label}
              {option.id === value && <Check className="h-4 w-4" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
