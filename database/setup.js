const knex = require('knex')
const knexfile = require('./knexfile')
const {Model} = require('objection')

const setup = ()=>{
    const db = knex(knexfile.development)
    Model.knex(db)
}

module.exports = setup