const { Model } = require("objection");
const knex = require('../knexfile')
Model.knex(knex)
class Message extends Model {
    static get tableName() {
        return "message";
    }
}

module.exports = Message