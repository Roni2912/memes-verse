import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'lucide-react';
import { THEME_OPTIONS } from '../../config/site';
import { selectProfile, updateProfile } from '../../store/profileSlice';
import { resetAllData } from '../../store/actions';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { compressImageFile } from '../../utils/image';
import { slugifyUsername } from '../../utils/format';
import Avatar from '../ui/Avatar';
import ConfirmButton from '../ui/ConfirmButton';

const BIO_LIMIT = 160;

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const toast = useToast();
  const profile = useSelector(selectProfile);
  const { preference, setPreference } = useTheme();

  const [form, setForm] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
  });

  const dirty =
    form.name !== profile.name || form.username !== profile.username || form.bio !== profile.bio;
  const valid = form.name.trim().length > 0 && form.username.length > 0;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    dispatch(updateProfile({ name: form.name.trim(), username: form.username, bio: form.bio.trim() }));
    toast.success('Profile updated');
  };

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      dispatch(updateProfile({ avatar: await compressImageFile(file, 400) }));
      toast.success('Photo updated');
    } catch {
      toast.error('Could not use that image');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="card p-6 lg:col-span-2" aria-labelledby="profile-settings">
        <h2 id="profile-settings" className="text-lg">Profile</h2>

        <div className="mt-5 flex items-center gap-4">
          <Avatar name={form.name || profile.name} src={profile.avatar} size="xl" className="!h-20 !w-20 !text-2xl" />
          <div className="flex flex-wrap gap-2">
            <label className="btn-secondary cursor-pointer">
              <Camera className="h-4 w-4" /> Upload photo
              <input type="file" accept="image/*" className="sr-only" onChange={handleAvatar} />
            </label>
            {profile.avatar && (
              <button type="button" className="btn-ghost" onClick={() => dispatch(updateProfile({ avatar: null }))}>
                Remove
              </button>
            )}
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="label">Display name</label>
            <input id="name" className="input" value={form.name} maxLength={40} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="username" className="label">Username</label>
            <div className="flex">
              <span className="flex items-center rounded-l-control border border-r-0 border-line bg-subtle px-3 text-sm text-muted">@</span>
              <input
                id="username"
                className="input !rounded-l-none"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: slugifyUsername(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="bio" className="label">Bio</label>
            <textarea
              id="bio"
              rows={3}
              className="input resize-none"
              value={form.bio}
              maxLength={BIO_LIMIT}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
            <p className="mt-1 text-right text-xs text-muted">{form.bio.length}/{BIO_LIMIT}</p>
          </div>
          <button type="submit" className="btn-primary" disabled={!dirty || !valid}>
            Save changes
          </button>
        </form>
      </section>

      <div className="space-y-6">
        <section className="card p-6" aria-labelledby="appearance">
          <h2 id="appearance" className="text-lg">Appearance</h2>
          <div className="mt-4 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Theme">
            {THEME_OPTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={preference === id}
                onClick={() => setPreference(id)}
                className={`chip justify-center ${preference === id ? 'is-active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="card p-6" aria-labelledby="data">
          <h2 id="data" className="text-lg">Your data</h2>
          <p className="mt-2 text-sm text-muted">
            Likes, saved memes, comments and your profile are stored in this browser only.
          </p>
          <ConfirmButton
            className="btn-danger mt-4"
            confirmLabel="Click again to erase"
            onConfirm={() => {
              dispatch(resetAllData());
              toast.success('All data cleared');
            }}
          >
            Clear all data
          </ConfirmButton>
        </section>
      </div>
    </div>
  );
}
