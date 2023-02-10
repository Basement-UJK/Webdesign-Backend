const { Model } = require("objection");
const knex = require('../knexfile')
Model.knex(knex)
class Entry extends Model {
    static get tableName() {
        return "entries";
    }
}

module.exports = Entry