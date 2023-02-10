// Update with your config settings.
require('dotenv').config({path:'../.env'})
const {knexSnakeCaseMappers} = require('objection')
module.exports = {

    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?sslmode=no-verify',
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds:{
            directory: './seeds'
        },
        ...knexSnakeCaseMappers,
    },
};
