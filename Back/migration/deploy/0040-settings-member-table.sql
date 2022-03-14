-- Deploy orizons:0040-settings-member-table to pg

BEGIN;

ALTER TABLE "member" ALTER COLUMN "profile_photo" SET DEFAULT 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg';

ALTER TABLE "member" ADD COLUMN "biography" TEXT;
ALTER TABLE "member" ADD COLUMN "localisation" TEXT;
 
COMMIT;
