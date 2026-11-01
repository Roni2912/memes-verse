import { API, IMGBB_API_KEY } from '../config/constants';

export const isImageHostConfigured = Boolean(IMGBB_API_KEY);

/** Uploads a base64 data URL to ImgBB and returns the hosted URL. */
export async function uploadImage(dataUrl) {
  const body = new FormData();
  body.append('key', IMGBB_API_KEY);
  body.append('image', dataUrl.split(',')[1]);

  const res = await fetch(API.imgbb, { method: 'POST', body });
  const json = await res.json();
  if (!res.ok || !json.data) {
    throw new Error(json?.error?.message || 'Image upload failed');
  }
  return json.data.url;
}
