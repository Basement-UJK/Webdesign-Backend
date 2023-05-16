
exports.up = function (knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.string('first_name', 50).notNullable();
            table.string('last_name', 50).notNullable();
            table.string('password').notNullable();  
            table.string('email', 100).notNullable().unique().index();
        })
        .createTable('categories', table => {
            table.string('name', 40).notNullable().primary()
        })
        .createTable('entries', (table) => {
            table.increments('id').primary()
            table.string('title', 250).notNullable();
            table.text('description').notNullable();
            table.text('body').notNullable()
            table.string('cover_image').notNullable()
            table.string('category').references('name').inTable('categories').notNullable()
            table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('messages', (table)=>{
            table.increments('id').primary()
            table.string('email', 50).notNullable();
            table.string('name', 50).notNullable();
            table.text('message').notNullable();
        })

};


exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('entries')
        .dropTableIfExists('categories')
        .dropTableIfExists('users')
        .dropTableIfExists('messages')
};
