-- Revert orizons:0010-add_role from pg

BEGIN;

--ALTER TABLE "member" DROP COLUMN "role_id";

DROP TABLE IF EXISTS "docket" CASCADE;

COMMIT;
