'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminUsersSchema extends Schema {
  up () {
    this.create('admin_users', (table) => {
      table.increments()
      table.string('name', 50).nullable()
      table.string('username', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('created_by').unsigned().notNullable().references('admin_users.id')
      table.datetime('date_created').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('admin_users')
  }
}

module.exports = AdminUsersSchema
