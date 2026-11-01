import { MEME_EDITOR } from '../config/constants';

/**
 * Draws a meme (image + top/bottom captions) onto a canvas.
 * The same function powers the live preview and the exported file.
 */
export function drawMeme(canvas, image, { topText = '', bottomText = '', fontSize, color }, maxEdge) {
  const scale = maxEdge ? Math.min(1, maxEdge / Math.max(image.width, image.height)) : 1;
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);

  // fontSize is relative to a 600px wide meme so it looks the same at any resolution
  const px = Math.round((fontSize * width) / 600);
  ctx.font = `800 ${px}px Impact, "Arial Black", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.strokeStyle = color.toLowerCase() === '#000000' ? '#ffffff' : '#000000';
  ctx.lineWidth = Math.max(2, px / 8);
  ctx.lineJoin = 'round';

  const margin = px * 0.4;
  drawLines(ctx, topText, width / 2, margin + px, width * 0.92, px, 'down');
  drawLines(ctx, bottomText, width / 2, height - margin, width * 0.92, px, 'up');
}

function wrap(ctx, text, maxWidth) {
  const lines = [];
  let line = '';
  text
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean)
    .forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    });
  if (line) lines.push(line);
  return lines;
}

function drawLines(ctx, text, x, y, maxWidth, lineHeight, direction) {
  const lines = wrap(ctx, text, maxWidth);
  if (direction === 'up') lines.reverse();
  lines.forEach((line, i) => {
    const offset = i * lineHeight * 1.05 * (direction === 'up' ? -1 : 1);
    ctx.strokeText(line, x, y + offset);
    ctx.fillText(line, x, y + offset);
  });
}

export const clampFont = (value) =>
  Math.min(MEME_EDITOR.maxFont, Math.max(MEME_EDITOR.minFont, Number(value) || MEME_EDITOR.defaultFont));
