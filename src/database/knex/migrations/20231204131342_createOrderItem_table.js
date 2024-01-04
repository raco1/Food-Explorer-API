exports.up = knex => knex.schema.createTable('order_item', table => {
    table.integer("order_id").references('id').inTable('order').onDelete('cascade')
    table.integer("user_id").references('id').inTable('dish').onDelete('cascade')
    table.float("price_item")
    table.float("amount")
})
exports.down = knex => knex.schema.dropTable('order_item')