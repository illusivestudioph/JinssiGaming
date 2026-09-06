import { z } from 'zod';
import { isSafeUrl } from './urls';

const id = z
  .string()
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/,
    'Use a stable ID of up to 100 letters, numbers, hyphens or underscores.',
  );
const text = (max: number) => z.string().trim().min(1, 'This field is required.').max(max);
const image = z
  .string()
  .max(2048)
  .refine((value) => isSafeUrl(value, 'image'), 'Use an HTTPS image URL or a /local-asset path.');
const optionalImage = z.union([z.literal(''), image]);

export const stepSchema = z.object({
  id,
  title: text(200),
  description: text(10000),
  image: optionalImage,
  imageAlt: z.string().max(500),
  hasSpoiler: z.boolean().optional(),
  spoilerText: z.string().max(10000).optional(),
});

export const sectionSchema = z.object({
  id,
  title: text(200),
  steps: z.array(stepSchema).max(500),
});

export const gameSchema = z
  .object({
    id,
    title: text(200),
    developer: text(200),
    category: text(100),
    description: text(10000),
    accentColor: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/, 'Use a six-digit hex color, for example #E2A88D.'),
    coverImage: image,
    coverAlt: text(500),
    walkthrough: z.array(sectionSchema).max(100),
  })
  .superRefine((game, ctx) => {
    const sectionIds = new Set<string>();
    const stepKeys = new Set<string>();
    game.walkthrough.forEach((section, index) => {
      if (sectionIds.has(section.id))
        ctx.addIssue({
          code: 'custom',
          path: ['walkthrough', index, 'id'],
          message: 'Section IDs must be unique.',
        });
      sectionIds.add(section.id);
      section.steps.forEach((step, stepIndex) => {
        const key = `${section.id}-${step.id}`;
        if (stepKeys.has(key))
          ctx.addIssue({
            code: 'custom',
            path: ['walkthrough', index, 'steps', stepIndex, 'id'],
            message: 'Step progress keys must be unique.',
          });
        stepKeys.add(key);
      });
    });
  });

const walletSchema = z
  .object({
    name: text(80),
    accountName: text(200),
    accountNumber: z.string().trim().max(200),
    qrCode: optionalImage.optional(),
  })
  .refine(
    (wallet) => Boolean(wallet.accountNumber || wallet.qrCode),
    'Provide an account number/email or a QR image.',
  );

export const settingsSchema = z
  .object({
    heroImage: image,
    logoImage: image,
    ctaLinks: z
      .array(
        z.object({
          id,
          label: text(100),
          url: z
            .string()
            .max(2048)
            .refine(
              (value) => isSafeUrl(value, 'link'),
              'Use an HTTPS, mailto:, /local or # link.',
            ),
          wallets: z.array(walletSchema).min(1).max(10).optional(),
          customMessage: z.string().max(1000).optional(),
        }),
      )
      .max(20),
  })
  .refine(
    (settings) =>
      new Set(settings.ctaLinks.map((link) => link.id)).size === settings.ctaLinks.length,
    'Footer button IDs must be unique.',
  );

export const commentSchema = text(2000);
export const displayNameSchema = text(50).min(
  2,
  'Use at least two characters for your display name.',
);

export function errorMessage(error: unknown): string {
  if (error instanceof z.ZodError) {
    const issue = error.issues[0];
    return `${issue.path.length ? `${issue.path.join('.')}: ` : ''}${issue.message}`;
  }
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string')
    return error.message;
  return 'Something went wrong. Please try again.';
}
