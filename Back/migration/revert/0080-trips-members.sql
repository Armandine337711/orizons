-- Revert orizons:0080-trips-members from pg

BEGIN;
DROP VIEW "trip_with_duration_status";
CREATE OR REPLACE VIEW "trip_with_duration_status" AS
SELECT t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date",(t."arrival_date"-t."departure_date" + 1) AS "duration",
        (CASE 
            WHEN t."arrival_date" IS NULL 
                THEN 'En cours'
            WHEN CURRENT_DATE > t."departure_date" 
                    AND CURRENT_DATE < t."arrival_date"
                THEN 'En cours'
                ELSE 'Terminé'
                END) AS "status",
        t."score",
        JSON_AGG("photo") AS "cover_photo",
        JSON_AGG("member") AS "author",
        JSON_AGG("category_trip_id") AS "categories"
FROM "trip" t
LEFT OUTER JOIN "photo" ON "photo"."id" = t."photo_id"
LEFT OUTER JOIN "member" ON "member"."id" = t."member_id"
LEFT OUTER JOIN "category_trip_id" ON "category_trip_id"."trip_id" = t.id
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";


DROP VIEW IF EXISTS "category_by_trip";

--ALTER TABLE "step" DROP COLUMN "step_date";

COMMIT;
