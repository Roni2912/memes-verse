import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'lucide-react';
import { selectProfile, updateProfile } from '../../store/profileSlice';
import { selectCreated, selectLikedMap, selectSavedMap } from '../../store/interactionsSlice';
import { useToast } from '../../context/ToastContext';
import { compressImageFile } from '../../utils/image';
import { formatCount } from '../../utils/format';
import Avatar from '../ui/Avatar';

export default function ProfileHeader() {
  const dispatch = useDispatch();
  const toast = useToast();
  const profile = useSelector(selectProfile);
  const created = useSelector(selectCreated);
  const liked = useSelector(selectLikedMap);
  const saved = useSelector(selectSavedMap);
  const [busy, setBusy] = useState(false);
  const coverInput = useRef(null);

  const stats = [
    { label: 'Memes', value: created.length },
    { label: 'Liked', value: Object.keys(liked).length },
    { label: 'Saved', value: Object.keys(saved).length },
  ];

  const handleCover = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      dispatch(updateProfile({ cover: await compressImageFile(file) }));
    } catch {
      toast.error('Could not use that image');
    } finally {
      setBusy(false);
    }
  };

  return (
    <header className="card overflow-hidden">
      <div className="relative h-32 bg-accent-soft sm:h-48">
        {profile.cover && <img src={profile.cover} alt="" className="h-full w-full object-cover" />}
        <button
          type="button"
          onClick={() => coverInput.current.click()}
          disabled={busy}
          className="btn-secondary absolute bottom-3 right-3 !px-3 !py-1.5"
        >
          <Camera className="h-4 w-4" /> <span className="hidden sm:inline">{busy ? 'Saving…' : 'Change cover'}</span>
        </button>
        <input ref={coverInput} type="file" accept="image/*" className="sr-only" onChange={handleCover} />
      </div>

      <div className="px-5 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <Avatar
            name={profile.name}
            src={profile.avatar}
            size="xl"
            className="relative z-10 border-4 border-surface"
          />
          <dl className="flex gap-8">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <dd className="font-display text-xl font-semibold">{formatCount(value)}</dd>
                <dt className="text-sm text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <h1 className="mt-4 text-2xl">{profile.name}</h1>
        <p className="text-sm text-muted">@{profile.username}</p>
        {profile.bio && <p className="mt-3 max-w-2xl text-sm">{profile.bio}</p>}
      </div>
    </header>
  );
}
