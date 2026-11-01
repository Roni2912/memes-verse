import { initialOf } from '../../utils/format';

const SIZES = { sm: 'h-8 w-8 text-sm', md: 'h-10 w-10 text-base', xl: 'h-28 w-28 text-4xl' };

export default function Avatar({ name, src, size = 'md', className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent font-semibold text-accent-foreground ${SIZES[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={`${name}'s avatar`} className="h-full w-full object-cover" />
      ) : (
        initialOf(name)
      )}
    </span>
  );
}
