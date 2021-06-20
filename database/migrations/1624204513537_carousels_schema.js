'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarouselsSchema extends Schema {
  up () {
    this.create('carousels', (table) => {
      table.increments()
      table.string('title', 254).nullable()
      table.string('cover_photo', 254).nullable()
      table.text('description').nullable()
      table.integer('order').unsigned().nullable()
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('carousels')
  }
}

module.exports = CarouselsSchema
