'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParentsSchema extends Schema {
  up () {
    this.create('parents', (table) => {
      table.increments()
      table.string('firstname', 50).nullable()
      table.string('middlename', 50).nullable()
      table.string('lastname', 50).nullable()
      table.string('occupation', 254).nullable()
      table.string('contact', 16).nullable()
      table.string('type', 10).nullable()
      table.integer('student_id').unsigned().notNullable().references('students.id')
      table.integer('updated_by').unsigned().nullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('parents')
  }
}

module.exports = ParentsSchema
