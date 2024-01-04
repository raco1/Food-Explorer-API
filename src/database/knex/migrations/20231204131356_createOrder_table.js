exports.up = knex => knex.schema.createTable('order', table => {
    table.increments("id").primary()
    table.integer("user_id").references('id').inTable('users').onDelete('cascade')
    table.text("order_status")
    table.float("full_price")
    table.text("payment_method")
    table.timestamp("created_at").default(knex.fn.now())
})
exports.down = knex => knex.schema.dropTable('order')