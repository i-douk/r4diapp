UPDATE podcasts
SET slug = LOWER(REGEXP_REPLACE(name, '\\s+', '-', 'g'));

ALTER TABLE podcasts
ADD CONSTRAINT slug UNIQUE (slug),
ADD CONSTRAINT no_whitespace_slug CHECK (slug !~ '\\s');