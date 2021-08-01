'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentInfosSchema extends Schema {
  up () {
    this.create('student_infos', (table) => {
      table.increments()
      table.string('student_id', 50).notNullable().unique()
      table.string('firstname', 50).nullable()
      table.string('middlename', 50).nullable()
      table.string('lastname', 50).nullable()
      table.string('suffix', 50).nullable()
      table.string('birthdate', 50).nullable()
      table.string('password', 60).notNullable()
      table.boolean('status').defaultTo(1)
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
      table.datetime('date_updated').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('student_infos')
  }
}

module.exports = StudentInfosSchema
