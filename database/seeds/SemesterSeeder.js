'use strict'

/*
|--------------------------------------------------------------------------
| SemesterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Semester = use('App/Models/Semester')

class SemesterSeeder {
  async run () {
    await Semester.create({
      semester: "1st Semester",
      from_year: 2021,
      to_year: 2022,
      created_by: 1
    })
  }
}

module.exports = SemesterSeeder
