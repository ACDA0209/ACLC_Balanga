'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuardianSchema extends Schema {
  up () {
    this.create('guardians', (table) => {
      table.increments()
      table.string('fullname', 100).nullable()
      table.string('address', 254).nullable()
      table.string('contact', 16).nullable()
      table.integer('student_id').unsigned().notNullable().references('students.id')
      table.integer('updated_by').unsigned().nullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now()) 
    })
  }

  down () {
    this.drop('guardians')
  }
}

module.exports = GuardianSchema
