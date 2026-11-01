import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../config/site';

/** Shares a meme via the native share sheet, falling back to copying the link. */
export function useShare() {
  const toast = useToast();
  return useCallback(
    async (meme) => {
      const url = `${window.location.origin}${ROUTES.meme(meme.id)}`;
      try {
        if (navigator.share) {
          await navigator.share({ title: meme.name, url });
        } else {
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard');
        }
      } catch (error) {
        if (error?.name !== 'AbortError') toast.error('Could not share this meme');
      }
    },
    [toast],
  );
}
