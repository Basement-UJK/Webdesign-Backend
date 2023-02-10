const User = require('../models/user')
const { Model } = require('objection');

const users = [
    { first_name: 'test1', last_name: 'test1', password: '123', email: 'test@test.com' },
    { first_name: 'test2', last_name: 'test2', password: '123', email: 'company@test.com' },
    { first_name: 'test3', last_name: 'test3', password: '123', email: 'abc@test.com' }
]

exports.seed = async function (knex) {
    Model.knex(knex);

    await User.query().insert(users)

};
