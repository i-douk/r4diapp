ALTER TABLE podcasts
ADD COLUMN slug TEXT;

UPDATE podcasts
SET slug = LOWER(REGEXP_REPLACE(name, '\\s+', '-', 'g'));


