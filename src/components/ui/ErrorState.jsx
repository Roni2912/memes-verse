import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="card mx-auto flex max-w-md flex-col items-center px-6 py-12 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
        <AlertCircle className="h-6 w-6" />
      </span>
      <h3 className="text-lg">Couldn&apos;t load memes</h3>
      <p className="mt-1.5 text-sm text-muted">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary mt-6">
          Try again
        </button>
      )}
    </div>
  );
}
