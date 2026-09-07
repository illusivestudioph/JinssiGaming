-- Adds an optional editor note/review to every game stored in site_content.
-- The application stores games inside the existing JSONB content document.

update public.site_content
set content = jsonb_set(
  content,
  '{games}',
  (
    select coalesce(
      jsonb_agg(game || jsonb_build_object('editorNote', coalesce(game->>'editorNote', ''))),
      '[]'::jsonb
    )
    from jsonb_array_elements(content->'games') as game
  )
)
where id = 'default'
  and jsonb_typeof(content->'games') = 'array';