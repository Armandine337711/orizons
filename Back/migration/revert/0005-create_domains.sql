-- Revert orizons:0005-create_domains from pg

BEGIN;

-- ALTER TABLE "localisation"
--     ALTER COLUMN "country" TYPE TEXT,
--     ALTER COLUMN "city" TYPE TEXT;

-- ALTER TABLE "member"
--     ALTER COLUMN "first_name" TYPE TEXT,
--     ALTER COLUMN "last_name" TYPE TEXT,
--     ALTER COLUMN  "email" TYPE TEXT;
    
-- ALTER TABLE "category"
--     ALTER COLUMN "entitled" TYPE TEXT,
--     ALTER COLUMN "color" TYPE TEXT;

DROP DOMAIN TEXT_ONLY;
DROP DOMAIN TEXT_COLOR;
DROP DOMAIN TEXT_MAIL;





COMMIT;
