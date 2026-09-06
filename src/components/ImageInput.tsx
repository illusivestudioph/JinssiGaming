import { useRef, useState, useEffect, type ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { uploadImage } from '@/lib/uploads';
import { errorMessage } from '@/lib/validation';
import { isSafeUrl } from '@/lib/urls';

export function ImageInput({
  label,
  value,
  onChange,
  onBusyChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || busy) return;
    setBusy(true);
    setError('');
    onBusyChange(true);
    try {
      const url = await uploadImage(file);
      if (mounted.current) onChange(url);
    } catch (cause) {
      if (mounted.current) setError(errorMessage(cause));
    } finally {
      if (mounted.current) setBusy(false);
      onBusyChange(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end gap-2">
        <label className="font-semibold flex-1 min-w-48">
          {label}
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="form-input mt-1"
            placeholder="https://… or /image.jpeg"
            disabled={busy}
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-earth-100 px-4 py-2.5 text-earth-700 font-bold cursor-pointer">
          <Upload size={16} />
          {busy ? 'Uploading…' : 'Upload'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            aria-label={`Upload ${label}`}
            onChange={(event) => void upload(event)}
            disabled={busy}
          />
        </label>
      </div>
      {value && isSafeUrl(value, 'image') && (
        <img
          src={value}
          alt={`${label} preview`}
          className="mt-2 max-h-32 max-w-full rounded-lg border border-tan-200 object-contain"
        />
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
