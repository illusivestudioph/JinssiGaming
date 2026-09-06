import { requireSupabase } from './supabase';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const extensions: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export async function validateImage(file: File) {
  if (!extensions[file.type])
    throw new Error('Choose a JPEG, PNG, WebP or GIF image. SVG files are not allowed.');
  if (file.size === 0 || file.size > MAX_IMAGE_BYTES)
    throw new Error('Images must be non-empty and no larger than 5 MB.');
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  const signatures: Record<string, boolean> = {
    'image/jpeg': bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
    'image/png':
      bytes.length >= 8 &&
      [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte),
    'image/webp': ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP',
    'image/gif': ['GIF87a', 'GIF89a'].includes(ascii(0, 6)),
  };
  if (!signatures[file.type]) throw new Error('The file contents do not match the image type.');
}

export async function uploadImage(file: File): Promise<string> {
  await validateImage(file);
  const client = requireSupabase();
  const { data, error: authError } = await client.auth.getUser();
  if (authError) throw authError;
  if (!data.user) throw new Error('Sign in as an admin before uploading images.');
  const path = `${data.user.id}/${crypto.randomUUID()}.${extensions[file.type]}`;
  const { error } = await client.storage.from('site-assets').upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;
  return client.storage.from('site-assets').getPublicUrl(path).data.publicUrl;
}
