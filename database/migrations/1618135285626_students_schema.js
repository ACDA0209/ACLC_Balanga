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
      table.string('suffix', 50).nullable()
      table.date('birthdate').nullable()
      table.string('birth_place', 254).nullable()
      table.string('marital_status', 50).nullable()
      table.string('gender', 50).nullable()
      table.string('height', 10).nullable()
      table.string('weight', 10).nullable()
      table.string('citizenship', 50).nullable()
      table.string('address', 254).nullable() 
      table.string('contact', 16).nullable()
      table.string('last_school', 254).nullable()
      table.string('email', 254).notNullable().unique()
      table.integer('admission_status_id').unsigned().notNullable().references('admission_statuses.id')
      table.integer('enrollment_type_id').unsigned().nullable().references('enrollment_types.id')
      table.integer('course_id').unsigned().nullable().references('courses.id')
      table.integer('semester_id').unsigned().nullable().references('semesters.id')
      table.text('note').nullable()
      table.string('reference_no', 10).nullable().unique()
      table.integer('updated_by').unsigned().nullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
