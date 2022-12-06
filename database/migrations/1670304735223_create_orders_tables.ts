import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('quantity').unsigned().notNullable()
      table.string('status').notNullable().defaultTo('PENDING')
      table.string('address').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
