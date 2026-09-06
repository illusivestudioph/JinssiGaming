import type { Game } from '@/data/games';

export interface WalletOption {
  name: string;
  accountName: string;
  accountNumber: string;
  qrCode?: string;
}

export interface CtaLink {
  id: string;
  label: string;
  url: string;
  wallets?: WalletOption[];
  customMessage?: string;
}

export interface SiteSettings {
  heroImage: string;
  logoImage: string;
  ctaLinks: CtaLink[];
}

export interface SiteContent extends SiteSettings {
  games: Game[];
}
