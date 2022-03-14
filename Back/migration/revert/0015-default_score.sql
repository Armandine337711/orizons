-- Revert orizons:0015-default_score from pg

BEGIN;

ALTER TABLE "trip" ALTER COLUMN "score" DROP DEFAULT;

COMMIT;
