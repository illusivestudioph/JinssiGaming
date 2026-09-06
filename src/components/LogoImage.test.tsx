import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LogoImage } from './LogoImage';

it('falls back when an uploaded replacement is not a valid image', () => {
  render(<LogoImage src="/logo.png" alt="Jinssi logo" className="object-cover" />);
  const image = screen.getByRole('img', { name: 'Jinssi logo' });
  fireEvent.error(image);
  expect(image).toHaveAttribute('src', '/logo.jpeg');
  expect(image).not.toHaveClass('rounded-full');
  fireEvent.error(image);
  expect(image).toHaveAttribute('src', '/logo.jpeg');
});

it('uses a newly published logo after an earlier source failed', () => {
  const { rerender } = render(<LogoImage src="/broken.png" alt="Jinssi logo" />);
  fireEvent.error(screen.getByRole('img', { name: 'Jinssi logo' }));
  rerender(<LogoImage src="/replacement.png" alt="Jinssi logo" />);
  expect(screen.getByRole('img', { name: 'Jinssi logo' })).toHaveAttribute(
    'src',
    '/replacement.png',
  );
});
