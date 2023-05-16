const { Model } = require("objection");
const knex = require('../knexfile')
Model.knex(knex)
class Category extends Model {
    static get tableName() {
        return "categories";
    }
    static get idColumn() {
        return 'name';
    }
}

module.exports = Category