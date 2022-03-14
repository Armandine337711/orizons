// Il vaut mieux utiliser un système de pool pour traiter plusieurs requête en même
const {
    Pool
} = require('pg');
console.log('-----------------')
console.log('coucou')
console.log('-----------------')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
console.log('-----------------')
console.log('connected')
console.log('-----------------')

// Pas besoin de connect car c'est le Pool qui va se charger d'établir les connexions

module.exports = pool;