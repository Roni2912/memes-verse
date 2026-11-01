import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../config/site';
import { selectComments } from '../../store/interactionsSlice';
import { formatCount, formatDate } from '../../utils/format';
import MemeActions from './MemeActions';

function MemeCard({ meme, layout = 'grid' }) {
  const commentCount = useSelector(selectComments(meme.id)).length;
  const isList = layout === 'list';

  return (
    <article
      className={`card group overflow-hidden transition-shadow hover:shadow-pop ${
        isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'
      }`}
    >
      <Link
        to={ROUTES.meme(meme.id)}
        className={`block overflow-hidden bg-subtle ${
          isList ? 'aspect-[4/3] sm:aspect-auto sm:w-56 sm:shrink-0' : 'aspect-[4/3]'
        }`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={meme.url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-sans text-base font-semibold tracking-normal">
            <Link to={ROUTES.meme(meme.id)} className="hover:text-accent">
              {meme.name}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-3 text-xs text-muted">
            {meme.source === 'created' ? (
              <span>Created {formatDate(meme.createdAt)}</span>
            ) : (
              <span className="inline-flex items-center gap-1" title="Times this template was captioned">
                <Sparkles className="h-3.5 w-3.5" />
                {formatCount(meme.uses)} uses
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {commentCount}
            </span>
          </p>
        </div>

        <MemeActions meme={meme} className="-ml-2" />
      </div>
    </article>
  );
}

export default memo(MemeCard);
