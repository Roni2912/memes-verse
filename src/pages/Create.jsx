import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Download, ImagePlus, Save, Shuffle } from 'lucide-react';
import { CAPTION_IDEAS, MEME_EDITOR } from '../config/constants';
import { ROUTES } from '../config/site';
import { useMemes } from '../hooks/useMemes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { addCreatedMeme } from '../store/interactionsSlice';
import { isImageHostConfigured, uploadImage } from '../services/imageHost';
import { loadImage } from '../utils/image';
import { clampFont, drawMeme } from '../utils/memeCanvas';
import PageHeader from '../components/ui/PageHeader';
import Select from '../components/ui/Select';

const INITIAL = {
  topText: '',
  bottomText: '',
  fontSize: MEME_EDITOR.defaultFont,
  color: MEME_EDITOR.textColors[0],
};

export default function Create() {
  useDocumentTitle('Create');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { memes } = useMemes();
  const [params, setParams] = useSearchParams();

  const templateId = params.get('template') ?? '';
  const template = memes.find((m) => m.id === templateId);

  const [upload, setUpload] = useState(null); // { url, name }
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(INITIAL);
  const [status, setStatus] = useState({ loading: false, error: null });
  const [saving, setSaving] = useState(false);
  const canvasRef = useRef(null);

  const source = upload ?? (template ? { url: template.url, name: template.name } : null);
  const sourceUrl = source?.url;

  // Load the chosen image
  useEffect(() => {
    if (!sourceUrl) {
      setImage(null);
      return undefined;
    }
    let active = true;
    setStatus({ loading: true, error: null });
    loadImage(sourceUrl)
      .then((img) => active && (setImage(img), setStatus({ loading: false, error: null })))
      .catch(() => active && (setImage(null), setStatus({ loading: false, error: 'Could not load this image.' })));
    return () => {
      active = false;
    };
  }, [sourceUrl]);

  // Free object URLs we created for uploads
  useEffect(() => () => upload && URL.revokeObjectURL(upload.url), [upload]);

  // Live preview
  useEffect(() => {
    if (image && canvasRef.current) drawMeme(canvasRef.current, image, options, 1000);
  }, [image, options]);

  const set = (patch) => setOptions((o) => ({ ...o, ...patch }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Please choose an image file');
    setUpload({ url: URL.createObjectURL(file), name: file.name.replace(/\.[^.]+$/, '') });
    setParams({}, { replace: true });
  };

  const chooseTemplate = (id) => {
    setUpload(null);
    setParams(id ? { template: id } : {}, { replace: true });
  };

  const surprise = () => {
    const idea = CAPTION_IDEAS[Math.floor(Math.random() * CAPTION_IDEAS.length)];
    set({ topText: idea.top, bottomText: idea.bottom });
  };

  const exportCanvas = () => {
    const canvas = document.createElement('canvas');
    drawMeme(canvas, image, options, MEME_EDITOR.maxExportSize);
    return canvas;
  };

  const download = () => {
    exportCanvas().toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${(source.name || 'meme').replace(/\s+/g, '-').toLowerCase()}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      let url = exportCanvas().toDataURL('image/jpeg', 0.85);
      if (isImageHostConfigured) url = await uploadImage(url);
      const name = options.topText || options.bottomText || source.name || 'Untitled meme';
      dispatch(addCreatedMeme({ name, url }));
      toast.success('Meme saved to your profile');
      navigate(ROUTES.profile('posts'));
    } catch (error) {
      toast.error(error.message || 'Could not save the meme');
    } finally {
      setSaving(false);
    }
  };

  const ready = Boolean(image);

  return (
    <div className="container-page py-10 sm:py-14">
      <PageHeader
        eyebrow="Create"
        title="Meme editor"
        description="Pick a template or upload your own image, add your caption and export."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Preview */}
        <div className="lg:col-span-3">
          <div className="card flex min-h-[280px] items-center justify-center overflow-hidden bg-subtle p-2 sm:p-4">
            {image ? (
              <canvas ref={canvasRef} className="max-h-[70vh] w-full object-contain" aria-label="Meme preview" />
            ) : (
              <p className="px-6 text-center text-sm text-muted">
                {status.loading ? 'Loading image…' : status.error ?? 'Choose a template or upload an image to start.'}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="card space-y-5 p-5 lg:col-span-2">
          <div>
            <span className="label">Template</span>
            <Select
              label="Template"
              value={upload ? '' : templateId}
              onChange={chooseTemplate}
              placeholder={upload ? `Uploaded: ${upload.name}` : 'Select a template'}
              options={memes.map((m) => ({ id: m.id, label: m.name }))}
            />
            <label className="btn-secondary mt-2 w-full cursor-pointer">
              <ImagePlus className="h-4 w-4" /> Upload your own image
              <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
            </label>
          </div>

          <div>
            <label htmlFor="top" className="label">Top text</label>
            <input id="top" className="input" value={options.topText} onChange={(e) => set({ topText: e.target.value })} placeholder="Top caption" maxLength={100} />
          </div>
          <div>
            <label htmlFor="bottom" className="label">Bottom text</label>
            <input id="bottom" className="input" value={options.bottomText} onChange={(e) => set({ bottomText: e.target.value })} placeholder="Bottom caption" maxLength={100} />
            <button type="button" className="btn-ghost mt-2 !px-2" onClick={surprise}>
              <Shuffle className="h-4 w-4" /> Suggest a caption
            </button>
          </div>

          <div>
            <label htmlFor="size" className="label">Font size: {options.fontSize}</label>
            <input
              id="size"
              type="range"
              min={MEME_EDITOR.minFont}
              max={MEME_EDITOR.maxFont}
              value={options.fontSize}
              onChange={(e) => set({ fontSize: clampFont(e.target.value) })}
              className="w-full accent-[rgb(var(--color-accent))]"
            />
          </div>

          <div>
            <span className="label">Text colour</span>
            <div className="flex flex-wrap gap-2">
              {MEME_EDITOR.textColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => set({ color })}
                  aria-label={`Text colour ${color}`}
                  aria-pressed={options.color === color}
                  style={{ backgroundColor: color }}
                  className={`h-8 w-8 rounded-full border border-line ${
                    options.color === color ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-line pt-5 sm:flex-row">
            <button type="button" className="btn-primary flex-1" onClick={save} disabled={!ready || saving}>
              <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save meme'}
            </button>
            <button type="button" className="btn-secondary flex-1" onClick={download} disabled={!ready}>
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
