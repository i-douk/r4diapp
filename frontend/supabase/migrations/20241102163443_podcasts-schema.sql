UPDATE podcasts
SET slug = LOWER(REGEXP_REPLACE(name, '\\s+', '-', 'g'));

