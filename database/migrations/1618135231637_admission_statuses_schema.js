'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdmissionStatusesSchema extends Schema {
  up () {
    this.create('admission_statuses', (table) => {
      table.increments()
      table.string('status_name', 50).nullable()
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('admission_statuses')
  }
}

module.exports = AdmissionStatusesSchema
