'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SemestersSchema extends Schema {
  up () {
    this.create('semesters', (table) => {
      table.increments()
      table.string('semester', 254).nullable()
      table.string('from_year', 10).nullable()
      table.string('to_year', 10).nullable()
      table.boolean('active_status').defaultTo(0)
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('semesters')
  }
}

module.exports = SemestersSchema
