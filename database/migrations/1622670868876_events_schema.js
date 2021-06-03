'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.string('title', 254).nullable()
      table.string('cover_photo', 254).nullable()
      table.text('description').nullable()
      table.datetime('date_until').nullable()
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
