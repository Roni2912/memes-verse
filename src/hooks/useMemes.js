import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchMemeTemplates } from '../services/memeApi';
import { selectCreated } from '../store/interactionsSlice';

/** Loads the shared meme template list (cached across pages). */
export function useMemes() {
  const [state, setState] = useState({ memes: [], loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchMemeTemplates()
      .then((memes) => active && setState({ memes, loading: false, error: null }))
      .catch((error) => active && setState({ memes: [], loading: false, error }));
    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}

/** Resolves a meme by id from either API templates or the user's own creations. */
export function useMemeById(id) {
  const { memes, loading, error, retry } = useMemes();
  const created = useSelector(selectCreated);
  const meme = created.find((m) => m.id === id) ?? memes.find((m) => m.id === id) ?? null;
  return { meme, loading, error, retry };
}

/** Returns every meme the user has interacted with, resolved to full objects. */
export function useCollection(idMap = {}) {
  const { memes, loading, error, retry } = useMemes();
  const created = useSelector(selectCreated);
  const all = [...created, ...memes];
  const items = all.filter((m) => idMap[m.id]);
  return { items, loading, error, retry };
}
