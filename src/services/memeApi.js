import { API } from '../config/constants';

let cache = null;

/** Fetches meme templates from Imgflip. The result is cached for the session. */
export function fetchMemeTemplates() {
  if (!cache) {
    cache = fetch(API.imgflip)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (!json.success) throw new Error(json.error_message || 'Could not load memes');
        return json.data.memes.map(normalizeTemplate);
      })
      .catch((error) => {
        cache = null; // allow retry
        throw error;
      });
  }
  return cache;
}

function normalizeTemplate(meme) {
  return {
    id: String(meme.id),
    name: meme.name,
    url: meme.url,
    width: meme.width,
    height: meme.height,
    uses: meme.captions ?? 0,
    source: 'template',
  };
}
