'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseTypesSchema extends Schema {
  up () {
    this.create('course_types', (table) => {
      table.increments()
      table.string('course_type', 254).nullable()
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('course_types')
  }
}

module.exports = CourseTypesSchema
