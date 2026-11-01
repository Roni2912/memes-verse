import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft, PenSquare, Sparkles, Trash2 } from 'lucide-react';
import { ROUTES } from '../config/site';
import { useMemeById } from '../hooks/useMemes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { removeCreatedMeme } from '../store/interactionsSlice';
import { formatCount, formatDate } from '../utils/format';
import MemeActions from '../components/meme/MemeActions';
import MemeComments from '../components/meme/MemeComments';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import ConfirmButton from '../components/ui/ConfirmButton';

export default function MemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { meme, loading, error, retry } = useMemeById(id);
  useDocumentTitle(meme?.name);

  if (loading) return <Spinner />;
  if (error) return <div className="container-page py-14"><ErrorState message={error.message} onRetry={retry} /></div>;
  if (!meme) {
    return (
      <div className="container-page py-14">
        <EmptyState
          title="Meme not found"
          description="It may have been removed or the link is wrong."
          action={{ to: ROUTES.explore, label: 'Browse memes' }}
        />
      </div>
    );
  }

  const isOwn = meme.source === 'created';
  const handleDelete = () => {
    dispatch(removeCreatedMeme(meme.id));
    toast.success('Meme deleted');
    navigate(ROUTES.profile('posts'));
  };

  return (
    <div className="container-page max-w-5xl py-8 sm:py-12">
      <Link to={ROUTES.explore} className="btn-ghost -ml-3 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to explore
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="card flex items-center justify-center overflow-hidden bg-subtle lg:col-span-3">
          <img src={meme.url} alt={meme.name} className="max-h-[70vh] w-full object-contain" />
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-2xl sm:text-3xl">{meme.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            {isOwn ? (
              `Created ${formatDate(meme.createdAt)}`
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Captioned {formatCount(meme.uses)} times
              </>
            )}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-line py-4">
            <MemeActions meme={meme} size="lg" className="-ml-2" />
            {!isOwn && (
              <Link to={`${ROUTES.create}?template=${meme.id}`} className="btn-primary ml-auto">
                <PenSquare className="h-4 w-4" /> Use template
              </Link>
            )}
            {isOwn && (
              <ConfirmButton onConfirm={handleDelete} confirmLabel="Confirm delete" className="btn-danger ml-auto">
                <Trash2 className="h-4 w-4" /> Delete
              </ConfirmButton>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-2xl">
        <MemeComments memeId={meme.id} />
      </div>
    </div>
  );
}
