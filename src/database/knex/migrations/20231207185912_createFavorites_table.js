exports.up = knex => knex.schema.createTable('favorites', table => {
    table.increments("id").primary()
    table.integer("dish_id").references('id').inTable('dishes').onDelete('cascade')
    table.integer("user").references('id').inTable('users').onDelete('cascade')
})
exports.down = knex => knex.schema.dropTable('favorites')