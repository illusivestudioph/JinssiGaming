// Public schema contract for the checked-in migrations. Regenerate with the
// Supabase CLI after schema changes (see README.md).
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type GameRow = {
  id: string;
  title: string;
  developer: string;
  category: string;
  description: string;
  accent_color: string;
  cover_image: string;
  cover_alt: string;
  walkthrough: Json;
  revision: number;
  updated_at: string;
};
type SettingsRow = {
  id: boolean;
  hero_image: string;
  logo_image: string;
  cta_links: Json;
  revision: number;
  updated_at: string;
};
type CommentRow = {
  id: string;
  game_id: string;
  user_id: string;
  user_name: string;
  text: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      games: {
        Row: GameRow;
        Insert: Omit<GameRow, 'revision' | 'updated_at'>;
        Update: Partial<Omit<GameRow, 'id' | 'revision' | 'updated_at'>>;
        Relationships: [];
      };
      site_settings: {
        Row: SettingsRow;
        Insert: Omit<SettingsRow, 'revision' | 'updated_at'>;
        Update: Partial<Pick<SettingsRow, 'hero_image' | 'logo_image' | 'cta_links'>>;
        Relationships: [];
      };
      comments: {
        Row: CommentRow;
        Insert: Pick<CommentRow, 'game_id' | 'text'>;
        Update: never;
        Relationships: [
          {
            foreignKeyName: 'comments_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'games';
            referencedColumns: ['id'];
          },
        ];
      };
      admin_users: {
        Row: { user_id: string };
        Insert: { user_id: string };
        Update: never;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { is_admin: { Args: Record<PropertyKey, never>; Returns: boolean } };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
