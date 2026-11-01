import { useMemes } from '../hooks/useMemes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import PageHeader from '../components/ui/PageHeader';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import MemeBrowser from '../components/meme/MemeBrowser';

export default function Explore() {
  useDocumentTitle('Explore');
  const { memes, loading, error, retry } = useMemes();

  return (
    <div className="container-page py-10 sm:py-14">
      <PageHeader
        eyebrow="Explore"
        title="Browse meme templates"
        description="Search, sort and filter the most popular templates."
      />
      {loading && <Spinner />}
      {error && <ErrorState message={error.message} onRetry={retry} />}
      {!loading && !error && <MemeBrowser memes={memes} />}
    </div>
  );
}
