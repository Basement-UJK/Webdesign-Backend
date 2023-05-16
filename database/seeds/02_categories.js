const Category = require('../models/category')
const { Model } = require('objection');

const categories = [
    { name:'Game development'},
    { name: 'Web development'}
]

exports.seed = async function (knex) {
    Model.knex(knex);

    await Category.query().insert(categories)

};
