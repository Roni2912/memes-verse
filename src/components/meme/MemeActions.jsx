import { useDispatch, useSelector } from 'react-redux';
import { Bookmark, Heart, Share2 } from 'lucide-react';
import {
  selectIsLiked,
  selectIsSaved,
  toggleLike,
  toggleSave,
} from '../../store/interactionsSlice';
import { useShare } from '../../hooks/useShare';

/** Like / save / share controls for a meme. Used by cards and the detail page. */
export default function MemeActions({ meme, size = 'sm', className = '' }) {
  const dispatch = useDispatch();
  const liked = useSelector(selectIsLiked(meme.id));
  const saved = useSelector(selectIsSaved(meme.id));
  const share = useShare();

  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  const buttonSize = size === 'lg' ? '!h-10 !w-10' : '';

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <button
        type="button"
        onClick={() => dispatch(toggleLike(meme.id))}
        aria-pressed={liked}
        aria-label={liked ? 'Unlike' : 'Like'}
        className={`btn-icon ${buttonSize} ${liked ? '!text-danger' : ''}`}
      >
        <Heart className={`${iconSize} ${liked ? 'fill-current' : ''}`} />
      </button>
      <button
        type="button"
        onClick={() => dispatch(toggleSave(meme.id))}
        aria-pressed={saved}
        aria-label={saved ? 'Remove from saved' : 'Save'}
        className={`btn-icon ${buttonSize} ${saved ? '!text-accent' : ''}`}
      >
        <Bookmark className={`${iconSize} ${saved ? 'fill-current' : ''}`} />
      </button>
      <button
        type="button"
        onClick={() => share(meme)}
        aria-label="Share"
        className={`btn-icon ${buttonSize}`}
      >
        <Share2 className={iconSize} />
      </button>
    </div>
  );
}
