// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { MAX_IMAGE_BYTES, validateImage } from './uploads';

describe('Storage image validation', () => {
  it('accepts recognized image bytes', async () => {
    await expect(
      validateImage(
        new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], 'image.png', {
          type: 'image/png',
        }),
      ),
    ).resolves.toBeUndefined();
  });
  it('rejects SVG, spoofed MIME types, empty files, and oversize images', async () => {
    await expect(
      validateImage(new File(['<svg/>'], 'x.svg', { type: 'image/svg+xml' })),
    ).rejects.toThrow('SVG');
    await expect(
      validateImage(new File(['<script/>'], 'x.png', { type: 'image/png' })),
    ).rejects.toThrow('contents');
    await expect(validateImage(new File([], 'x.png', { type: 'image/png' }))).rejects.toThrow(
      'non-empty',
    );
    await expect(
      validateImage(
        new File([new Uint8Array(MAX_IMAGE_BYTES + 1)], 'x.png', { type: 'image/png' }),
      ),
    ).rejects.toThrow('5 MB');
  });
});
