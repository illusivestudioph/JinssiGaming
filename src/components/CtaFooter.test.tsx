import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { CtaFooter } from './CtaFooter';
import type { CtaLink } from '@/types/content';

const content = vi.hoisted(() => ({ logoImage: '/logo.jpeg', ctaLinks: [] as CtaLink[] }));
vi.mock('@/context/siteContent', () => ({ useSiteContent: () => content }));
beforeEach(() => {
  content.ctaLinks = [];
});

it('does not invent payment wallets from a coffee/support label', () => {
  content.ctaLinks = [
    { id: 'coffee', label: 'Support with coffee', url: 'https://example.com/support' },
  ];
  render(<CtaFooter />);
  expect(screen.getByRole('link', { name: 'Support with coffee' })).toHaveAttribute(
    'href',
    'https://example.com/support',
  );
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('shows configured QR images and messages, and awaits clipboard success', async () => {
  const user = userEvent.setup();
  content.ctaLinks = [
    {
      id: 'support',
      label: 'Coffee',
      url: '#',
      customMessage: 'A personal thank-you!',
      wallets: [
        {
          name: 'Wallet',
          accountName: 'Owner',
          accountNumber: 'verified-account',
          qrCode: '/qr.png',
        },
      ],
    },
  ];
  const copy = vi
    .spyOn(navigator.clipboard, 'writeText')
    .mockRejectedValueOnce(new Error('Permission denied'))
    .mockResolvedValue(undefined);
  render(<CtaFooter />);
  await user.click(screen.getByRole('button', { name: 'Coffee' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByAltText('Wallet payment QR code')).toHaveAttribute('src', '/qr.png');
  expect(screen.getByText('A personal thank-you!')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Copy' }));
  expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent('Could not copy');
  await user.click(screen.getByRole('button', { name: 'Copy' }));
  await waitFor(() => expect(screen.getByText('Copied!')).toBeInTheDocument());
  expect(copy).toHaveBeenCalledWith('verified-account');
});
