'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoursesSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.string('course', 254).nullable()
      table.text('description').nullable()
      table.boolean('status').defaultTo(1)
      table.integer('course_type_id').unsigned().notNullable().references('course_types.id')
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())

    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CoursesSchema
