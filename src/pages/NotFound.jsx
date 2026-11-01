import { Link } from 'react-router-dom';
import { ROUTES } from '../config/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to={ROUTES.home} className="btn-primary">Go home</Link>
        <Link to={ROUTES.explore} className="btn-secondary">Explore memes</Link>
      </div>
    </div>
  );
}
