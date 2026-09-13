export const REMEMBER_ME_COOKIE_NAME = 'jinssi_remember_me';
export const REMEMBER_ME_LOCAL_KEY = 'jinssi_remember_me';

/**
 * Persists the "Remember me" decision as a 1-year browser cookie and in localStorage.
 * If the user clears cookies in their browser settings, the cookie is wiped.
 */
export function setRememberMePreference(remember: boolean): void {
  if (typeof document === 'undefined') return;

  if (remember) {
    // 365 days = 1 year
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(oneYearFromNow.getDate() + 365);
    document.cookie = `${REMEMBER_ME_COOKIE_NAME}=true; expires=${oneYearFromNow.toUTCString()}; path=/; SameSite=Lax`;
    try {
      localStorage.setItem(REMEMBER_ME_LOCAL_KEY, 'true');
    } catch {
      // ignore
    }
  } else {
    // Expire immediately
    document.cookie = `${REMEMBER_ME_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
    try {
      localStorage.removeItem(REMEMBER_ME_LOCAL_KEY);
    } catch {
      // ignore
    }
  }
}

/**
 * Checks if the remember me cookie is present.
 * If the user cleared their cookies, this returns false.
 */
export function hasRememberMeCookie(): boolean {
  if (typeof document === 'undefined') return false;
  const cookies = document.cookie.split(';');
  return cookies.some((c) => c.trim().startsWith(`${REMEMBER_ME_COOKIE_NAME}=true`));
}
