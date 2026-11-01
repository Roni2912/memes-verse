import MemeCard from './MemeCard';

const GRID = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
const LIST = 'mx-auto flex max-w-3xl flex-col gap-4';

export default function MemeGrid({ memes, layout = 'grid' }) {
  return (
    <div className={layout === 'list' ? LIST : GRID}>
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} layout={layout} />
      ))}
    </div>
  );
}
