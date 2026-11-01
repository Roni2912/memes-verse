import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LayoutGrid, List, SearchX } from 'lucide-react';
import { COLLECTION_FILTERS, PAGE_SIZE, SORT_OPTIONS } from '../../config/constants';
import { selectLikedMap, selectSavedMap } from '../../store/interactionsSlice';
import SearchInput from '../ui/SearchInput';
import EmptyState from '../ui/EmptyState';
import Select from '../ui/Select';
import MemeGrid from './MemeGrid';

const SORTERS = {
  popular: () => 0, // API order is already by popularity
  name: (a, b) => a.name.localeCompare(b.name),
  likes: (a, b, liked) => Number(Boolean(liked[b.id])) - Number(Boolean(liked[a.id])),
};

/** Search, filter, sort, view-toggle and "show more" over a list of memes. */
export default function MemeBrowser({ memes, showFilters = true, emptyHint }) {
  const liked = useSelector(selectLikedMap);
  const saved = useSelector(selectSavedMap);

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [filter, setFilter] = useState('all');
  const [layout, setLayout] = useState('grid');
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, sort, filter]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return memes
      .filter((m) => !term || m.name.toLowerCase().includes(term))
      .filter(
        (m) => filter === 'all' || (filter === 'liked' ? liked[m.id] : saved[m.id]),
      )
      .sort((a, b) => SORTERS[sort](a, b, liked));
  }, [memes, query, sort, filter, liked, saved]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search memes"
          className="lg:max-w-sm lg:flex-1"
        />

        <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
          {showFilters && (
            <div className="flex gap-2" role="group" aria-label="Filter">
              {COLLECTION_FILTERS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className="chip"
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <Select
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS}
            label="Sort memes"
            className="w-44"
          />

          <div className="flex rounded-control border border-line bg-surface p-0.5" role="group" aria-label="Layout">
            {[
              { id: 'grid', icon: LayoutGrid, label: 'Grid view' },
              { id: 'list', icon: List, label: 'List view' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setLayout(id)}
                aria-pressed={layout === id}
                aria-label={label}
                className={`btn-icon !h-8 !w-8 ${layout === id ? '!bg-subtle !text-foreground' : ''}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? 'meme' : 'memes'}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No memes found"
          description={emptyHint ?? 'Try a different search or filter.'}
        />
      ) : (
        <>
          <MemeGrid memes={results.slice(0, visible)} layout={layout} />
          {visible < results.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
              >
                Show more ({results.length - visible} left)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
