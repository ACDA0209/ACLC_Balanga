'use strict'

/*
|--------------------------------------------------------------------------
| AdminUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const AdminUser = use('App/Models/AdminUser')


class AdminUserSeeder {
  async run () {
    await AdminUser.create({
      name: 'system admin',
      username: 'system_admin',
      password: '12345',
      created_by: 1
    })
  }
}

module.exports = AdminUserSeeder
