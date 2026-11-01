import { Link, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bookmark, Heart, ImagePlus } from 'lucide-react';
import { PROFILE_TABS, ROUTES } from '../config/site';
import { useCollection } from '../hooks/useMemes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { selectCreated, selectLikedMap, selectSavedMap } from '../store/interactionsSlice';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileSettings from '../components/profile/ProfileSettings';
import MemeGrid from '../components/meme/MemeGrid';
import EmptyState from '../components/ui/EmptyState';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

const EMPTY = {
  posts: {
    icon: ImagePlus,
    title: 'No memes yet',
    description: 'Memes you create will show up here.',
    action: { to: ROUTES.create, label: 'Create a meme' },
  },
  liked: {
    icon: Heart,
    title: 'Nothing liked yet',
    description: 'Tap the heart on any meme to collect it here.',
    action: { to: ROUTES.explore, label: 'Explore memes' },
  },
  saved: {
    icon: Bookmark,
    title: 'Nothing saved yet',
    description: 'Save memes to find them again quickly.',
    action: { to: ROUTES.explore, label: 'Explore memes' },
  },
};

function CollectionTab({ tab, idMap }) {
  const created = useSelector(selectCreated);
  const { items, loading, error, retry } = useCollection(idMap);
  const memes = tab === 'posts' ? created : items;

  if (tab !== 'posts' && loading) return <Spinner />;
  if (tab !== 'posts' && error) return <ErrorState message={error.message} onRetry={retry} />;
  if (memes.length === 0) return <EmptyState {...EMPTY[tab]} />;
  return <MemeGrid memes={memes} />;
}

export default function Profile() {
  const { tab = 'posts' } = useParams();
  const liked = useSelector(selectLikedMap);
  const saved = useSelector(selectSavedMap);
  const created = useSelector(selectCreated);
  const active = PROFILE_TABS.find((t) => t.id === tab);
  useDocumentTitle(active?.label ?? 'Profile');

  if (!active) return <Navigate to={ROUTES.profile()} replace />;

  const counts = { posts: created.length, liked: Object.keys(liked).length, saved: Object.keys(saved).length };
  const idMaps = { liked, saved };

  return (
    <div className="container-page py-8 sm:py-12">
      <ProfileHeader />

      <nav className="no-scrollbar -mx-4 mt-6 flex gap-1 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0" aria-label="Profile sections">
        {PROFILE_TABS.map(({ id, label, icon: Icon }) => (
          <Link
            key={id}
            to={ROUTES.profile(id)}
            aria-current={id === tab ? 'page' : undefined}
            className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              id === tab
                ? 'border-accent text-foreground'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {counts[id] !== undefined && (
              <span className="rounded-full bg-subtle px-2 py-0.5 text-xs">{counts[id]}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        {tab === 'settings' ? <ProfileSettings /> : <CollectionTab tab={tab} idMap={idMaps[tab]} />}
      </div>
    </div>
  );
}
