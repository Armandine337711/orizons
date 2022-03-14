-- Revert orizons:0090-add_country_table from pg

BEGIN;

DROP TABLE IF EXISTS "country" CASCADE;

COMMIT;
