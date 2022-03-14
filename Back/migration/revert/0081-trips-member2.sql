-- Revert orizons:0081-trips-member2 from pg

BEGIN;

DROP VIEW IF EXISTS"trip_by_member";

COMMIT;
