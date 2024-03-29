exports.up = knex => knex.schema.createTable('ingredients', table => {
    table.increments("id").primary()
    table.integer("dish_id").references('id').inTable('dishes').onDelete('cascade')
    table.text("name")
})
exports.down = knex => knex.schema.dropTable('ingredients')