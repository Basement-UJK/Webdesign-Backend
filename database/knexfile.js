// Update with your config settings.
require('dotenv').config({ path: '../.env' })
const { knexSnakeCaseMappers } = require('objection')
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: '.',
            database: 'ujk_science_club'
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        ...knexSnakeCaseMappers,
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        },
        pool: {
            min: 2,
            max: 10
        },
        ...knexSnakeCaseMappers,
    },
};
