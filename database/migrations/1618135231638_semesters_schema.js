'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SemestersSchema extends Schema {
  up () {
    this.create('semesters', (table) => {
      table.increments()
      table.string('semester', 254).nullable()
      table.integer('from_year', 5).nullable()
      table.integer('to_year', 5).nullable()
      table.boolean('active_status').defaultTo(1)
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('semesters')
  }
}

module.exports = SemestersSchema
