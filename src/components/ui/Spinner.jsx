export default function Spinner({ label = 'Loading' }) {
  return (
    <div className="flex items-center justify-center py-20" role="status">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
