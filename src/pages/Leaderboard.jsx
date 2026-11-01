import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Crown, Heart, Layers, Sparkles } from 'lucide-react';
import { LEADERBOARD_SIZE } from '../config/constants';
import { ROUTES } from '../config/site';
import { useMemes } from '../hooks/useMemes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { selectLikedMap } from '../store/interactionsSlice';
import { formatCount } from '../utils/format';
import PageHeader from '../components/ui/PageHeader';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';
import MemeActions from '../components/meme/MemeActions';

export default function Leaderboard() {
  useDocumentTitle('Leaderboard');
  const { memes, loading, error, retry } = useMemes();
  const liked = useSelector(selectLikedMap);

  const top = memes.slice(0, LEADERBOARD_SIZE);
  const totalUses = memes.reduce((sum, m) => sum + m.uses, 0);
  const stats = [
    { icon: Layers, label: 'Templates', value: formatCount(memes.length) },
    { icon: Sparkles, label: 'Total captions', value: formatCount(totalUses) },
    { icon: Heart, label: 'Your likes', value: formatCount(Object.keys(liked).length) },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <PageHeader
        eyebrow="Leaderboard"
        title="Top templates"
        description="The templates people caption the most, ranked by total uses."
      />

      {loading && <Spinner />}
      {error && <ErrorState message={error.message} onRetry={retry} />}

      {!loading && !error && (
        <>
          <dl className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card flex items-center gap-4 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-control bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="font-display text-2xl font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <ol className="card divide-y divide-line overflow-hidden">
            {top.map((meme, index) => (
              <li key={meme.id} className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    index === 0 ? 'bg-accent text-accent-foreground' : 'bg-subtle text-muted'
                  }`}
                >
                  {index === 0 ? <Crown className="h-4 w-4" /> : index + 1}
                </span>
                <Link to={ROUTES.meme(meme.id)} className="h-14 w-14 shrink-0 overflow-hidden rounded-control bg-subtle sm:h-16 sm:w-16">
                  <img src={meme.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={ROUTES.meme(meme.id)} className="block truncate font-medium hover:text-accent">
                    {meme.name}
                  </Link>
                  <p className="text-sm text-muted">{formatCount(meme.uses)} uses</p>
                </div>
                <MemeActions meme={meme} className="hidden sm:flex" />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
