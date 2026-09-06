import { StrictMode, type ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useProgress } from './useProgress';
import { useProgressMap } from './useProgressMap';
import { games } from '@/data/games';
import { parseCompletedSteps, progressPercent } from '@/lib/progress';

const wrapper = ({ children }: { children: ReactNode }) => <StrictMode>{children}</StrictMode>;

describe('device progress', () => {
  it('validates and deduplicates persisted arrays', () => {
    expect(parseCompletedSteps(['ch1-s1', null, 7, 'ch1-s1', '', {}])).toEqual(['ch1-s1']);
    expect(parseCompletedSteps({ length: 900 })).toEqual([]);
    expect(parseCompletedSteps('ch1-s1')).toEqual([]);
  });
  it('resets both progress and spoilers when switching to an unsaved game', () => {
    localStorage.setItem('jinssi-progress-first', JSON.stringify(['ch1-s1', 'removed', 'ch1-s1']));
    localStorage.setItem('jinssi-spoilers-first', 'true');
    const { result, rerender } = renderHook(({ id }) => useProgress(id, ['ch1-s1']), {
      initialProps: { id: 'first' },
      wrapper,
    });
    expect([...result.current.completedSteps]).toEqual(['ch1-s1']);
    expect(result.current.showSpoilers).toBe(true);
    rerender({ id: 'second' });
    expect(result.current.completedSteps.size).toBe(0);
    expect(result.current.showSpoilers).toBe(false);
    act(() => result.current.toggleStep('ch1-s1'));
    expect(JSON.parse(localStorage.getItem('jinssi-progress-second')!)).toEqual(['ch1-s1']);
    expect(JSON.parse(localStorage.getItem('jinssi-progress-first')!)).toContain('removed');
  });
  it('keeps toggles correct under StrictMode, ignores unknown steps, and resets', () => {
    const { result } = renderHook(() => useProgress('strict', ['ch1-s1']), { wrapper });
    act(() => result.current.toggleStep('ch1-s1'));
    expect(result.current.completedSteps.size).toBe(1);
    act(() => result.current.toggleStep('unknown'));
    expect(result.current.completedSteps.size).toBe(1);
    act(() => result.current.resetProgress());
    expect(result.current.completedSteps.size).toBe(0);
  });
  it('remains usable when browser storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Denied', 'SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Full', 'QuotaExceededError');
    });
    const { result } = renderHook(() => useProgress('blocked', ['ch1-s1']), { wrapper });
    act(() => result.current.toggleStep('ch1-s1'));
    expect(result.current.completedSteps.size).toBe(1);
    expect(result.current.persisted).toBe(false);
  });
  it('does not trust truthy non-boolean spoiler preferences', () => {
    localStorage.setItem('jinssi-spoilers-invalid', '"false"');
    localStorage.setItem('jinssi-progress-invalid', '{bad json');
    const { result } = renderHook(() => useProgress('invalid', ['ch1-s1']));
    expect(result.current.showSpoilers).toBe(false);
    expect(result.current.completedSteps.size).toBe(0);
  });
  it('updates directory counts immediately and responds to other-tab changes', () => {
    const game = { ...games[0], id: 'directory-progress' };
    const { result } = renderHook(
      () => ({ guide: useProgress(game.id, ['ch1-s1']), map: useProgressMap([game]) }),
      { wrapper },
    );
    act(() => result.current.guide.toggleStep('ch1-s1'));
    expect(result.current.map[game.id]).toBe(1);
    act(() => {
      localStorage.setItem(`jinssi-progress-${game.id}`, '[]');
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: `jinssi-progress-${game.id}`,
          storageArea: localStorage,
        }),
      );
    });
    expect(result.current.guide.completedSteps.size).toBe(0);
    expect(result.current.map[game.id]).toBe(0);
  });
  it('caps progress percentages and handles malformed totals', () => {
    expect(progressPercent(20, 10)).toBe(100);
    expect(progressPercent(-1, 10)).toBe(0);
    expect(progressPercent(1, 0)).toBe(0);
    expect(progressPercent(NaN, 10)).toBe(0);
  });
});
