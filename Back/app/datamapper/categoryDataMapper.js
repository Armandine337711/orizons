const client = require('./client');

const categoryDataMapper = {
    async getAllCategory() {
        const result = await client.query("SELECT * FROM category ORDER BY entitled");
        return result.rows;
    },

    async getCategoryById(categoryId) {
        const result = await client.query("SELECT * FROM category WHERE id = $1", [categoryId])
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async getCategoryByTripId(tripId) {
        const result = await client.query('SELECT * FROM "category_trip_id" cti WHERE cti.trip_id = $1', [tripId]);
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async createCategory(newCategory, urlImage) {
        console.log("first")
        console.log(newCategory)
        const result = await client.query("INSERT INTO category(entitled, color, image) VALUES ($1, $2, $3) RETURNING *", [
            newCategory.entitled,
            newCategory.color,
            urlImage
        ]);
        return result.rows[0];
    },

    async updateAllCategories() {
        const result = await client.query("");
    },

    async updateOneCategory(categoriesId, updatedCategory) {

        const result = await client.query(`UPDATE "category" 
        SET "entitled" = $1,
            "color" = $2,
            "image" = $3
        WHERE "id" = $4
        RETURNING *`, [
            updatedCategory.entitled,
            updatedCategory.color,
            updatedCategory.image,
            categoriesId
        ]);
        return result.rows[0];
    },

    async updateAllCategories() {
        const result = await client.query("");
    },

    async deleteOneCategory(categoryId) {
        await client.query(`DELETE FROM category WHERE category.id = $1`, [categoryId]);
        message = `La catégorie a été supprimée`
        return message
    }

};

module.exports = categoryDataMapper;