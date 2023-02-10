/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // clear all tables
    await knex('entries').del()
    await knex('users').del()
    
    // reset autoincrements
    await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
    await knex.raw('ALTER SEQUENCE entries_id_seq RESTART WITH 1')

};
