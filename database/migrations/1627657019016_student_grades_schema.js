'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentGradesSchema extends Schema {
  up () {
    this.create('student_grades', (table) => {
      table.increments()
      table.string('student_id', 50).nullable()
      table.string('subject', 254).nullable()
      table.string('grade', 254).nullable()
      table.string('school_year', 254).nullable()
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
      table.datetime('date_updated').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('student_grades')
  }
}

module.exports = StudentGradesSchema
