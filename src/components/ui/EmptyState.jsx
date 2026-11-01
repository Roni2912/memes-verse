import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card mx-auto flex max-w-md flex-col items-center px-6 py-12 text-center">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <h3 className="text-lg">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-muted">{description}</p>}
      {action && (
        <Link to={action.to} className="btn-primary mt-6">
          {action.label}
        </Link>
      )}
    </div>
  );
}
