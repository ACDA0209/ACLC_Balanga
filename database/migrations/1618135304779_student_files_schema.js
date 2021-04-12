'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentFilesSchema extends Schema {
  up () {
    this.create('student_files', (table) => {
      table.increments()
      table.string('filename', 254).nullable()
      table.string('file_type', 10).nullable()
      table.integer('student_id').unsigned().notNullable().references('students.id')
      table.integer('updated_by').unsigned().nullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())

    })
  }

  down () {
    this.drop('student_files')
  }
}

module.exports = StudentFilesSchema
