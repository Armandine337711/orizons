-- Deploy orizons:0005-create_domains to pg

BEGIN;

CREATE DOMAIN TEXT_ONLY AS TEXT CHECK(VALUE ~ '^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\s]+$');

CREATE DOMAIN TEXT_COLOR AS TEXT CHECK(VALUE ~ '^#([\da-fA-F]{3}|[\da-fA-F]{6})$');
CREATE DOMAIN TEXT_MAIL AS TEXT CHECK(VALUE ~ '(^[a-z\d\.\-\_]+)@{1}([a-z\d\.\-]{2,})[.]([a-z]{2,5})$');

ALTER TABLE "localisation"
    ALTER COLUMN "country" TYPE TEXT_ONLY,
    ALTER COLUMN "city" TYPE TEXT_ONLY;

ALTER TABLE "member"
    ALTER COLUMN "first_name" TYPE TEXT_ONLY,
    ALTER COLUMN "last_name" TYPE TEXT_ONLY,
    ALTER COLUMN  "email" TYPE TEXT_MAIL;

ALTER TABLE "category"
    ALTER COLUMN "entitled" TYPE TEXT_ONLY,
    ALTER COLUMN "color" TYPE TEXT_COLOR;


COMMIT;
