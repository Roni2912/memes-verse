import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { addComment, removeComment, selectComments } from '../../store/interactionsSlice';
import { selectProfile } from '../../store/profileSlice';
import { formatDate } from '../../utils/format';
import Avatar from '../ui/Avatar';

const MAX_LENGTH = 280;

export default function MemeComments({ memeId }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments(memeId));
  const profile = useSelector(selectProfile);
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    dispatch(addComment({ memeId, text: value, author: profile.name }));
    setText('');
  };

  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="text-xl">
        Comments <span className="text-muted">({comments.length})</span>
      </h2>

      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={text}
          maxLength={MAX_LENGTH}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          aria-label="Add a comment"
          className="input flex-1"
        />
        <button type="submit" className="btn-primary" disabled={!text.trim()}>
          Post
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No comments yet. Be the first to say something.</p>
      ) : (
        <ul className="mt-6 space-y-5">
          {[...comments].reverse().map((comment) => (
            <li key={comment.id} className="flex gap-3">
              <Avatar name={comment.author} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{comment.author}</span>
                  <span className="ml-2 text-xs text-muted">{formatDate(comment.createdAt)}</span>
                </p>
                <p className="mt-0.5 break-words text-sm text-muted">{comment.text}</p>
              </div>
              <button
                type="button"
                className="btn-icon !h-8 !w-8"
                aria-label="Delete comment"
                onClick={() => dispatch(removeComment({ memeId, commentId: comment.id }))}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
