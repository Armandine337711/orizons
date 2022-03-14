//const client = require('../app/datamapper/client');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

const {
    Client
} = require('pg');
const bcrypt = require('bcrypt');

const dockets = require('./import_docket.json');
const categories = require('./import_category.json');
const localisations = require('./import_localisation.json');
const photos = require('./import_photos.json');
const members = require('./import_member.json');
const trips = require('./import_trip.json');
const steps = require('./import_step.json');
//const comments = require('./import_commentaires.json');
const tripCategories = require('./import_trip_category.json');
const tripCountries = require('./import_trip_country.json');
const countries = require('./import_country.json');


(async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    await client.connect();



    await client.query(`TRUNCATE TABLE _m2m_trip_category,
                                        _m2m_trip_country,
                                        member,
                                        category,
                                        localisation,
                                        photo,
                                        step,
                                        trip,
                                        docket,
                                        country RESTART IDENTITY CASCADE`);

    for (let docket of dockets) {
        const result = await client.query(`INSERT INTO docket(role_name) VALUES ($1) RETURNING *`, [docket.role_name]);
    };

    for (let country of countries) {
        await client.query(`INSERT INTO country(code, en_name, fr_name, code_2) VALUES ($1, $2, $3, $4)`, [country.code, country.en_name, country.fr_name, country.code_2])
    }

    // 2 - Import des catégories
    for (let category of categories) {

        await client.query(`INSERT INTO "category"("entitled", "color", "image") VALUES ($1, $2, $3)`,
            [category.entitled,
            category.color,
            category.image
            ])

    };

    // 3 - Import des localisation
    for (let localisation of localisations) {
        await client.query(`INSERT INTO "localisation"("country", "region", "city") VALUES ($1, $2, $3)`,
            [localisation.country,
            localisation.region,
            localisation.city
            ])

    }
    // 4 - Import de la photo bannière par défaut (user et trip)  

    for (let photo of photos) {
        client.query(`INSERT INTO "photo"("title", "url") VALUES ($1, $2)`,
            [photo.title,
            photo.url
            ])

    }

    // 5 - Import des membres
    const saltRounds = 10;

    for (let member of members) {
        let hashedPassword = bcrypt.hashSync(member.password, saltRounds);
        await client.query(`INSERT INTO "member"("first_name", "last_name", "nickname", "email", "password", "profile_photo", "localisation", "docket_id", "biography", "cover_member") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
                member.first_name,
                member.last_name,
                member.nickname,
                member.email,
                hashedPassword,
                member.profile_photo,
                member.localisation,
                member.docket_id,
                member.biography,
                member.cover_photo
            ])

    }

    // 7 - Import des voyages
    for (let trip of trips) {
        await client.query(`INSERT INTO "trip"("title", "summary", "departure_date", "arrival_date", "score", "photo_id", "member_id", "cover_trip") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
                trip.title,
                trip.summary,
                trip.departure_date,
                trip.arrival_date,
                trip.score,
                trip.photo_id,
                trip.member_id,
                trip.cover_trip
            ])
    }
    // 8 - Import des étapes
    for (let step of steps) {
        await client.query(`INSERT INTO "step"("longitude", "latitude", "title", "number_step", "content", "trip_id", "country_id") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                step.longitude,
                step.latitude,
                step.title,
                step.number_day,
                step.content,
                step.trip_id,
                step.country_id
            ])
    }
    // 9 - Import des commentaires
    /* for (const comment of comments) {
         await client.query(`INSERT INTO "comment"("title", "content", "score", "member_id", "trip_id") VALUES ($1, $2, $3, $4, $5)`,
             [
                 comment.title,
                 comment.content,
                 comment.score,
                 comment.member_id,
                 comment.trip_id
             ])
     }*/
    // 10 - Import de la table m2m trip category

    for (const tripCategory of tripCategories) {
        await client.query(`INSERT INTO "_m2m_trip_category"("category_id", "trip_id") VALUES ($1, $2)`,
            [tripCategory.category_id, tripCategory.trip_id])
    }




    for (const tripCountry of tripCountries) {
        await client.query(`INSERT INTO "_m2m_trip_country"("country_id", "trip_id") VALUES ($1, $2)`,
            [tripCountry.country_id, tripCountry.trip_id])
    }
    for (let photo of photos) {
        let photoId = photo.id;
        client.query(`UPDATE "photo" SET "step_id" = $1 WHERE id = $2`,
            [
                photo.step_id,
                photoId
            ])
    }
    console.log("fin du traitement")

})();
// 10 - Import de la table m2m trip localisation