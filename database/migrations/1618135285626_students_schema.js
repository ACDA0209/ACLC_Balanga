'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    this.dropIfExists('students')

    this.create('students', (table) => {
      table.increments()
      table.string('firstname', 50).nullable()
      table.string('middlename', 50).nullable()
      table.string('lastname', 50).nullable()
      table.string('gender', 50).nullable()
      table.string('address', 254).nullable()
      table.date('birthdate').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('contact', 16).nullable()
      table.integer('admission_status_id').unsigned().notNullable().references('admission_statuses.id')
      table.text('note').nullable()
      table.integer('updated_by').unsigned().nullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
