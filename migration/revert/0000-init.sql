-- Revert orizons:0000-init from pg

BEGIN;


DROP TABLE IF EXISTS "_m2m_trip_category" CASCADE;
DROP TABLE IF EXISTS "_m2m_trip_localisation" CASCADE;
DROP TABLE IF EXISTS "step" CASCADE;
DROP TABLE IF EXISTS "comment" CASCADE;
DROP TABLE IF EXISTS "category" CASCADE;
DROP TABLE IF EXISTS "trip" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "photo" CASCADE;
DROP TABLE IF EXISTS "localisation" CASCADE;


COMMIT;
