
exports.up = function (knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.string('first_name', 50).notNullable();
            table.string('last_name', 50).notNullable();
            table.string('password').notNullable();  
            table.string('email', 100).notNullable().unique().index();
        })
        .createTable('entries', (table) => {
            table.increments('id').primary()
            table.string('title', 250).notNullable();
            table.text('description').notNullable();
            table.text('body')
            table.string('cover_image')
            table.enu('category', ['Game development', 'Web development']).notNullable()
            table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};


exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('entries')
        .dropTableIfExists('users')

};
