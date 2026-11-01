import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Compass, PenSquare } from 'lucide-react';
import { HOME_FEATURED_COUNT } from '../config/constants';
import { ROUTES, SITE } from '../config/site';
import { useMemes } from '../hooks/useMemes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import MemeGrid from '../components/meme/MemeGrid';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/ui/ErrorState';

const FEATURES = [
  {
    icon: Compass,
    title: 'Discover',
    text: 'Browse popular meme templates, search by name and sort by what the community uses most.',
  },
  {
    icon: PenSquare,
    title: 'Create',
    text: 'Add top and bottom captions to a template or your own image, then download or save it.',
  },
  {
    icon: Bookmark,
    title: 'Collect',
    text: 'Like and save favourites, leave comments and keep everything in your profile.',
  },
];

export default function Home() {
  useDocumentTitle();
  const { memes, loading, error, retry } = useMemes();
  const featured = memes.slice(0, HOME_FEATURED_COUNT);

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Meme discovery &amp; creation</p>
            <h1 className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
              Find the meme. <br className="hidden sm:block" />
              Make it yours.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted">
              {SITE.name} lets you explore popular templates, caption them in seconds and keep a
              collection of your favourites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.explore} className="btn-primary !px-5 !py-2.5">
                Explore memes
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={ROUTES.create} className="btn-secondary !px-5 !py-2.5">
                Create a meme
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-hidden="true">
            {(loading ? Array.from({ length: 4 }) : memes.slice(0, 4)).map((meme, i) => (
              <div
                key={meme?.id ?? i}
                className={`aspect-square overflow-hidden rounded-card border border-line bg-subtle ${
                  i % 2 === 1 ? 'translate-y-4 sm:translate-y-6' : ''
                }`}
              >
                {meme && <img src={meme.url} alt="" className="h-full w-full object-cover" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Popular right now</p>
            <h2 className="text-2xl sm:text-3xl">Most used templates</h2>
          </div>
          <Link to={ROUTES.explore} className="btn-ghost shrink-0">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading && <Spinner />}
        {error && <ErrorState message={error.message} onRetry={retry} />}
        {!loading && !error && <MemeGrid memes={featured} />}
      </section>

      <section className="border-t border-line bg-subtle/60">
        <div className="container-page py-14 sm:py-20">
          <h2 className="max-w-xl text-2xl sm:text-3xl">Everything you need, nothing you don&apos;t</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
