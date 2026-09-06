// Never render script/data URLs from editable content. Images may use root-relative
// assets or HTTPS; HTTP is allowed only for the local Supabase stack.
export function isSafeUrl(value: string, kind: 'link' | 'image'): boolean {
  if (
    !value ||
    value !== value.trim() ||
    /[\s\\]/.test(value) ||
    [...value].some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)
  )
    return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (kind === 'link' && value.startsWith('#')) return true;
  try {
    const url = new URL(value);
    if (url.username || url.password) return false;
    if (url.protocol === 'https:') return true;
    if (url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))
      return true;
    return kind === 'link' && url.protocol === 'mailto:' && Boolean(url.pathname);
  } catch {
    return false;
  }
}

export function safeLink(value: string): string | undefined {
  return isSafeUrl(value, 'link') ? value : undefined;
}
