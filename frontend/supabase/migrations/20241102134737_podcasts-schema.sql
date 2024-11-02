ALTER TABLE podcasts
ADD COLUMN slug TEXT;

UPDATE podcasts
SET slug = LOWER(REGEXP_REPLACE(title, '\\s+', '-', 'g'));

ALTER TABLE podcasts
ADD CONSTRAINT unique_slug UNIQUE (slug),
ADD CONSTRAINT no_whitespace_slug CHECK (slug !~ '\\s');

ALTER TABLE podcasts
ALTER COLUMN slug SET DEFAULT LOWER(REGEXP_REPLACE(title, '\\s+', '-', 'g'));
