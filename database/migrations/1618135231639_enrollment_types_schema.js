'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnrollmentTypesSchema extends Schema {
  up () {
    this.create('enrollment_types', (table) => {
      table.increments()
      table.string('enrollment_type', 254).nullable()
      table.boolean('status').defaultTo(1)
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('enrollment_types')
  }
}

module.exports = EnrollmentTypesSchema
