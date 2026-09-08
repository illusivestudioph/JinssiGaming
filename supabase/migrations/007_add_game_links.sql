-- Add the gameLink field to existing games stored in the site_content JSONB document.
update public.site_content
set
  content = jsonb_set(
    content,
    '{games}',
    (
      select coalesce(
        jsonb_agg(
          game || jsonb_build_object(
            'gameLink', coalesce(game->>'gameLink', '')
          )
        ),
        '[]'::jsonb
      )
      from jsonb_array_elements(content->'games') as game
    ),
    true
  ),
  updated_at = now()
where id = 'default'
  and jsonb_typeof(content->'games') = 'array';